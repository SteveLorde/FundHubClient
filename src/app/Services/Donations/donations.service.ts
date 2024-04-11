import { Injectable } from '@angular/core';
import {Donation} from "../../Data/Models/Donation";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  donateOperationStatus = new BehaviorSubject(false)
  currentDonationOperationStatus = this.donateOperationStatus.asObservable()

  constructor(private http : HttpClient) { }

  SubmitDonation(donationRequest : Donation) {
    return this.http.post<boolean>(environment.backendurl + "donations/donate",donationRequest).pipe(
      map( (result: boolean) => {
        this.donateOperationStatus.next(true)
      })
    )
  }

  GetDonations() {
    return this.http.get<Donation[]>(environment.backendurl + "donations/getdonations")
  }

  DecideDonation(donationId : string, decision : boolean) {
    return this.http.post<boolean>(environment + "donations/decidedonation", {donationId : donationId, decision: decision})
  }


}
