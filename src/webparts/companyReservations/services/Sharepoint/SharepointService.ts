import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import { IList } from "@pnp/sp/lists";
import { List } from "./List";
import { IWeb, IWebInfo } from "@pnp/sp/webs";

export class SharepointService
{

	static async init()
	{
		// use for rootweb information access
		/*const rootwebData : IWeb = await sp.site.rootWeb();

		const data : IWebInfo = await rootwebData.get();
		console.debug("EE", data);*/

		sp.setup({
			sp: {
			  baseUrl: "https://decoole.sharepoint.com/sites/laurens",
			},
		  });
		  
	}
	static async getListByName(name : string): Promise<List>
	{
		const spList : IList = sp.web.lists.getByTitle(name);

		//const items : any[] = await spList.items.get();
		//const items: any[] = await sp.web.lists.getByTitle(name).items.get();
		//console.debug("Debug items output thing: ", items);
		return new List(spList);
	}
	

	static async test(name : string)
	{
		const items: any[] = await sp.web.lists.getByTitle(name).items.get();
		console.debug("Debug items output thing: ", items);
	}


	public static async GetListItems(name: string): Promise<any[]>
	{

		const items: any[] = await sp.web.lists.getByTitle(name).items.get();
		//console.log(items);

		/*
		// get a specific item by id.
		const item: any = await sp.web.lists.getByTitle("My List").items.getById(1).get();
		console.log(item);

		// use odata operators for more efficient queries
		const items2: any[] = await sp.web.lists.getByTitle("My List").items.select("Title", "Description").top(5).orderBy("Modified", true).get();
		console.log(items2);
*/
		return items;
	}

}