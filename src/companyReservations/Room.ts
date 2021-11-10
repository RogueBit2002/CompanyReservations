import { CompanyReservations } from "./CompanyReservations";

export class Room
{

	private id : number;

	constructor(id : number, name : string, size : number)
	{
		this.id = id;
	}

	public getId() : number
	{
		return this.id;
	}


	public async getName() : Promise<string>
	{
		CompanyReservations.workspace
	}
}