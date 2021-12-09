import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem, PrimaryButton, SelectionMode, TextField } from 'office-ui-fabric-react';


import ReservationPanel from './children/ReservationPanel/ReservationPanel';
import ReservationList from './children/ReservationList/ReservationList';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);
		
	}

	
	
	public render(): React.ReactElement<ICompanyReservationsClientProps> 
	{
		return (
			<div>
				<ReservationPanel></ReservationPanel>
				<ReservationList></ReservationList>
			</div>
		);
	}
}
