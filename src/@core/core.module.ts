import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthenticationService, PostService, UserService } from "./services";
const services = [
    AuthenticationService,
    PostService,
    UserService
]
@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: services
})
export class CoreModule { }