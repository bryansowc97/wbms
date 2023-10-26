import { IUser } from "../cognito.service";
import { FacilitySeat, NFacilitySeat } from "../workspace/workspace.model";

export interface BookingDtlDTO extends Booking{
    facilityDTO: NFacilitySeat;
    userDTO: IUser;
    employeeName: any;
    date : Date;
    timeSlot: string;
}


export interface Booking{
    id:any;
    employeeId: any; //username
    rescId: any;
    dteStart: any;
    dteEnd : any;
    status: any;
}