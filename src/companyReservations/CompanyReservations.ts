import { List } from "../services/Sharepoint/List";
import { DataManager } from "./DataManager";

export class CompanyReservations
{
	static catalogList : List;

	static readonly dataManager : DataManager = new DataManager();

	public static async init() : Promise<void>
	{
		await this.dataManager.init();	
	}
}