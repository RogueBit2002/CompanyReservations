import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField, PrimaryButton } from 'office-ui-fabric-react';
import styles from './WorkSpaces.module.scss';

import { IWorkSpacesProps } from './IWorkSpacesProps';
import { IWorkSpacesState } from './IWorkSpacesState';
import { toNumber, values } from 'lodash';
import { Workspace } from '../../../../../companyReservations/Workspace';
import * as strings from 'CompanyReservationsAdminWebPartStrings';
import { CompanyReservations } from "../../../../../companyReservations/CompanyReservations";

export default class CompanyReservationsClient extends React.Component<IWorkSpacesProps, IWorkSpacesState>{

    constructor(props : IWorkSpacesProps)
	{
		super(props);

        this.state = {
            firstDate: new Date,
            currentDate: new Date,
            workspaceId: 0,
            startTime: "",
            endTime: "",
        }
	}

    componentDidMount(): void {
        console.debug(CompanyReservations.getWorkspaces());
    }

    makereservation(): void{

    }
    
    public render(): React.ReactElement<IWorkSpacesProps> 
	{
        const options: IDropdownOption[] = [
            { key: 'BG', text: 'Begane grond', itemType: DropdownMenuItemType.Header },
            { key: '1', text: 'Vergaderkamer 0-1', itemType: DropdownMenuItemType.Normal},
            { key: '2', text: 'Vergaderkamer 0-2' },
            { key: 'V1', text: 'Verdieping 1', itemType: DropdownMenuItemType.Header },
            { key: '3', text: 'Vergaderkamer 1-1' },
            { key: '4', text: 'Vergaderkamer 1-2' },
            { key: '5', text: 'Vergaderkamer 1-3' },
        ];

        const maskFormat: { [key: string]: RegExp } = {
            '*': /[0-9_]/,
            '%':/[0-2_]/,
            '#':/[0-5_]/,
        };

		return (
            <div>
                <Dropdown
                required
                placeholder="Selecteer een werkruimte"
                label="Selecteer een werkruimte"
                options={options}
                className = {styles.dropdown}
                onChange={(e, selectedOption) => {
                    console.debug(selectedOption);
                    this.setState({workspaceId: toNumber(selectedOption.key.toString())});
                }}
            />
            <DatePicker
            label="Selecteer een datum"
            isRequired
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onSelectDate={values => {this.setState({firstDate : values})}}
            ></DatePicker>

            <MaskedTextField label="Start Tijd" mask="%*:#*" maskFormat={maskFormat} maskChar="*" onChange={(e, newtime) => {console.debug(newtime)}}/>
            <MaskedTextField label="Eind Tijd" mask="%*:#*" maskFormat={maskFormat} maskChar="*" />



            <PrimaryButton
            text="Reserveer"
            onClick={() => {this.makereservation()}}
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