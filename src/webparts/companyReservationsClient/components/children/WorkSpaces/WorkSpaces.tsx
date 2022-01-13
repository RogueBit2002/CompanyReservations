import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker, MaskedTextField, TextField, PrimaryButton, getDatePartHashValue } from 'office-ui-fabric-react';
import styles from './WorkSpaces.module.scss';

import { IWorkSpacesProps } from './IWorkSpacesProps';
import { IWorkSpacesState } from './IWorkSpacesState';
import { toNumber, values } from 'lodash';
import { Workspace } from '../../../../../companyReservations/Workspace';
import * as strings from 'CompanyReservationsAdminWebPartStrings';
import { CompanyReservations } from "../../../../../companyReservations/CompanyReservations";
import { User } from '../../../../../services/Sharepoint/User';

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
            workspacereservations: [],
            dropdownopt: []
        }
	}

    async componentDidMount(): Promise<void> {
        await this.GetDropdownOptions();
        // await this.GetCurrentRoomReservations();
    }

    async GetDropdownOptions(): Promise<void>{
        let worksp = await CompanyReservations.getWorkspaces();
        let options = [];
        worksp.forEach(element => {
            let option = {key: element.getId().toString(), text: element.getName(), itemType: DropdownMenuItemType.Normal};
            options.push(option);
        });
        this.setState({dropdownopt: options});
    }

    Comparedates(date1:Date, date2:Date){
        if (date1.getDay() == date2.getDay() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
            return true;
        }else{
            return false;
        }
    }
    
    async GetCurrentRoomReservations(): Promise<void>{
        let reservations = await CompanyReservations.getReservations();
        let res = [];
        reservations.forEach(element => {
            let date1 = element.getStartDate();
            let samedate = this.Comparedates(date1, this.state.firstDate);
            if (element.getWorkspace().getId() == this.state.workspaceId && samedate) {
                let r = {starttime: (element.getStartDate().toLocaleTimeString()), endtime: (element.getEndDate().toLocaleTimeString())};
                res.push(r);
            }
        });
        this.setState({workspacereservations: res});
    }

    async MakeReservation(): Promise<void>{
        if (this.state.workspaceId != 0 && this.state.startTime != "" && this.state.startTime != "") {
            let user = await User.getCurrent();
            let startdate = new Date();
            let enddate = new Date();
            
            startdate.setFullYear(this.state.firstDate.getFullYear());
            startdate.setMonth(this.state.firstDate.getMonth());
            startdate.setDate(this.state.firstDate.getDate());
            startdate.setHours(parseInt(this.state.startTime.substring(0,2)), parseInt(this.state.startTime.substring(3,5)), 0, 0);

            enddate.setFullYear(this.state.firstDate.getFullYear());
            enddate.setMonth(this.state.firstDate.getMonth());
            enddate.setDate(this.state.firstDate.getDate());
            enddate.setHours(parseInt(this.state.endTime.substring(0,2)), parseInt(this.state.endTime.substring(3,5)), 0, 0);

            let c = await CompanyReservations.placeReservation(this.state.workspaceId, user, startdate, enddate);
            this.GetCurrentRoomReservations();
        }
    }

    public render(): React.ReactElement<IWorkSpacesProps> 
	{
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
                options={this.state.dropdownopt}
                className = {styles.dropdown}
                onChange={(e, selectedOption) => {
                    this.setState({workspaceId: toNumber(selectedOption.key.toString())});
                    this.GetCurrentRoomReservations();
                }}
            />
            <DatePicker
            label="Selecteer een datum"
            isRequired
            minDate={this.state.currentDate}
            value={this.state.firstDate}
            onSelectDate={values => {
                this.setState({firstDate : values});
                this.GetCurrentRoomReservations(); 
            }}
            ></DatePicker>

            <MaskedTextField label="Start Tijd" mask="%*:#*" maskFormat={maskFormat} maskChar="*" onChange={(e, newtime) => {this.setState({startTime: newtime})}}/>
            <MaskedTextField label="Eind Tijd" mask="%*:#*" maskFormat={maskFormat} maskChar="*" onChange={(e, endtime) => {this.setState({endTime: endtime})}}/>



            <PrimaryButton
            text="Reserveer"
                onClick={() => {this.MakeReservation()}}
            />
            
            
            
            <h1>Reserveringen {this.state.firstDate.toLocaleDateString()}</h1>
            {this.state.workspacereservations.map((objects) => {
                return (
                    <div className = {styles.reservationlist}>
                        <p>Reserveering {objects.starttime} - {objects.endtime}</p>
                    </div>
                )
            })}
            </div>
		);
	}
}