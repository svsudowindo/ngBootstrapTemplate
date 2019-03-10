import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export interface IDataInfo {
  templateEnum: string;
  // any other data if needed
}
@Injectable({
  providedIn: 'root'
})
export class PopupInfoService {

  data: IDataInfo;
  modalRef: NgbModalRef;
  constructor() { }
}
