import { IUser } from "../cognito.service";
import { FacilitySeat, NFacilitySeat } from "../workspace/workspace.model";

export interface BookingDtlDTO extends Booking{
    facilityDTO: NFacilitySeat[];
    userDTO: IUser;
}


export interface Booking{
    id:any;
    employeeId: any;
    rescId: any;
    dteStart: any;
    dteEnd : any;
    status: any;
}