import {User} from "./User";
import {SocialMedia} from "./SocialMedia";
import {Category} from "./Category";
import {Donation} from "./Donation";

export interface Project {
  id : string
  title : string
  subtitle :string
  description :string
  category : Category
  currentfund : number
  totalfundrequired : number
  email : string
  imagesnames : string[]
  imagestoupload? : File[]
  userId : string
  user : User
  donations : Donation[]
}
