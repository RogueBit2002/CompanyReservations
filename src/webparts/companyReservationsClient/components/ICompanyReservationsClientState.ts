import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { List } from "../../../services/Sharepoint/List";
import { User } from "../../../services/Sharepoint/User";

export interface ICompanyReservationsClientState
{
	//Temporary
	list : List;
	items : any[];
	views : IViewField[];
	user : User;
}