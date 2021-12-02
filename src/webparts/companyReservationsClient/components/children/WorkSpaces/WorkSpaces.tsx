import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField } from 'office-ui-fabric-react';
import styles from './WorkSpaces.module.scss';

import { IWorkSpacesProps } from './IWorkSpacesProps';
import { IWorkSpacesState } from './IWorkSpacesState';
import { values } from 'lodash';

export default class CompanyReservationsClient extends React.Component<IWorkSpacesProps, IWorkSpacesState>{

    constructor(props : IWorkSpacesProps)
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

    public render(): React.ReactElement<IWorkSpacesProps> 
	{
        const options: IDropdownOption[] = [
            { key: 'BG', text: 'Begane grond', itemType: DropdownMenuItemType.Header },
            { key: '0-1', text: 'Vergaderkamer 0-1' },
            { key: '0-2', text: 'Vergaderkamer 0-2' },
            { key: 'V1', text: 'Verdieping 1', itemType: DropdownMenuItemType.Header },
            { key: '1-1', text: 'Vergaderkamer 1-1' },
            { key: '1-2', text: 'Vergaderkamer 1-2' },
            { key: '1-3', text: 'Vergaderkamer 1-3' },
        ];

		return (
            <div>
                <Dropdown
                required
                placeholder="Selecteer een werkruimte"
                label="Selecteer een werkruimte"
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