import * as React from 'react';
import { IStackTokens, Panel, Stack } from 'office-ui-fabric-react';
import { DefaultButton, Pivot, PivotItem, DatePicker } from 'office-ui-fabric-react';

import styles from './ReservationPanel.module.scss';
import Equipment from '../Equipment/Equipment';

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

    private onbtnklik() : void {
        this.setState(
            {
                isOpen: !this.state.isOpen
            }
        );
    }
    
	public render(): React.ReactElement<IReservationPanelProps> 
	{
        return (
            <div>
            <DefaultButton text="Make reservation" onClick={() => {this.onbtnklik();}} />
            <Panel
                headerText="Sample panel"
                isOpen={this.state.isOpen}
                onDismiss={() => {this.onbtnklik();}}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close">
                <Pivot>
                    <PivotItem headerText="WorkSpace">
                        <div>
                            <Equipment></Equipment>
                        </div>
                    </PivotItem>
                    <PivotItem headerText="Equipment">
                        <div>
                            <Equipment></Equipment>
                        </div>
                    </PivotItem>
                </Pivot>
            </Panel>
            </div>
        );
	}

    
}