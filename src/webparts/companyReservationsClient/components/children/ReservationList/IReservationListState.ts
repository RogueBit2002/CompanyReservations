import { Reservation } from "../../../../../companyReservations/Reservation";
import { User } from "../../../../../services/Sharepoint/User";

export interface IReservationListState{
    user : User;
	reservations : Reservation[]
}