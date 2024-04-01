import { Pipe, PipeTransform } from '@angular/core';
import {Project} from "../../Data/Models/Project";

@Pipe({
  name: 'projectsViewCategoryFilter',
  standalone: true
})
export class ProjectsViewCategoryFilterPipe implements PipeTransform {

  transform(items: Project[], selectedcategoryid: string ) {
    if (!items || !selectedcategoryid || selectedcategoryid == "" || '') {
      return items
    }
    else {
      return items.filter(item => item.category.id === selectedcategoryid)
    }
  }
}


