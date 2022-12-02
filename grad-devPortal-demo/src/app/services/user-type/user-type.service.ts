import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  // dataEmitter = new EventEmitter<string>();
  // dataEmitter = new Subject<string>();
  dataEmitter = new BehaviorSubject('');

  userType: string;
  type: string;

  constructor() {}

  raiseEventEmiiter(data: string) {
    this.dataEmitter.next(data);
  }
}
