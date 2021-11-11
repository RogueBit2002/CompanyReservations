import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.state = {
		};
	}

	public render(): React.ReactElement<ICompanyReservationsClientProps> 
	{
		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
