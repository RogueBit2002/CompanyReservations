import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.setState({});
	}
	
	public render(): React.ReactElement<ICompanyReservationsClientProps> {
		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<span className={ styles.title }>Welcome to SharePoint!</span>
							<p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
							<p className={ styles.description }>{escape(this.props.description)}</p>
							<a href="https://aka.ms/spfx" className={ styles.button }>
							<span className={ styles.label }>Learn more</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
