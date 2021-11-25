import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField } from 'office-ui-fabric-react';
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';
import styles from './Equipment.module.scss';

import { IEquipmentProps } from './IEquipmentProps';
import { IEquipmentState } from './IEquipmentState';
import { values } from 'lodash';

export default class CompanyReservationsClient extends React.Component<IEquipmentProps, IEquipmentState> {

    

	constructor(props : IEquipmentProps)
	{
		super(props);

        this.state = {
            firstDate: new Date,
            secondDate: new Date,
            currentDate: new Date
        }
	}

    private setFirstDate(Date: Date) : void{
        this.setState({
            firstDate: Date,
            secondDate: Date
        });
    }

    private setSecondDate(Date: Date) : void{
        this.setState({
            secondDate: Date
        });
    }
    
	public render(): React.ReactElement<IEquipmentProps> 
	{
        const options: IDropdownOption[] = [
            { key: 'BeamerHeader', text: 'Beamers', itemType: DropdownMenuItemType.Header },
            { key: 'beamer1', text: 'beamer 1' },
            { key: 'beamer2', text: 'beamer 2' },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'peripheralsHeader', text: 'Peripherals', itemType: DropdownMenuItemType.Header },
            { key: 'Mouse1', text: 'Mouse' },
            { key: 'Keyboard1', text: 'Keyboard' },
            { key: 'VR-headset1', text: 'VR-headset' },
        ];

        const maskFormat: { [key: string]: RegExp } = {
            '*': /[0-9]/,
            };
		return (
            <div>
                <Dropdown
                placeholder="Selecteer een werkruimte"
                label="Selecteer een datum en tijd"
                options={options}
                className = {styles.dropdown}
            />
            <DatePicker
            isRequired
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onSelectDate={values => {this.setFirstDate(values)}}
            ></DatePicker>
            {/* <MaskedTextField label="With input mask" mask="date: ****" maskFormat={maskFormat} maskChar="-" /> */}
            <TextField label="Time TextField" type="time"></TextField>
            {/* <DateTimePicker
            timeDisplayControlType={TimeDisplayControlType.Dropdown}
            timeConvention={TimeConvention.Hours24}
            minutesIncrementStep={15}
            label="Start time"
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onChange={values => {this.setFirstDate(values)}}
            ></DateTimePicker> */}

            <h1>reservations {this.state.firstDate.toDateString()}</h1>
            <div className = {styles.reservationlist}>
                <p>reservation 9:00 - 12:00</p>
            </div>
            <div className = {styles.reservationlist}>
                <p>reservation 12:00 - 16:00</p>
            </div>
            </div>
		);
	}
}
