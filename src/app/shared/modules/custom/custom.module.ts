import { NgModule } from '@angular/core';

// Custom Directives
import { TrimOnBlurDirective } from '../../directives/ng-trim.directive';
import { InputTrimModule } from 'ng2-trim-directive';
import { ResponseMessageComponent } from '../../components/response-message/response-message.component';
import { CommonModule } from '@angular/common';
import { PopupModule } from '../../components/componentsAsService/popup/popup.module';
import { LoaderModule } from '../../components/componentsAsService/loader/loader.module';

@NgModule({
  declarations: [
    TrimOnBlurDirective,
    ResponseMessageComponent
  ],
  imports: [
    CommonModule,
    InputTrimModule,
    PopupModule,
    LoaderModule
  ],
  exports: [
    TrimOnBlurDirective,
    InputTrimModule,
    PopupModule,
    ResponseMessageComponent
  ]
})
export class CustomModule { }
