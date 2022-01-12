import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField, PrimaryButton, ThemeSettingName } from 'office-ui-fabric-react';
import styles from './ReservationList.module.scss';

import { IReservationListProps } from './IReservationListProps';
import { IReservationListState } from './IReservationListState';
import { User } from '../../../../../services/Sharepoint/User';
import { CompanyReservations } from '../../../../../companyReservations/CompanyReservations';
import { Reservation } from '../../../../../companyReservations/Reservation';

export default class ReservationList extends React.Component<IReservationListProps, IReservationListState> {

    constructor(props : IReservationListProps)
	{
		super(props);

		this.state ={
			user : null,
			reservations: []
		};

		console.debug(this.state);

		this.updateUser();
	}

	private async updateUser()
	{
		const user : User = await User.getCurrent();

		this.setState({
			user : user
		});

		await this.updateReservations();
	}

	private async updateReservations()
	{
		const reservations : Reservation[] = await CompanyReservations.getActiveReservations(this.state.user.getId());
		
		this.setState({reservations:reservations});
	}


	private convertTimeToString(date : Date) : string
	{
		const hours : number = date.getHours();
		console.debug(hours);

		return (hours < 10 ? "0" : "") + hours.toString() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
	}

	private convertDateToString(date : Date) : string
	{
		return date.toDateString();
	}
	private renderItem(reservation : Reservation) : React.ReactElement 
	{
		const startTime : string = this.convertTimeToString(reservation.getStartDate());
		const endTime : string = this.convertTimeToString(reservation.getEndDate());
		const date : string = this.convertDateToString(reservation.getStartDate());
		return ( 
		<div className = {styles.reservationlist}>
			<p>Reservering {date} {startTime} - {endTime}</p>
			<p>{reservation.getWorkspace().getName()}</p>
			<PrimaryButton text="Anuleer" onClick={() => {this.cancelReservation(reservation.getId())}}/>
		</div>
		);
	}

	private cancelReservation(id : number)
	{
		if(confirm("Are you sure you want to cancel this reservation?"))
		{
			CompanyReservations.deleteReservation(id);
			this.updateReservations();
		}
	}

    public render(): React.ReactElement<IReservationListProps> 
	{

		let items : any[] = [];

		const x : any = this.state;
		
		const y : any = this.state.reservations;
		for(let i = 0; i < this.state.reservations.length; i ++)
		{
			items.push(this.renderItem(this.state.reservations[i]));
		}

		return (
            <div>
				{items}
            </div>
		);
	}
}