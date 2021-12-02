import * as React from 'react';
import { IStackTokens, Panel, Stack } from 'office-ui-fabric-react';
import { DefaultButton, Pivot, PivotItem, DatePicker } from 'office-ui-fabric-react';

import styles from './ErrorReportPanel.module.scss';
import EquipmentError from '../EquipmentError/EquipmentError';

import { IErrorReportPanelProps } from './IErrorReportPanelProps';
import { IErrorReportPanelState } from './IErrorReportPanelState';

export default class ErrorReportPanel extends React.Component<IErrorReportPanelProps, IErrorReportPanelState> {

	constructor(props : IErrorReportPanelProps, state : IErrorReportPanelState)
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
    
	public render(): React.ReactElement<IErrorReportPanelProps> 
	{
        return (
            <div>
            <DefaultButton text="Report problem" onClick={() => {this.onbtnklik();}} />
            <Panel
                headerText="Report problem"
                isOpen={this.state.isOpen}
                onDismiss={() => {this.onbtnklik();}}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close">
                <Pivot>
                    <PivotItem headerText="WorkSpace">
                        <div>
                            <EquipmentError></EquipmentError>
                        </div>
                    </PivotItem>
                    <PivotItem headerText="Equipment">
                        <div>
                            <EquipmentError></EquipmentError>
                        </div>
                    </PivotItem>
                </Pivot>
            </Panel>
            </div>
        );
	}

    
}