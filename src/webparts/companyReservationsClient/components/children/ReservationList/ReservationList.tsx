import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField, PrimaryButton } from 'office-ui-fabric-react';
import styles from './ReservationList.module.scss';

import { IReservationListProps } from './IReservationListProps';
import { IReservationListState } from './IReservationListState';

export default class ReservationList extends React.Component<IReservationListProps, IReservationListState> {
    constructor(props : IReservationListProps)
	{
		super(props);
	}

    public render(): React.ReactElement<IReservationListProps> 
	{
		return (
            <div>
                <div className = {styles.reservationlist}>
                    <h1>Reserveringen</h1>
                </div>
                <div className = {styles.reservationlist}>
                    <p>Reservering 9:00 - 12:00</p>
                    <p>VergaderRuimte 0.1</p>
                    <PrimaryButton text="Anuleer"/>
                </div>
                <div className = {styles.reservationlist}>
                    <p>Reservering 13:00 - 14:00</p>
                    <p>VergaderRuimte 0.2</p>
                    <PrimaryButton text="Anuleer"/>
                </div>
            </div>
		);
	}
}