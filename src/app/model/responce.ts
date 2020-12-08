export class Responce{
    constructor( 
       public is_success: boolean,
       public data:{
        expiry: Date,
        force_mfa:boolean,
        full_name: null,
        is_borrower: boolean,
        is_email_verified: boolean,
        is_mfa_enabled: boolean,
        is_mobile_number_verified: boolean,
        is_staff: boolean,
        token: String,
        user_type: String,
       }
    ){}
}
export class Movie{
    constructor(
        public title:String,
        public  genres:String,
        public description:String,
        public uuid:String
    ){}
}