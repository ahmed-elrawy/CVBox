export class User {
    user_id: string
    emailVerified?: boolean;
    name?: string;
    email: string;
    profile_image?: string;
    user_type?: string;
    eslam?: string;
    phone?: string;
    category?: string;
    departments?: [string];
    marital_status?: string;
    military_status?: string;
    rate?: number
    avg_rating?: number;
    views?: number;
    cv_ready?: boolean;
    profile_ready?: boolean;
    // constructor({ firstName, lastName, photoUrl }) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.photoUrl = photoUrl;
    // }
}

// export class User {
//     age?: number;
//     avg_rating?: number;
//     category?: string;
//     city?: string;
//     created_at?: Date;
//     cv_ready?: boolean;
//     departments?: [string];
//     email: string;
//     eslam?: string;
//     gender?: string;
//     job_title?: string;
//     marital_status?: string;
//     military_status?: string;
//     name?: string;
//     phone?: number;
//     profile_image?: string;
//     profile_ready?: boolean;
//     state?: string;
//     views?: number;
//     year_experience?: number;
//     emailVerified?: boolean;
//     user_type?: string;
//     rate?: number;

// }
