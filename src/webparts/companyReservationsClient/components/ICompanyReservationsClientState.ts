import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { Reservation } from "../../../companyReservations/Reservation";
import { Room } from "../../../companyReservations/Room";
import { List } from "../../../services/Sharepoint/List";
import { User } from "../../../services/Sharepoint/User";

export interface ICompanyReservationsClientState
{
	roomList: {
		rooms: Room[];
		views: IViewField[];
	};
	
	reservationList: {
		reservations: Reservation[];
	}
	user : User;
}