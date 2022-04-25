import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthenticationService } from "./services";
const services = [AuthenticationService]
@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: services
})
export class CoreModule { }