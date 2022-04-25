import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/app.reducer'
@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(
    private readonly _store: Store<fromRoot.State>
  ) { }
  hasSpinner: any;
  ngOnInit(): void {
    this.checkHasSpinner();
  }

  checkHasSpinner() {
    this._store.select(fromRoot.getSpinnerArray).subscribe(response => {
      this.hasSpinner = response;
    })
  }


}
