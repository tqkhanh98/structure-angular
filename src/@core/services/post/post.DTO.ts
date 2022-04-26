import { BASE_ENTITY } from "src/@core/constant";
import { User } from "src/@core/models";

export class PostPaginationRequest extends BASE_ENTITY {

}

export class PostDTORequest {
    image!: string;
    likes!: number;
    owne!: User;
    publishDate!: string | Date;
    tags!: string[];
    text!: string;
}