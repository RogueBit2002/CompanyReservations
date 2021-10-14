import { List } from "../services/Sharepoint/List";

export class DataList
{
	internalList : List;
	
	constructor()
	{
		
	}


	public async init(listName : string)
	{
		const exists : boolean = await List.exists(listName);

		if(!exists)
		{
			let list : List = await List.create(listName);
			this.internalList = await this.setupList(list);
		} else {
			this.internalList = List.getByName(listName);
		}
	}

	protected async setupList(list : List) : Promise<List>
	{
		return list;
	}
}