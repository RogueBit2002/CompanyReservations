import { List } from "../services/Sharepoint/List";
import { User } from "../services/Sharepoint/User";
import { Reservation } from "./Reservation";
import { Room } from "./Room";

export class CompanyReservations
{
	static roomCatalog : List;
	static roomReservations : List;


	private rooms : Room[] = [];
	private roomReservations : Reservation[] = [];

	public static async init() : Promise<void>
	{	
		this.roomCatalog = List.getByName("CompanyReservations.Catalog.Rooms");
		this.roomReservations = List.getByName("CompanyReservations.Reservations.Rooms");
	}

}