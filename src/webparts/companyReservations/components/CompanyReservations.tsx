import * as React from 'react';
import styles from './CompanyReservations.module.scss';
import { ICompanyReservationsProps } from './ICompanyReservationsProps';
//import { escape } from '@microsoft/sp-lodash-subset';

import { SharepointService } from "../services/Sharepoint/SharepointService";
import { List } from '../services/Sharepoint/List';
import { ICompanyReservationsState } from './ICompanyReservationsState';

import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

export default class CompanyReservations extends React.Component<ICompanyReservationsProps, ICompanyReservationsState> {

	constructor(props: ICompanyReservationsProps)
	{
		super(props);

		this.state = {
			textInput:""
		}
	}

	public componentDidMount(): void {


		SharepointService.init();
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
							<TextField onChange={(event,value) => this.setState({textInput:value}) } label="Search query:" />
							<PrimaryButton text="Primary" onClick={() => this.onButtonClick()} allowDisabledFocus />	
						</div>
					</div>
				</div>
			</div>
		);
	}


	private onButtonClick()
	{
		const list : List = SharepointService.getListByName("Cool List");

		list.getItemsByFunction((item : any) => item.Title.indexOf(this.state.textInput) > -1).then(
			(items : any[]) => console.debug("Partial matches: ", items)
		);

		list.getItemsByValues({Title:this.state.textInput}).then(
			(items : any[]) => console.debug("Exact matches: ", items)
		);
	}
}
