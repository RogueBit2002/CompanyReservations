import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem, PrimaryButton, SelectionMode, TextField } from 'office-ui-fabric-react';



import { stubFalse } from 'lodash';
import Equipment from './children/Equipment/Equipment';
import ReservationPanel from './children/ReservationPanel/ReservationPanel';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);
		
	}

	
	
	public render(): React.ReactElement<ICompanyReservationsClientProps> 
	{
		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<ReservationPanel></ReservationPanel>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
