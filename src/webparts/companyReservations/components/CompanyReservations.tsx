import * as React from 'react';
import styles from './CompanyReservations.module.scss';
import { ICompanyReservationsProps } from './ICompanyReservationsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SharepointService } from "../services/Sharepoint/SharepointService";
import { List } from '../services/Sharepoint/List';

export default class CompanyReservations extends React.Component<ICompanyReservationsProps, {}> {


	public componentDidMount(): void {


		this.DoThing();
		
	}

	public render(): React.ReactElement<ICompanyReservationsProps> {
		return (
			<div className={ styles.companyReservations }>
			<div className={ styles.container }>
				<div className={ styles.row }>
				<div className={ styles.column }>
					<span className={ styles.title }>Company Reservations</span>
					<p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
					<p className={ styles.description }>{escape(this.props.description)}</p>
					<a href="https://aka.ms/spfx" className={ styles.button }>
					</a>
				</div>
				</div>
			</div>
			</div>
		);
	}


	public async DoThing()
	{
		await SharepointService.init();

		const list : List =  await SharepointService.getListByName("Cool List");

		list.getItems().then((e : any[]) => console.debug("Things: ", e));
	}
}
