import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/@core';
import { UserRequest } from 'src/@core/services/user/user.DTO';
import { NotificationController } from 'src/@shared';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    private _userService: UserService,
    private _toast: NotificationController,
    @Inject(MAT_DIALOG_DATA) public idUser: string
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.idUser && this.getUserBy(this.idUser);
  }

  initForm() {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  getUserBy(id: string) {
    this._userService.getBy(id).subscribe(response => {
      this.userForm.patchValue({ ...response });
    })
  }

  confirm() {
    if (this.userForm.invalid) return;
    this.idUser ? this.edit() : this.create();
  }

  edit() {
    let request = new UserRequest(this.userForm?.value);
    let idUser = this.idUser;
    this._userService.edit(request, idUser).subscribe(_ => {
      this._toast.openSuccess('Update user successfully!');
      this.closeDialog(true);
    })
  }

  create() {
    let request = new UserRequest(this.userForm.value);
    this._userService.create(request).subscribe(_ => {
      this._toast.openSuccess('Create user successfully!');
      this.closeDialog(true);
    })
  }

  closeDialog(isSave: boolean) {
    return this._dialogRef.close(isSave);
  }

  public get checkForm() {
    return Object.keys(this.userForm?.controls).reduce((object: any, key) => {
      const formControl: any = this.userForm?.get(key);
      object[key] = formControl?.errors && (formControl?.dirty || formControl?.touched);
      return object;
    }, {});
  }

}
