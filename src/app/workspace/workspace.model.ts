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


export interface NFacilityBooking extends NFacilitySeat{
    emp_id:any;
    date: any;
    timeSlot : any;
}

export interface NFacilitySeat{
    id : any
    gp : any;
    subGp : any;
    posGrid: any;
    posRotation: any;
    name : any;
    status: any;
}
