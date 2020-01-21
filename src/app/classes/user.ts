export class User {
    user_id: string
    name?: string;
    email: string;
    profile_image?: string
    eslam?: string;
    phone?: string;
    category?: string;
    departments?: [string];
    emailVerified?: boolean;
    avg_rating?: number;
    marital_status?: string;
    cv_ready?: boolean;
    profile_ready?: boolean;

    // constructor({ firstName, lastName, photoUrl }) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.photoUrl = photoUrl;
    // }
}
