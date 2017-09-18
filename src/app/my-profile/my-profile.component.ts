import { FirebaseListObservable } from 'angularfire2/database';
import { element } from 'protractor';
import { ToDoListComponent } from './../to-do-list/to-do-list.component';
import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { UsersService } from './../users/users.service';
import { LogRegService } from './../log-reg.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {
  form: FormGroup;
// public items: FirebaseListObservable<any[]>;
  private _user;
  @ViewChild('firstName') firstInput: ElementRef;
  @ViewChild('lastName') lastInput: ElementRef;
 // @ViewChild('email') emailInput: ElementRef;

  constructor( private list: ToDoListComponent, private userServ: UsersService,  private logreg: LogRegService, 
    private users: UsersService ) {
     this.userServ.getUserData(this.logreg.userUID);
    this._user = list.user;
    this.userServ.userData.subscribe(user => {
      this._user = user;
       this.firstInput.nativeElement.value = this._user.firstName;
       this.lastInput.nativeElement.value = this._user.lastName;
     //  this.emailInput.nativeElement.value = this._user.email;
      });
      this.form = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
       // email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\(.[A-Za-z]{1,63}$)+')]),
      });
  }

  ngOnInit() {
    // console.log(this.user.firstName);
   // this.firstInput.nativeElement.value = this._user.firstName;

  }
  update() {
    this._user.firstName = this.form.controls['firstName'].value;
    this._user.lastName = this.form.controls['lastName'].value;
    // this._user.email = this.form.controls['email'].value;
    this.users.setUserData(this._user, this.logreg.userUID);
  }
  checkValid(name) {
    return (this.form.controls[name].invalid && this.form.controls[name].touched);
  }
}
