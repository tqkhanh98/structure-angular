export interface User {
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    location: Location;
    phone: string;
}

export interface Location {
    city: string;
    country: string;
    state: string;
    street: string;
    timezone: string;

}