import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CompanyReservationsClientWebPartStrings';
import CompanyReservationsClient from './components/CompanyReservationsClient';
import { ICompanyReservationsClientProps } from './components/ICompanyReservationsClientProps';
import { SharepointService } from '../../services/Sharepoint/SharepointService';
import { CompanyReservations } from '../../companyReservations/CompanyReservations';
import { Reservation } from '../../companyReservations/Reservation';
import { User } from '../../services/Sharepoint/User';

export interface ICompanyReservationsClientWebPartProps {
  description: string;
}

export default class CompanyReservationsClientWebPart extends BaseClientSideWebPart<ICompanyReservationsClientWebPartProps> {


  public async onInit() : Promise<void>
  {
	return super.onInit().then(_ => {
		SharepointService.init(this.context);
		CompanyReservations.init();



		async function f()
		{
			const user : User = await User.getCurrent();


			const start : Date = new Date();
			const end : Date = new Date(start.getTime() + 1000);

			const workspaceId : number = 1;
			await Reservation.create(workspaceId,user,start,end);
		}

		//f();
		
	});
  }
  public render(): void {
    const element: React.ReactElement<ICompanyReservationsClientProps> = React.createElement(
      CompanyReservationsClient,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
