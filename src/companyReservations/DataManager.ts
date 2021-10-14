import { ICompanyReservationsClientState } from "../webparts/companyReservationsClient/components/ICompanyReservationsClientState";
import { CatalogList } from "./CatalogList";
import { ReservationsList } from "./ReservationsList";

export class DataManager
{
	catalog : CatalogList = new CatalogList();
	reservations : ReservationsList = new ReservationsList();

	public async init()
	{
		await this.catalog.init("CompanyReservations.Catalog");
		await this.reservations.init("CompanyReservations.Reservations");
	}
}