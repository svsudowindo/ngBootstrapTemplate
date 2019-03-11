import { Injectable, Injector, OnInit } from '@angular/core';
import Utils from './utils';
import { GlobalVariables } from './globalVariables';
import { Router } from '@angular/router';

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

  getErrorMessage(formObject, validation_messages, validation_item): string {
    for (let i = 0; i < validation_messages[validation_item].length; i++) {
      if (formObject.get(validation_item).hasError(validation_messages[validation_item][i].type)) {
        return validation_messages[validation_item][i].message;
      }
    }
    return '';
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