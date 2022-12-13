import { Component, OnInit } from '@angular/core';
import { UserTypeService } from '../services/user-type/user-type.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class HomeDashboardComponent implements OnInit {
  constructor(private userTypeService: UserTypeService) {}
  userType: string;

  ngOnInit(): void {
    this.userType = this.userTypeService.dataEmitter.getValue();
  }
}
