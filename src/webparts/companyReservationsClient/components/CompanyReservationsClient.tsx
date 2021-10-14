import * as React from 'react';
import styles from './CompanyReservationsClient.module.scss';
import { ICompanyReservationsClientProps } from './ICompanyReservationsClientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICompanyReservationsClientState } from './ICompanyReservationsClientState';
import { Pivot, PivotItem, PrimaryButton, SelectionMode } from 'office-ui-fabric-react';

import { List } from '../../../services/Sharepoint/List';
import { User } from '../../../services/Sharepoint/User';
import { ListView } from '@pnp/spfx-controls-react/lib/ListView';

export default class CompanyReservationsClient extends React.Component<ICompanyReservationsClientProps, ICompanyReservationsClientState> {


	constructor(props : ICompanyReservationsClientProps)
	{
		super(props);

		this.state = {
			list: List.getByName("Cool List"),
			items: [],
			views: [],
			user: null
		};

		
	}

	public componentDidMount()
	{
		this.updateState();
	}

	public componentDidUpdate()
	{
		

	}

	private updateState()
	{
		this.state.list.getItems().then((items : any[]) => {
			this.setState({items:items});
			console.debug("List Items: ", items);

		});


		this.state.list.getDefaultViewFields(
			{
				"Title": ["Title", "CoolIemand"],
				"Hidden": [false],
				"Group": ["Custom Columns"],
				"ReadOnlyField": [false]
			}).then((a) => {

			for(let i = 0; i < a.length; i ++)
			{
				a[i].maxWidth = 200;
				a[i].minWidth = 200;
			}

			this.setState({views:a});
		});

		User.getCurrent().then((user : User) => {
			this.setState({user:user});
		});

	}
	public render(): React.ReactElement<ICompanyReservationsClientProps> {
		
		const name : string = this.state.user == null ? "" : this.state.user.getName();

		return (
			<div className={ styles.companyReservationsClient }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<span className = {styles.subTitle}>Hallo {name}!</span>
							{ /*<PrimaryButton onClick={() => this.updateState()} label="Yoo"/> */ }
							<Pivot className={styles.pivot}>
								<PivotItem headerText="Reserveren">
									<div className={styles.pivotContent}>
										<div className={styles.listViewContainer}>
											<ListView
											items={this.state.items}
											viewFields={this.state.views}
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
										</div>
									</div>
								</PivotItem>
								<PivotItem headerText="UwU Reservaties">
									<div className={styles.pivotContent}>
										
									</div>
								</PivotItem>
							</Pivot>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
