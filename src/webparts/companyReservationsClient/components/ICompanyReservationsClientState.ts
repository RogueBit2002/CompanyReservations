import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { Reservation } from "../../../companyReservations/Reservation";
import { Workspace } from "../../../companyReservations/Workspace";
import { List } from "../../../services/Sharepoint/List";
import { User } from "../../../services/Sharepoint/User";

export interface ICompanyReservationsClientState
{
	user : User;
}