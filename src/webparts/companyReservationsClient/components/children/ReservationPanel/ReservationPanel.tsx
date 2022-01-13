import * as React from 'react';
import { IStackTokens, Panel, Stack } from 'office-ui-fabric-react';
import { DefaultButton, Pivot, PivotItem, DatePicker } from 'office-ui-fabric-react';

import styles from './ReservationPanel.module.scss';
import Equipment from '../Equipment/Equipment';
import WorkSpaces from '../WorkSpaces/WorkSpaces';

import { IReservationPanelProps } from './IReservationPanelProps';
import { IReservationPanelState } from './IReservationPanelState';

export default class CompanyReservationsClient extends React.Component<IReservationPanelProps, IReservationPanelState> {

	constructor(props : IReservationPanelProps, state : IReservationPanelState)
	{
		super(props);

        this.state = {
            isOpen: false
        }
	}
    
	public render(): React.ReactElement<IReservationPanelProps> 
	{
        return (
            <div>
            <DefaultButton text="Make reservation" onClick={() => {this.setState({isOpen:true})}} />
            <Panel
                headerText="Make Reservation"
                isOpen={this.state.isOpen}
                onDismiss={() => {this.setState({isOpen:false})}}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close">
                <Pivot>
                    <PivotItem headerText="WorkSpace">
                        <div>
                            <WorkSpaces></WorkSpaces>
                        </div>
                    </PivotItem>
                </Pivot>
            </Panel>
            </div>
        );
	}

    
}