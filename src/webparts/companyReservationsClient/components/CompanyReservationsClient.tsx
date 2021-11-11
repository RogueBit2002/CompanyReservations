import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem, PrimaryButton, SelectionMode, TextField } from 'office-ui-fabric-react';

import { List } from '../../../services/Sharepoint/List';
import { User } from '../../../services/Sharepoint/User';
import { IViewField, ListView } from '@pnp/spfx-controls-react/lib/ListView';
import { CompanyReservations } from '../../../companyReservations/CompanyReservations';
import { stubFalse } from 'lodash';
import ReservationListView from './children/ReservationListView/ReservationListView';
import { Workspace } from '../../../companyReservations/Workspace';
import { Reservation } from '../../../companyReservations/Reservation';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.state = {
			//list: List.getByName("CompanyReservations.Catalog.Rooms"),

			user: null
		};

		
	}

	public componentDidMount()
	{
		this.updateState();
	}

	public componentDidUpdate()
	{
		

	}

	private async updateState()
	{
		//const rooms : Room[] = await CompanyReservations.getRooms();

		//const reservations : Reservation[] = await CompanyReservations.getReservations();

		/*const views : IViewField[] = await CompanyReservations.roomCatalog.getDefaultViewFields({
			"Title": ["Name", "Size"],
			"Hidden": [false],
			"ReadOnlyField": [false]
		});



		for(let i = 0; i < views.length; i ++)
		{
			views[i].maxWidth = 200;
			views[i].minWidth = 200;
		}


		*/
		/*const user : User = await User.getCurrent();
		this.setState({user: user});*/
	}

	private async onButtonClick()
	{
		const reservations : Reservation[] = await CompanyReservations.getReservations();

		for(let i = 0; i < reservations.length; i ++)
		{
			const user : User = await reservations[i].getReservee();

			const workspace : Workspace = await reservations[i].getWorkspace();

			const wss : string = await workspace.toString();
			
			//console.debug("Reservation > ", user.getEmail(), "-",wss);
		}

		const workspaces : Workspace[] = await CompanyReservations.getWorkspaces();


		for(let i = 0; i < workspaces.length; i ++)
		{
			const workspace : Workspace = workspaces[i];
			const name : string = await workspace.getName();
			const size : number = await workspace.getSize();
		}
	}
	public render(): React.ReactElement<ICompanyReservationsClientProps> 
	{
		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
