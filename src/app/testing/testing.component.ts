import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
interface Base { name: string, value: number }
interface Brand extends Base { }
interface Color extends Base { }


enum COLORS {
  BLUE = 1,
  RED = 2,
  YELLOW = 3
}
enum BRANDS {
  TOYOTA = 1,
  AUDI = 2,
  HONDA = 3
}
const InitValueCost = 100
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  brands: Brand[] = [{
    name: 'Toyota',
    value: BRANDS.TOYOTA
  },
  {
    name: 'Audi',
    value: BRANDS.AUDI
  },
  {
    name: 'Honda',
    value: BRANDS.HONDA
  }];
  colors: Color[] = [
    {
      name: 'Blue',
      value: COLORS.BLUE
    },
    {
      name: 'Red',
      value: COLORS.RED
    },
    {
      name: 'Yellow',
      value: COLORS.YELLOW
    },
  ];
  form: FormGroup;
  totalCost: number = 0;
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      brand: ['', Validators.required],
      color: ['', Validators.required]
    });
    this.listenForm();
  }

  listenForm() {
    this.form.valueChanges.pipe(debounceTime(500), switchMap(value => { return of(value) })).subscribe(val => {
      // this.classifyBrand(val.brand, val.color);

      let factoryCar = new FactoryCar();
      this.totalCost = factoryCar.classifyCar(val.brand, val.color);

    })
  }

  // classifyBrand(brand: BRANDS, color: COLORS) {
  //   switch (brand) {
  //     case (BRANDS.TOYOTA):
  //       return this.caculateCostToyota(color);
  //     case (BRANDS.AUDI):
  //       return this.caculateCostAudi(color);
  //     case (BRANDS.HONDA):
  //       return this.caculateCostHonda(color);
  //   }
  // }

  // caculateCostToyota(color: COLORS) {
  //   switch (color) {
  //     case COLORS.BLUE:
  //       return this.drawValue(InitValueCost * (1 - 0.1 / 100))
  //     case COLORS.RED:
  //       return this.drawValue(InitValueCost * (1 - 0.5 / 100))
  //     case COLORS.YELLOW:
  //       return this.drawValue(InitValueCost * (1 - 0.9 / 100))
  //   }
  // }
  // caculateCostAudi(color: COLORS) {
  //   switch (color) {
  //     case COLORS.BLUE:
  //       return this.drawValue(InitValueCost * (1 - 0.2 / 100))
  //     case COLORS.RED:
  //       return this.drawValue(InitValueCost * (1 - 0.7 / 100))
  //     case COLORS.YELLOW:
  //       return this.drawValue(InitValueCost * (1 - 1 / 100))
  //   }
  // }
  // caculateCostHonda(color: COLORS) {
  //   switch (color) {
  //     case COLORS.BLUE:
  //       return this.drawValue(InitValueCost * (1 - 0.3 / 100))
  //     case COLORS.RED:
  //       return this.drawValue(InitValueCost * (1 - 0.8 / 100))
  //     case COLORS.YELLOW:
  //       return this.drawValue(InitValueCost * (1 - 2.3 / 100))
  //   }
  // }

  drawValue(value: number) {
    return this.totalCost = value;
  }

}

class Car {
  public getPrice(color: number) { };
}
class Toyota extends Car {
  constructor() { super(); }

  override getPrice(color: number) {
    switch (color) {
      case COLORS.BLUE:
        return 100 * (1 - 0.1 / 100);
      case COLORS.RED:
        return 100 * (1 - 0.5 / 100);
      case COLORS.YELLOW:
        return 100 * (1 - 0.9 / 100);
      default: 0;
    }
  }
}
class Audi extends Car {
  constructor() { super(); }

  override getPrice(color: number) {
    switch (color) {
      case COLORS.BLUE:
        return 100 * (1 - 0.2 / 100);
      case COLORS.RED:
        return 100 * (1 - 0.7 / 100);
      case COLORS.YELLOW:
        return 100 * (1 - 1 / 100);
    }
  }
}
class Honda extends Car {
  constructor() { super(); }

  override getPrice(color: number) {
    switch (color) {
      case COLORS.BLUE:
        return 100 * (1 - 0.3 / 100);
      case COLORS.RED:
        return 100 * (1 - 0.8 / 100);
      case COLORS.YELLOW:
        return 100 * (1 - 2.3 / 100);
    }
  }
}

class FactoryCar {
  classifyCar(carType: BRANDS, color: COLORS): any {
    switch (carType) {
      case BRANDS.TOYOTA: {
        let toy = new Toyota();
        return toy.getPrice(color)
      }
      case BRANDS.AUDI: {
        let audi = new Audi();
        return audi.getPrice(color)
      }
      case BRANDS.HONDA: {
        let honda = new Honda();
        return honda.getPrice(color)
      }
    }
  }
}