import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMoviesComponent } from './nav-movies.component';

describe('NavMoviesComponent', () => {
  let component: NavMoviesComponent;
  let fixture: ComponentFixture<NavMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
