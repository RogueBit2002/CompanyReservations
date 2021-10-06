import { List } from "../services/Sharepoint/List";

export interface ICompanyReservationsState
{
	createInput : string;
	searchInput : string;
	list : List;
}