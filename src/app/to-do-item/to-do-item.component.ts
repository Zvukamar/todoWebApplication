import { EditItemComponent } from './../edit-item/edit-item.component';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { PushService } from '../push/push.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { Item } from '../item';
import { LogRegService } from './../log-reg.service';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

   @Input() item;
   modalRef: BsModalRef;
   constructor(private push: PushService,
               private router: Router,
               private route: ActivatedRoute,
               private modalService: BsModalService,
               private logReg: LogRegService) { }

   ngOnInit() {
   }

   del(item) {
     this.modalRef.hide();
     this.push.delete(item);
   }

   edit(item: Item) {
     item.isEditable = true;
   }

   public openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
   }

   cancel(item) {
     item.isEditable = false;
   }

   save(form, exItem) {
    const item = new Item({
      userUID: this.logReg.userUID,
      msg: form.value.msg,
      date: form.value.date,
      time: form.value.time
    });
    this.push.delete(exItem);
    this.push.add(item);
   }
}