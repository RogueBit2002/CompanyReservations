import { IChangeQuery, sp } from "@pnp/sp";
import { IList, IListInfo, IListParentInfos } from "@pnp/sp/lists";
import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import * as strings from "CompanyReservationsWebPartStrings";

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


	//Don't know if this is the right way to do it :/
	public async getDefaultViewFields(names : string[]) : Promise<IViewField[]>
	{
		const fieldInfos : IFieldInfo[] = await this.spList.fields.filter("ReadOnlyField eq false and Hidden eq false and Group eq 'Custom Columns'").get();
		let viewFields : IViewField[] = [];

		for(let i = 0; i < fieldInfos.length; i ++)
		{
			let fieldInfo = fieldInfos[i];

		
			if(names.indexOf(fieldInfo.Title) > -1)
			{
				let viewField : IViewField = {
					name: fieldInfo.Title,
					displayName: fieldInfo.Title
				}
				viewFields.push(viewField);
			}
		}

		return viewFields;
	}

}