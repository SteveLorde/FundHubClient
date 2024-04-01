import {Project} from "./Project";
import {Donation} from "./Donation";

export interface User {
    id : string
    username : string
    password : string
    usertype : string
    description : string
    phonenumber : string
    email : string
    facebook : string
    x_socialmedia : string
    instagram : string
    project : Project
    donations: Donation[]
    profileimage : string


}
