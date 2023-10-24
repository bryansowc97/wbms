import { IUser } from "../cognito.service";
import { FacilitySeat, NFacilitySeat } from "../workspace/workspace.model";

export interface BookingDtlDTO extends Booking{
    facilityDTO: NFacilitySeat;
    userDTO: IUser;
    employeeName: any;
}


export interface Booking{
    id:any;
    employeeId: any; //username
    rescId: any;
    dteStart: string;
    dteEnd : string;
    status: any;
}