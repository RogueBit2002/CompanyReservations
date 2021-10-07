import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import "@pnp/graph/users";
import "@pnp/sp/site-users/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class SharepointService
{
	static init(context : WebPartContext)
	{
		sp.setup({
			spfxContext: context
		});
	}
}