import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectviewerComponent } from './projectviewer.component';

describe('ProjectviewerComponent', () => {
  let component: ProjectviewerComponent;
  let fixture: ComponentFixture<ProjectviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectviewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
