import {Project} from "./Project";
import {User} from "./User";

export interface Donation {
  id : string | number
  userid : string | number
  user : User
  projectid : string | number
  project : Project
  paymenttype : string
  donationamount : number
  status : boolean
}
