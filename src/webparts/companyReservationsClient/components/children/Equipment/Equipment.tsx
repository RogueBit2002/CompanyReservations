import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField, PrimaryButton } from 'office-ui-fabric-react';
import styles from './Equipment.module.scss';

import { IEquipmentProps } from './IEquipmentProps';
import { IEquipmentState } from './IEquipmentState';

export default class CompanyReservationsClient extends React.Component<IEquipmentProps, IEquipmentState> {

	constructor(props : IEquipmentProps)
	{
		super(props);

        this.state = {
            firstDate: new Date,
            currentDate: new Date
        }
	}

    private setFirstDate(Date: Date) : void{
        this.setState({
            firstDate: Date,
        });
    }

    private submit() : void{
        
    }
    
	public render(): React.ReactElement<IEquipmentProps> 
	{
        const options: IDropdownOption[] = [
            { key: 'BeamerHeader', text: 'Beamers', itemType: DropdownMenuItemType.Header },
            { key: 'beamer1', text: 'beamer 1' },
            { key: 'beamer2', text: 'beamer 2' },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'peripheralsHeader', text: 'Peripherals', itemType: DropdownMenuItemType.Header },
            { key: 'Muis1', text: 'Muis' },
            { key: 'Toetsenbord1', text: 'Toetsenbord' },
            { key: 'VR-headset1', text: 'VR-headset' },
        ];

		return (
            <div>
                <Dropdown
                required
                placeholder="Selecteer een apparaat"
                label="Selecteer een apparaat"
                options={options}
                className = {styles.dropdown}
            />
            <DatePicker
            label="Selecteer een datum"
            isRequired
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onSelectDate={values => {this.setFirstDate(values)}}
            ></DatePicker>
            <TextField required label="Start Tijd" type="time"></TextField>
            <TextField required label="Eind Tijd" type="time"></TextField>
            <PrimaryButton
            text="Reserveer"
            onClick={() => {this.submit}}
            />

            <h1>Reserveringen {this.state.firstDate.toLocaleDateString()}</h1>
            <div className = {styles.reservationlist}>
                <p>Reservering 9:00 - 12:00</p>
            </div>
            <div className = {styles.reservationlist}>
                <p>Reservering 12:00 - 16:00</p>
            </div>
            </div>
		);
	}
}
