import { CompanyReservations } from "./CompanyReservations";

interface IWorkspaceCache
{
	name : string;
	size : number;
}
export class Workspace
{

	private id : number;
	private cache : IWorkspaceCache = { name : "", size : 0};


	private constructor(id : number)
	{
		this.id = id;
	}

	public static async getById(id : number) : Promise<Workspace>
	{
		const workspace : Workspace = new Workspace(id);
		await workspace.update();

		return workspace;
	}

	public static getBySPItem(item : any) : Workspace
	{
		const workspace : Workspace = new Workspace(item.Id);
		workspace.cache.name = item.Title;
		workspace.cache.size = item.Size;

		return workspace;
	}

	

	public async update() : Promise<void>
	{
		const item : any = (await CompanyReservations.workspaceCatalog.getItemsByValues({Id:this.id}))[0];
		this.cache.name = item.Title;
		this.cache.size = item.Size;
	}
	
	public async getSPItem() : Promise<any>
	{
		const rooms : any[] = await CompanyReservations.workspaceCatalog.getItemsByValues({Id:this.id});
		return rooms[0];
	}

	public getId() : number
	{
		return this.id;
	}
	

	public getName() : string
	{
		return this.cache.name;
	}

	public getSize() : number
	{
		return this.cache.size;
	}

	public toString() : string
	{
		return this.cache.name + " - " + this.cache.size.toString();
	}
}