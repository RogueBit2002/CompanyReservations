import * as React from 'react';
import styles from './CompanyReservations.module.scss';
import { ICompanyReservationsProps } from './ICompanyReservationsProps';
//import { escape } from '@microsoft/sp-lodash-subset';

import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { SharepointService } from "../services/Sharepoint/SharepointService";
import { List } from '../services/Sharepoint/List';
import { ICompanyReservationsState } from './ICompanyReservationsState';

import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import TestChildComponent from './TestChildComponent';

export default class CompanyReservations extends React.Component<ICompanyReservationsProps, ICompanyReservationsState> {

	constructor(props: ICompanyReservationsProps)
	{
		super(props);

		this.state = {
			createInput: "",
			searchInput: "",
			list: List.getByName("Cool List"),
			items: [],
			views: []
		}

		this.updateItems();
		
		
	}

	public componentDidUpdate()
	{
		
	}


	public render(): React.ReactElement<ICompanyReservationsProps> {

		return (
			<div className={ styles.companyReservations }>
				<div className={ styles.container }>
					<div className={ styles.row }>
						<div className={ styles.column }>
							<span className={ styles.title }>Cool Title :)</span>
							<div>
								<p className={ styles.description }>Create an item</p>
								<TextField onChange={(event,value) => this.setState({createInput:value}) } label="Title:" />
								<PrimaryButton text="Create" onClick={() => this.createItem()} allowDisabledFocus />	
							</div>
							<div>
								<p className={ styles.description }>Search for items</p>
								<TextField onChange={(event,value) => this.setState({searchInput:value}) } label="Title:" />
								<PrimaryButton text="Search" onClick={() => this.searchItems()} allowDisabledFocus />	
							</div>
							<ListView
								items={this.state.items}
								viewFields={this.state.views}
								iconFieldName="ServerRelativeUrl"
								compact={true}
								selectionMode={SelectionMode.multiple}
								//selection={this._getSelection}
								showFilter={true}
								//defaultFilter="John"
								filterPlaceHolder="Search..."
								//groupByFields={groupByFields}
								dragDropFiles={true}
								//onDrop={this._getDropFiles}
								stickyHeader={true} />
							<TestChildComponent description="-"></TestChildComponent>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private async createItem()
	{
		await this.state.list.addItem({Title:this.state.createInput});
		
		console.debug("Created a new item with title:",this.state.createInput);
			
		await this.updateItems();
		
	}

	private async updateItems()
	{
		const items : any[] = await this.state.list.getItems();
		const views : IViewField[] = await this.state.list.getDefaultViewFields(["Title"]);

		this.setState({items:items,views:views});
	}

	private searchItems()
	{
		this.state.list.getItemsByFunction((item : any) => item.Title.indexOf(this.state.searchInput) > -1).then(
			(items : any[]) => console.debug("Partial matches: ", items)
		);

		this.state.list.getItemsByValues({Title:this.state.searchInput}).then(
			(items : any[]) => console.debug("Exact matches: ", items)
		);
	}
}
