import { User } from "../services/Sharepoint/User";
import { CompanyReservations } from "./CompanyReservations";
import { Workspace } from "./Workspace";

interface IReservationCache
{
	reservee : User;
	workspace : Workspace;
	startDate : Date;
	endDate : Date;
}

export class Reservation
{
	private id : number;

	private cache : IReservationCache = {reservee:null,workspace:null,startDate:null,endDate:null};

	private constructor(id : number)
	{
		this.id = id;
	}

	
	public static async getById(id : number) : Promise<Reservation>
	{
		const reservation : Reservation = new Reservation(id);
		await reservation.update();
		return reservation;
	}

	
	public static async create(workspaceId : number, reservee : User, startDate : Date, endDate : Date)
	{
		const items : any[] = await CompanyReservations.workspaceReservations.getItems();

		const item : any = {
			ReserveeId: {
				results: [reservee.getId()]
			},
			StartDate: startDate.toISOString(),
			EndDate: endDate.toISOString(),
			WorkspaceId: workspaceId
		}
		

		try
		{
			const result : any = await CompanyReservations.workspaceReservations.addItem(item);
			
			const reservation : Reservation = await Reservation.getBySPItem(result);

			return reservation;
		} catch(e)
		{
			return null;
		}
	}

	public static async getBySPItem(item : any) : Promise<Reservation>
	{
		const reservation : Reservation = new Reservation(item.Id);

		const user : User = await User.getById(item.ReserveeId);
		const workspace : Workspace = await Workspace.getById(item.WorkspaceId);
		const startDate : Date = new Date(item.StartDate);
		const endDate : Date = new Date(item.EndDate);

		reservation.cache.reservee = user;
		reservation.cache.workspace = workspace;
		reservation.cache.startDate = startDate;
		reservation.cache.endDate = endDate;

		return reservation;
	}

	public async update() : Promise<void>
	{
		const item : any = (await CompanyReservations.workspaceReservations.getItemsByValues({Id:this.id}))[0];
		const reservee : User = await User.getById(item.ReserveeId);
		const workspace : Workspace = await Workspace.getById(item.WorkspaceId);
		const startDate : Date = new Date(item.StartDate);
		const endDate : Date = new Date(item.EndDate);

		this.cache.reservee = reservee;
		this.cache.workspace = workspace;
		this.cache.startDate = startDate;
		this.cache.endDate = endDate;
	}

	public async delete() : Promise<boolean>
	{
		return await CompanyReservations.workspaceReservations.removeItem(this.id);
	}


	public getId() : number
	{
		return this.id;
	}
	public getReservee() : User
	{
		return this.cache.reservee;	
	}

	public getWorkspace() : Workspace
	{
		return this.cache.workspace;
	}

	public getStartDate() : Date
	{
		return this.cache.startDate;
	}

	public getEndDate() : Date
	{
		return this.cache.endDate;
	}

	public async cancel() : Promise<void>
	{
		CompanyReservations.workspaceReservations.removeItem(this.id);
	}
}