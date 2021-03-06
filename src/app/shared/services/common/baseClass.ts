import { Injectable, Injector, OnInit } from '@angular/core';
import Utils from './utils';
import { GlobalVariables } from './globalVariables';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Injectable()
export class BaseClass implements OnInit {

  private basePage: any;
  public pageLoaded = false;
  private globalVariablesForBaseClass: GlobalVariables;
  private routerForBaseClass: Router;

  constructor(public injector: Injector) {
    this.globalVariablesForBaseClass = injector.get(GlobalVariables);
    this.routerForBaseClass = injector.get(Router);
    this.pageLoaded = false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  setPage(page) {
    this.basePage = page;
  }

  isValidInput(input) {
    return Utils.isValidInput(input);
  }

  goToPage(pageName) {
    this.routerForBaseClass.navigateByUrl(pageName);
  }

  // to validate either formArray, formControl, FormGroup.
  getErrorMessage(formGroup, validation_messages, validation_item): string {
    let message = '';
    const keys = Object.keys(formGroup.controls);
    const index = keys.indexOf(validation_item);
    if (index !== -1) {
      const control = formGroup.get(keys[index]);
      if (control instanceof FormControl) {
        message = this.getControlErrorMessage(control, validation_messages, validation_item);
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        const control = formGroup.get(keys[i]);
        if (control instanceof FormGroup) {
          this.getErrorMessage(control, validation_messages, validation_item);
        } else if (control instanceof FormArray) {
          message = this.validateFormArray(control, validation_messages, validation_item);
          break;
        }
      }
    }
    return message;
  }
  // to validate form array
  private validateFormArray(formControl: FormArray, validation_messages, validation_item) {
    let message = '';
    for (let i = 0; i < formControl.controls.length; i++) {
      message = this.getErrorMessage(formControl['controls'][i], validation_messages, validation_item);
      if (message !== '') {
        break;
      }
    }
    return message;
  }

  // returns the error particular message configured in form.
  private getControlErrorMessage(control, validation_messages?: any, validation_item?: any) {
    for (let i = 0; i < validation_messages[validation_item].length; i++) {
      if (control.hasError(validation_messages[validation_item][i].type)) {
        return validation_messages[validation_item][i].message;
      }
    }
  }


  findInvalidControls(formObject) {
    const invalid = [];
    const controls = formObject.controls;
    for (const name in controls) {
      if (controls[name].invalid || controls[name].hasError('notValid')) {
        invalid.push(name);
      }
    }
    Utils.log('Invalid Controls: ' + Utils.stringify(invalid));
  }
}
