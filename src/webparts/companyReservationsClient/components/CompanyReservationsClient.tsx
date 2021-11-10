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
import { Room } from '../../../companyReservations/Room';
import { Reservation } from '../../../companyReservations/Reservation';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.state = {
			//list: List.getByName("CompanyReservations.Catalog.Rooms"),
			roomList: {
				rooms: [],
				views: []
				
			},

			reservationList:
			{
				reservations: []
			},

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

		const views : IViewField[] = await CompanyReservations.roomCatalog.getDefaultViewFields({
			"Title": ["Name", "Size"],
			"Hidden": [false],
			"ReadOnlyField": [false]
		});



		for(let i = 0; i < views.length; i ++)
		{
			views[i].maxWidth = 200;
			views[i].minWidth = 200;
		}


		const user : User = await User.getCurrent();
	}

	public render(): React.ReactElement<ICompanyReservationsClientProps> {
		
		const rooms : any[] = [];

		for(let i : number = 0; i < this.state.roomList.rooms.length; i ++)
		{
			//rooms.push(this.state.roomList.rooms[i].toSPItem());
		}

		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<Pivot className={styles.pivot}>
								<PivotItem headerText="Uw Reserveringen" itemKey="ownReservations">
									<div className={styles.pivotContent}>
										<ReservationListView user={this.state.user} reservations={[]}/>
									</div>
								</PivotItem>
								<PivotItem headerText="Reserveren" itemKey="Reserve">
									<div className={styles.pivotContent}>

										<Pivot className={styles.pivot}>
											<PivotItem headerText="Werkruimtes">
												<div className={styles.pivotContent}>
													<div className={styles.listViewContainer}>
														<ListView
														items={rooms}
														viewFields={this.state.roomList.views}
														iconFieldName="ServerRelativeUrl"
														compact={true}
														selectionMode={SelectionMode.single}
														//selection={this._getSelection}
														showFilter={true}
														//defaultFilter="John"
														filterPlaceHolder="Search..."
														//groupByFields={groupByFields}
														dragDropFiles={true}
														//onDrop={this._getDropFiles}
														stickyHeader={true} />
													</div>
												</div>
											</PivotItem>
											<PivotItem headerText="Apparatuur">
												<div className={styles.pivotContent}>
													<p>
														B
													</p>
												</div>
											</PivotItem>
										</Pivot>
									</div>
								</PivotItem>
							</Pivot>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
