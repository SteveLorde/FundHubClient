import { Component } from '@angular/core';
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    FundRequestFormComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  public projectrequestformvisible : boolean = true

  constructor() {
  }

}
