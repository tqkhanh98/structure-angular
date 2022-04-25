import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class NotificationController {
    configSuccess: MatSnackBarConfig = {
        duration: 3000,
        panelClass: 'custom-snack-bar-success',
        data: null,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    }
    configError: MatSnackBarConfig = {
        duration: 30000,
        panelClass: 'custom-snack-bar-error',
        data: null,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    }
    constructor(private _snackBar: MatSnackBar) { }

    async openSuccess(message: string, action?: string) {
        await this._snackBar.open(message, action, this.configSuccess);
    }

    async openError(message: string, action?: string) {
        await this._snackBar.open(message, action, this.configError);
    }
}