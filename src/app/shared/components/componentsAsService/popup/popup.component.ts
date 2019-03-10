import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupInfoService } from './popup-info.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private _popupInfoService: PopupInfoService) {
    console.log(this._popupInfoService.data);
  }

  ngOnInit() {
  }

  submit() {
    this.activeModal.close('from submit');
  }
}
