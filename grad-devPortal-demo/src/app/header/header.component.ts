import { Component, OnInit } from '@angular/core';
import { UserTypeService } from '../services/user-type/user-type.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private userTypeService: UserTypeService) {}

  ngOnInit(): void {
    this.userType = this.userTypeService.dataEmitter.getValue();
  }
  userType: string;
}
