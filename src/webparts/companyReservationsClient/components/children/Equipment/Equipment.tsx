import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker } from 'office-ui-fabric-react';
import { DateTimePicker} from '@pnp/spfx-controls-react/lib/dateTimePicker';
import styles from './Equipment.module.scss';

import { IEquipmentProps } from './IEquipmentProps';
import { IEquipmentState } from './IEquipmentState';

export default class CompanyReservationsClient extends React.Component<IEquipmentProps, IEquipmentState> {

	constructor(props : IEquipmentProps)
	{
		super(props);
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
                label="Basic uncontrolled example"
                options={options}
                className = {styles.dropdown}
            />
            <DatePicker></DatePicker>
            <DateTimePicker></DateTimePicker>
            </div>
		);
	}
}
