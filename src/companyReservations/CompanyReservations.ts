import { List } from "../services/Sharepoint/List";
import { User } from "../services/Sharepoint/User";
import { Reservation } from "./Reservation";
import { Workspace } from "./Workspace";

export class CompanyReservations
{
	static workspaceCatalog : List;
	static workspaceReservations : List;

	public static async init() : Promise<void>
	{	
		this.workspaceCatalog = List.getByName("CompanyReservations.Catalog.Workspaces");
		this.workspaceReservations = List.getByName("CompanyReservations.Reservations.Workspaces");
	}

	public static async getWorkspaces() : Promise<Workspace[]>
	{
		const items : any[] = await this.workspaceCatalog.getItems();

		let workspaces : Workspace[] = [];

		for(let i : number = 0; i < items.length; i ++)
		{
			const workspace : Workspace = await Workspace.getBySPItem(items[i]);
			workspaces.push(workspace);
		}

		return workspaces;
	}


	
	public static async getReservations() : Promise<Reservation[]>
	{
		const items : any[] = await this.workspaceReservations.getItems();

		let reservations : Reservation[] = [];

		for(let i : number = 0; i < items.length; i ++)
		{
			const reservation : Reservation = await Reservation.getBySPItem(items[i]);
			reservations.push(reservation);
		}

		return reservations;
	}
}