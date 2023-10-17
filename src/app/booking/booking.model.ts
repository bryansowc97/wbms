import { FacilitySeat } from "../workspace/workspace.model";

export interface Booking extends FacilitySeat{
    emp_id: any;
    employee_name: any;
    date: any;
    timeSlot : any;
    bookedStatus: any;
}