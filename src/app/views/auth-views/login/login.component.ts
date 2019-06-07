import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseClass } from './../../../shared/services/common/baseClass';
import { RequestEnums } from '../../../shared/constants/request-enums';
import Utils from './../../../shared/services/common/utils';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { PopupService } from '../../../shared/components/componentsAsService/popup/popup.service';
import { POPUP } from '../../../shared/constants/popup-enum';
import { IDataInfo } from '../../../shared/components/componentsAsService/popup/popup-info.service';
import { LoaderService } from '../../../shared/components/componentsAsService/loader/loader.service';
import { GlobalVariables } from '../../../shared/services/common/globalVariables';
import { GlobalVariableEnums } from '../../../shared/constants/gloabal-variable-enums';
import 'jspdf-autotable';
import * as jspdf from 'jspdf';
declare var jsPDF: any;
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseClass implements OnInit {

  info = [
    {
      name: 'sai',
      number: 81251
    },
    {
      name: 'sample',
      number: 81252
    },
    {
      name: 'sample3',
      number: 81253
    },
    {
      name: 'sample4',
      number: 81254
    },
  ];

  @ViewChild('contentToConvert', { static: true }) contentToConvert: ElementRef;
  public successMessageStatus: string;
  public errorMessageStatus: string;

  // once successfull login make can activate service to true
  constructor(public route: Router,
    public injector: Injector,
    private _commonRequest: CommonRequestService,
    private _globalVariables: GlobalVariables,
    private _popService: PopupService,
    private _loaderService: LoaderService) {
    super(injector);
  }

  ngOnInit() {
    Utils.log('hello from login component by utils method');
  }

  // getDetails
  getDetails() {
    this.successMessageStatus = '';
    this.errorMessageStatus = '';

    // this._globalVariables.setParameterData(GlobalVariableEnums.TOKEN, 'abc');
    RequestEnums.LOGIN.values.push(1);
    this._commonRequest.request(RequestEnums.LOGIN).subscribe((res) => {
      console.log(res);
      this.successMessageStatus = 'Success';
    },
      ((err) => {
        this.errorMessageStatus = err;
      }));
  }

  openModal() {
    const obj: IDataInfo = {
      type: POPUP.ERROR,
      title: 'SUCCESS',
      message: 'You have successfully Logged In',
      okButtonLabel: 'OK'
    };
    this._popService.openModal(obj).then(res => {
      console.log(res);
    }, (reason) => {
      console.log(reason);
    });
  }
  openLoader() {
    this._loaderService.showLoading();
  }

  downloadTableAsPdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#contentToConvert' });
    doc.save('table.pdf');
  }
  downloadPdfAsImage() {
    // image download
    const data = this.contentToConvert.nativeElement;
    // const clientWidth = data.clientWidth;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      console.log(canvas);
      const imgWidth = 200;
      const pageHeight = 100;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }


}
