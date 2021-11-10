import { sp } from "@pnp/sp";
import { ISiteUser, ISiteUserProps } from "@pnp/sp/site-users/types";
import { ThemeSettingName } from "@uifabric/styling";

interface IUserCache
{
	name : string;
	email : string;
}
export class User
{
	private id : number;

	private cache : IUserCache = 
	{
		name: "",
		email: ""
	};

	private constructor(id : number)
	{
		this.id = id;
	}

	public static async getById(id : number) : Promise<User>
	{
		const user : User = new User(id);
		await user.update();

		return user;
	}

	public static async getCurrent() : Promise<User>
	{
		const siteUser : any = await sp.web.currentUser();
		const id : number = siteUser.Id;

		const user : User = new User(id);
		await user.update();

		return user;
	}


	public async update() : Promise<void>
	{
		const thing : any = await sp.web.getUserById(this.id).get();
		this.cache.name = thing.Title;
		this.cache.email = thing.Email;
	}


	public getName(): string
	{
		return this.cache.name;
	}

	public getEmail() : string
	{
		return this.cache.email;
	}

	public getId() : number
	{
		return this.id;
	}
}