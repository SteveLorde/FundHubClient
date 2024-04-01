import {Project} from "../Data/Models/Project";
import {signal} from "@angular/core";

export let selectedproject : Project

export function setSelectedProject(project : Project) {
  selectedproject = project
}
