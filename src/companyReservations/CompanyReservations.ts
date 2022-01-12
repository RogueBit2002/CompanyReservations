import { List } from "../services/Sharepoint/List";
import { User } from "../services/Sharepoint/User";
import CompanyReservationsAdmin from "../webparts/companyReservationsAdmin/components/CompanyReservationsAdmin";
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

	public static async canReservate(id : number, startDate : Date, endDate : Date, excludeReservations: number[]) : Promise<boolean>
	{
		const workspace : Workspace = await Workspace.getById(id);

		const reservations : Reservation[] = await CompanyReservations.getReservations();

		let valid : boolean = true;
		for(let i = 0; i < reservations.length; i ++)
		{
			const reservation : Reservation = reservations[i];
			if(reservation.getWorkspace().getId() != workspace.getId())
			{
				continue;
			}

			if(
				(startDate >= reservation.getStartDate() && startDate <= reservation.getEndDate()) ||
				endDate >= reservation.getStartDate() && endDate <= reservation.getEndDate())
			{
				//Already reserved
				valid = false;
				break;
			}
		}

		return valid;
	}
	public static async placeReservation( workspaceId : number, reservee : User, startDate : Date, endDate : Date) : Promise<Reservation>
	{
		
		if(!this.canReservate(workspaceId,startDate,endDate,[]))
		{
			return null;
		}

		const res : Reservation = await Reservation.create(workspaceId,reservee,startDate,endDate);

		return res;
	}


	public static async changeReservation(reservationId : number, startDate : Date, endDate: Date) : Promise<Reservation>
	{
		const oldRes : Reservation = await Reservation.getById(reservationId);

		if(!this.canReservate(oldRes.getWorkspace().getId(), startDate, endDate, [oldRes.getId()]))
		{
			return null;
		}

		
		
	}

	public static async deleteReservation( reservationId : number) : Promise<boolean>
	{
		try
		{
			const reservation : Reservation = await Reservation.getById(reservationId);

			return await reservation.delete();
		} catch(e)
		{
			return false;
		}
	}

	public static async getActiveReservations(userId : number) : Promise<Reservation[]>
	{
		const allReservations : Reservation[] = await this.getReservations();

		let reservations : Reservation[] = [];
		for(let i = 0; i < allReservations.length; i ++)
		{
			if(allReservations[i].getReservee().getId() == userId)
			{
				reservations.push(allReservations[i]);
			}
		}

		return reservations;
	}
}