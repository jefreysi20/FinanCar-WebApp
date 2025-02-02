import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DataComponent } from './data.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserToolbarComponent} from "../user-toolbar/user-toolbar.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {BehaviorSubject, of} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Component} from "@angular/core";
import {DataService} from "../../services/data.service";
// Creamos un stub para ActivatedRoute
@Component({
  selector: 'app-user-toolbar',
  template: ''
})
class UserToolbarStubComponent {}
class ActivatedRouteStub {
  private subject = new BehaviorSubject({}); // Inicializamos con un objeto vacío
  params = this.subject.asObservable();

  // Setter para actualizar los parámetros
  setParams(params: any) {
    this.subject.next(params);
  }
}

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let activatedRoute: ActivatedRouteStub;
  let router: Router;

  beforeEach(async () => {
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['getNumeroCuotas']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, MatPaginatorModule, MatIconModule,
        MatTableModule, RouterModule,
        BrowserModule,
        BrowserAnimationsModule ],
      declarations: [DataComponent,UserToolbarStubComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterTestingModule }
      ]
    }).compileComponents();
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute) as any;
    router = TestBed.inject(Router);

    spyOn(component['authService'], 'getUser').and.returnValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      repassword: 'password123',
      user_id: 1
    });

    // Simulamos el número de cuotas permitidas
    spyOn(component['dataService'], 'getNumeroCuotas').and.returnValue(of(5));

    // Inicializamos el componente
    fixture.detectChanges();
  });

});
