import { sp } from "@pnp/sp";
import { ISiteUser } from "@pnp/sp/site-users/types";

export class User
{

	spUser : any;

	constructor(user : ISiteUser)
	{
		this.spUser = user;
	}


	public static async getCurrent() : Promise<User>
	{
		const user : ISiteUser = await sp.web.currentUser();
		return new User(user);
	}

	public static async getById(id : number) : Promise<User>
	{
		const user : ISiteUser = await sp.web.getUserById(id);
		return new User(user);
	}

	public getName(): string
	{
		return this.spUser.Title;
	}

	public getEmail() : string
	{
		return this.spUser.Email;
	}

	public getId() : number
	{
		return this.spUser.Id;
	}
}