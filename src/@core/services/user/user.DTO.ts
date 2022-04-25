import { BASE_ENTITY } from "src/@core/constant";

export class UserRequestPagination extends BASE_ENTITY {

}

export class UserRequest {
    constructor(form: any) {
        if (!form) return;
        this.email = form.email;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
    }
    email!: string;
    firstName!: string;
    lastName!: string;
}