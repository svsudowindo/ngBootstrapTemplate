import { NgModule } from '@angular/core';

// Custom Directives
import { TrimOnBlurDirective } from '../../directives/ng-trim.directive';
import { InputTrimModule } from 'ng2-trim-directive';
import { ResponseMessageComponent } from '../../components/response-message/response-message.component';
import { CommonModule } from '@angular/common';
import { PopupModule } from '../../components/componentsAsService/popup/popup.module';

@NgModule({
  declarations: [
    TrimOnBlurDirective,
    ResponseMessageComponent
  ],
  imports: [
    CommonModule,
    InputTrimModule,
    PopupModule
  ],
  exports: [
    TrimOnBlurDirective,
    InputTrimModule,
    PopupModule,
    ResponseMessageComponent
  ]
})
export class CustomModule { }
