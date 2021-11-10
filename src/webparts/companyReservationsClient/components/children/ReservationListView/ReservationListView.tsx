import { IViewField, ListView, SelectionMode } from '@pnp/spfx-controls-react/lib/ListView';
import * as React from 'react';
import { Reservation } from '../../../../../companyReservations/Reservation';

import { IReservationListViewProps } from './IReservationListViewProps';
import { IReservationListViewState } from './IReservationListViewState';


export default class ReservationListView extends React.Component<IReservationListViewProps, IReservationListViewState> {

	constructor(props: IReservationListViewProps) {
		super(props);

		this.state = {
		
		};
	}

	public render(): React.ReactElement<IReservationListViewProps> {
		const viewFields : IViewField[] = [
			/*{
				name: "Reservor",
				displayName: "Reservor" 
			},*/
			{
				name: "Room",
				displayName: "Room"
			},
			{
				name: "StartTime",
				displayName: "End Time"
			},
			{
				name: "EndTime",
				displayName: "End Time"
			}
		];

		let relevantReservations : any[] = [];

		for(let i : number = 0; i < this.props.reservations.length; i ++)
		{
			const res : Reservation = this.props.reservations[i];
			/*if(res.getReservor().getId() == this.props.user.getId())
			{
				//relevantReservations.push(res);
			}

			relevantReservations.push(res.toSPItem());
			*/
		}
		return (
			<ListView
				items={relevantReservations}
				viewFields={viewFields}
				iconFieldName="ServerRelativeUrl"
				compact={true}
				selectionMode={SelectionMode.single}
				//selection={this._getSelection}
				showFilter={true}
				//defaultFilter="John"
				filterPlaceHolder="Search..."
				//groupByFields={groupByFields}
				dragDropFiles={true}
				//onDrop={this._getDropFiles}
				stickyHeader={true} />
		);
	}
}
