import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker } from 'office-ui-fabric-react';
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

		return (
            <div>
                <Dropdown
                placeholder="Select an option"
                label="Select a Device and start date"
                options={options}
                className = {styles.dropdown}
            />
            <DateTimePicker
            timeDisplayControlType={TimeDisplayControlType.Dropdown}
            timeConvention={TimeConvention.Hours24}
            minutesIncrementStep={15}
            label="Start time"
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onChange={values => {this.setFirstDate(values)}}
            ></DateTimePicker>

            <DateTimePicker
            timeDisplayControlType={TimeDisplayControlType.Dropdown}
            timeConvention={TimeConvention.Hours24}
            minutesIncrementStep={15}
            label="Start time"
            minDate={this.state.secondDate}
            value={this.state.secondDate}
            onChange={values => {this.setSecondDate(values)}}
            ></DateTimePicker>
            <div className = {styles.reservationlist}>
                <p>reservation 9:00 - 12:00</p>
            </div>
            </div>
		);
	}
}
