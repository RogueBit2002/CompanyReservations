import * as React from 'react';
import { IStackTokens, Rating, RatingSize, Stack } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton, TextField, Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, DatePicker } from 'office-ui-fabric-react';
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';
import styles from './EquipmentError.module.scss';

import { IEquipmentErrorProps } from './IEquipmentErrorProps';
import { IEquipmentErrorState } from './IEquipmentErrorState';
import { values } from 'lodash';

export default class EquipmentError extends React.Component<IEquipmentErrorProps, IEquipmentErrorState> {

    

	constructor(props : IEquipmentErrorProps)
	{
		super(props);

        // this.state = {
        //     firstDate: new Date,
        //     secondDate: new Date,
        //     currentDate: new Date
        // }
	}

	public render(): React.ReactElement<IEquipmentErrorProps> 
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
                placeholder="Selecteer een apparaat"
                label="Selecteer een apparaat en vertel wat er aan mankeert"
                options={options}
                className = {styles.dropdown}
            />
            <div><TextField placeholder="Wat mankeert er?" multiline autoAdjustHeight/></div>

            And you could also rate the item or room
      <Rating
        max={5}
        size={RatingSize.Large}
        aria-label="Large stars"
        ariaLabelFormat="{0} of {1} stars"
      />
            <div><PrimaryButton text="Submit"/></div>
            <div className = {styles.reservationlist}>
            </div>
            </div>
		);
	}
}
