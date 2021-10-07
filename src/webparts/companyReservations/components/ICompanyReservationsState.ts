import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { List } from "../services/Sharepoint/List";

export interface ICompanyReservationsState
{
	createInput : string;
	searchInput : string;
	list : List;
	items : any[];
	views : IViewField[];
}