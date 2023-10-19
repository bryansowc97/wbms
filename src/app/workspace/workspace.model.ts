export interface FacilityBooking extends FacilitySeat{
    emp_id:any;
    date: any;
    timeSlot : any;
}

export interface FacilitySeat{
    
    gp : any;
    sub_gp : any;
    pos: any;
    rotation: any;
    name : any;
    status: any;
}
