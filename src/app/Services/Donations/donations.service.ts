import { Injectable } from '@angular/core';
import {Donation} from "../../Data/Models/Donation";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(private http : HttpClient) { }

  SubmitDonation(donationRequest : Donation) {
    return this.http.post<boolean>(environment.backendurl + "Donations/donate",donationRequest)
  }


}
