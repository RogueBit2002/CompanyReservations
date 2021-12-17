import { IDropdownOption } from "office-ui-fabric-react";
import { CompanyReservations } from "../../../../../companyReservations/CompanyReservations";
import { Workspace } from "../../../../../companyReservations/Workspace";

export interface IWorkSpacesState
{
    firstDate: Date
    currentDate: Date
    workspaceId: number
    startTime: string
    endTime: string
    workspacereservations: any[]
    dropdownopt: any[]
}