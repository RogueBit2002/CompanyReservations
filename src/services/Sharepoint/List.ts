import { IChangeQuery, sp } from "@pnp/sp";
import { IList, IListInfo, IListParentInfos } from "@pnp/sp/lists";
import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";

import { IField, IFieldInfo } from "@pnp/sp/fields/types";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";
import "@pnp/sp/views";

export class List
{
	spList : IList;

	constructor(list : IList)
	{
		this.spList = list;
	}

	public static async create(name : string) : Promise<List>
	{
		const listEnsureResult = await sp.web.lists.ensure(name);

		return new List(listEnsureResult.list);
	}

	public static async exists(name : string) : Promise<boolean>
	{
		const listEnsureResult = await sp.web.lists.ensure(name);

		if(listEnsureResult.created)
		{
			await listEnsureResult.list.delete();
		}
		
		return !listEnsureResult.created;
	}

	public static getByName(name : string) : List
	{
		const spList : IList = sp.web.lists.getByTitle(name);
	
		return new List(spList);
	}


	public async getName() : Promise<string>
	{
		const name : string = await this.spList.select("Title")();

		return name;
	}
	public async getItems(): Promise<any[]>
	{
		const items : any[] = await this.spList.items.get();

		return items;
	}

	public async addItem(data: any)
	{
		await this.spList.items.add(data);
	}

	public async getItemsByValues(ref: any): Promise<any[]>
	{
		const items : any[] = await this.spList.items.get();

		const keys : string[] = Object.keys(ref);

		let validItems : any[] = [];
		
		//Iterate over all items, and check if the item's values match the reference values
		for(let i = 0; i < items.length; i ++)
		{
			let item : any = items[i];
			let valid : boolean = true;
			for(let j = 0; j < keys.length; j ++)
			{
				if(item[keys[j]] !== ref[keys[j]])
				{
					valid = false;
					break;
				}
			}

			if(valid)
			{
				validItems.push(item);
			}
		}

		return validItems;
	}

	public async getItemsByFunction(func : (item : any) => boolean) : Promise<any[]>
	{
		const items : any[] = await this.spList.items.get();

		let validItems : any[] = [];

		for(let i : number = 0; i < items.length; i ++)
		{
			const item : any = items[i];
			if(func(item))
			{
				validItems.push(item);
			}
		}

		return validItems;
	}


	public async getFieldInfos(reference : any) : Promise<IFieldInfo[]>
	{
		const sourceFieldInfos : IFieldInfo[] = await this.spList.fields.get();//filter("ReadOnlyField eq false and Hidden eq false and Group eq 'Custom Columns'").get();
		let fieldInfos : IFieldInfo[] = [];

		let keys : string[] = Object.keys(reference);

		for(let i = 0; i < sourceFieldInfos.length; i ++)
		{
			let fieldInfo = sourceFieldInfos[i];


			let valid : boolean = true;
			for(let j = 0; j < keys.length; j ++)
			{
				let key : string = keys[j];
				if(fieldInfo[key] === undefined)
				{
					valid = false;
					break;
				}

				if(reference[key].indexOf(fieldInfo[key]) == -1)
				{
					valid = false;
					break;
				}
			}
			
			if(!valid)
			{
				continue;
			}

			fieldInfos.push(fieldInfo);
		}

		return fieldInfos;
	}

	//Don't know if this is the right way to do it :/
	public async getDefaultViewFields(reference : any) : Promise<IViewField[]>
	{
		const fieldInfos : IFieldInfo[] = await this.getFieldInfos(reference);//filter("ReadOnlyField eq false and Hidden eq false and Group eq 'Custom Columns'").get();
		let viewFields : IViewField[] = [];

		for(let i = 0; i < fieldInfos.length; i ++)
		{
			const fieldInfo : IFieldInfo = fieldInfos[i];
			let viewField : IViewField = {
				name: fieldInfo.Title,
				displayName: fieldInfo.Title
			}
			
			viewFields.push(viewField);
		}

		return viewFields;
	}

}