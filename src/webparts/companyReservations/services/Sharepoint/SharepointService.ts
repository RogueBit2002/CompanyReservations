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

	static init()
	{
		sp.setup({
			sp: {
			  baseUrl: "https://decoole.sharepoint.com/sites/laurens",
			},
		  });	  
	}
	
	static getListByName(name : string): List
	{
		const spList : IList = sp.web.lists.getByTitle(name);

		//const items : any[] = await spList.items.get();
		//const items: any[] = await sp.web.lists.getByTitle(name).items.get();
		//console.debug("Debug items output thing: ", items);
		return new List(spList);
	}
}