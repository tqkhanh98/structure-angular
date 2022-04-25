import { User } from "./user";

export interface Post {
    id: string;
    image: string;
    likes: number;
    publishDate: string | Date;
    tags: string[];
    text: string;
    owner: User;
}