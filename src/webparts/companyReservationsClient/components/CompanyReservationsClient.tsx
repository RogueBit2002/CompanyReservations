import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem, PrimaryButton, SelectionMode, TextField } from 'office-ui-fabric-react';



import { stubFalse } from 'lodash';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.state = {

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

	public render(): React.ReactElement<ICompanyReservationsClientProps> 
	{
		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<Pivot className={styles.pivot}>
								<PivotItem headerText="Uw Reserveringen" itemKey="ownReservations">
									<div className={styles.pivotContent}>
										
									</div>
								</PivotItem>
								<PivotItem headerText="Reserveren" itemKey="Reserve">
									<div className={styles.pivotContent}>

										<Pivot className={styles.pivot}>
											<PivotItem headerText="Werkruimtes">
												<div className={styles.pivotContent}>
													<div className={styles.listViewContainer}>
														
													</div>
												</div>
											</PivotItem>
											<PivotItem headerText="Apparatuur">
												<div className={styles.pivotContent}>
													
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
