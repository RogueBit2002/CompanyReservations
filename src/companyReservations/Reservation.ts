import { User } from "../services/Sharepoint/User";
import CompanyReservationsAdminWebPart from "../webparts/companyReservationsAdmin/CompanyReservationsAdminWebPart";
import { CompanyReservations } from "./CompanyReservations";
import { Room } from "./Room";

export class Reservation
{
	private id : number;

	constructor(id : number)
	{
		this.id = id;
	}


	public async getReservor() : Promise<User>
	{
		const rawRes : any = await CompanyReservations.roomReservations.getItemsByValues({Id:this.id});

		return User.getById(rawRes.ReservorId);
	}
}