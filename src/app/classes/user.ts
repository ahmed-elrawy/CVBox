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
