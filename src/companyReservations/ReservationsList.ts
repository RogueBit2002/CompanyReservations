import { List } from "../services/Sharepoint/List";
import { DataList } from "./DataList";

export class ReservationsList extends DataList
{
	protected async setupList(list : List) : Promise<List>
	{
		console.debug("TODO: Setup reservations list, deleting for now");

		await list.spList.delete();
		return list;
	}
}