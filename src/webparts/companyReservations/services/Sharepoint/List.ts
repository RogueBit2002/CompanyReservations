import { IList } from "@pnp/sp/lists";

export class List
{
	spList : IList;

	constructor(list : IList)
	{
		this.spList = list;
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
}