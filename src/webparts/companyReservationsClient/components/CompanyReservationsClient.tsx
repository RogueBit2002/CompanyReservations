import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem } from 'office-ui-fabric-react';

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
						<Pivot className={styles.pivot}>
							<PivotItem headerText="Tab 1">
								<div className={styles.pivotContent}>{"Pivot 1 content"}</div>
							</PivotItem>
							<PivotItem headerText="Tab 2">
								<div className={styles.pivotContent}>{"Pivot 2 content"}</div>
							</PivotItem>
						</Pivot>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
