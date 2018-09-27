import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import {HashLocationStrategy,LocationStrategy} from '@angular/common'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { LoginComponent } from './login/login.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DdEntryComponent } from './dd-entry/dd-entry.component';
import { DdVerificationComponent } from './dd-verification/dd-verification.component';
// import { CentercompComponent } from './centercomp/centercomp.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DdIdEntryComponent } from '../app/dd-id-entry/dd-id-entry.component';
import { BankComponent } from './bank/bank.component';
import { MatMenuModule } from '@angular/material/menu';
import { DespatchNoEntryComponent } from './despatch-no-entry/despatch-no-entry.component';
import { DbaNoEntryComponent } from './dba-no-entry/dba-no-entry.component';
import { PendingDdComponent } from './pending-dd/pending-dd.component';
import { HttpClientModule } from '@angular/common/http';
import { RollnoEntryComponent } from './rollno-entry/rollno-entry.component';
import { DdIdVerificationComponent } from './dd-id-verification/dd-id-verification.component';
import { DdentryDetailsComponent } from './ddentry-details/ddentry-details.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProspectusComponent } from './prospectus/prospectus.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorComponent } from './error/error.component';
import { ProspectusDetailsComponent } from './prospectus-details/prospectus-details.component';
import { DespatchnoListComponent } from './despatchno-list/despatchno-list.component';
import { DdentryProsDetailsComponent } from './ddentry-pros-details/ddentry-pros-details.component';
import { DdentryappComponent } from './ddentryapp/ddentryapp.component';
import { DespStudListComponent } from './desp-stud-list/desp-stud-list.component';
import { DbaDetailsComponent } from './dba-details/dba-details.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdjEntryComponent } from './adj-entry/adj-entry.component';
import { AdjverificationComponent } from './adjverification/adjverification.component';
import { AdjentryDetailsComponent } from './adjentry-details/adjentry-details.component';
import { AdjdespatchComponent } from './adjdespatch/adjdespatch.component';
import { AdjDespstudlistComponent } from './adj-despstudlist/adj-despstudlist.component';
import { AdjdbaNoEntryComponent } from './adjdba-no-entry/adjdba-no-entry.component';
import { AdjdbaDetailsComponent } from './adjdba-details/adjdba-details.component';
import { AdjpendingddComponent } from './adjpendingdd/adjpendingdd.component';
import { ErpdespatchEntryComponent } from './erpdespatch-entry/erpdespatch-entry.component';
import { ErpdespdetailsComponent } from './erpdespdetails/erpdespdetails.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dd-entry', component: DdEntryComponent },
  { path: 'dd-entry/:ddlastId', component: DdEntryComponent },
  { path: 'dd-verification', component: DdVerificationComponent },
  // { path:'center',component:CentercompComponent},
  { path: 'dd-id-entry', component: DdIdEntryComponent },
  { path: 'addbank', component: BankComponent },
  { path: 'despatch-no-entry', component: DespatchNoEntryComponent },
  { path: 'dba-no-entry', component: DbaNoEntryComponent },
  { path: 'rollno-entry', component: RollnoEntryComponent },
  { path: 'pending-dd', component: PendingDdComponent },
  { path: 'dd-id-verification', component: DdIdVerificationComponent },
  { path: 'ddentry-details', component: DdentryDetailsComponent },
  { path: 'ddentry-details/:ddlastId', component: DdentryDetailsComponent },
  { path: 'prospectus', component: ProspectusComponent },
  { path: 'prospectus/:ddlastId', component: ProspectusComponent },
  { path: 'ddentry-app', component: DdentryappComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'despatchno-list', component: DespatchnoListComponent },
  { path: 'ddentrypros-details/:ddlastId', component: DdentryProsDetailsComponent },
  { path: 'despstudlist', component: DespStudListComponent },
  { path: 'dba-details', component: DbaDetailsComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'adjustment',component:AdjEntryComponent  },
  { path: 'adjustment/:adjddlastId',component:AdjEntryComponent  },  
  { path:'adjverification',component:AdjverificationComponent},
  { path:'adjdetails',component:AdjentryDetailsComponent},
  { path:'adjdetails/:adjddlastId',component:AdjentryDetailsComponent},
  { path:'adjdespatch-no-entry',component:AdjdespatchComponent},
  {path :'adjdespstudlist',component:AdjDespstudlistComponent},
  { path: 'adjdba-no-entry',component:AdjdbaNoEntryComponent},
  {path:'adjdba-details',component:AdjdbaDetailsComponent},
  {path:'adjpending-dd',component:AdjpendingddComponent},
  {path:'erp-despatch-entry',component:ErpdespatchEntryComponent },
  {path:'erpdesp-details',component:ErpdespdetailsComponent},
  {path:'erpdesp-details/:erpdespId',component:ErpdespdetailsComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DdEntryComponent,
    DdVerificationComponent,

    // CentercompComponent,
    DdIdEntryComponent,
    BankComponent,
    DespatchNoEntryComponent,
    DbaNoEntryComponent,
    PendingDdComponent,
    RollnoEntryComponent,
    DdIdVerificationComponent,
    DdentryDetailsComponent,
    ProspectusComponent,
    ErrorComponent,
    ProspectusDetailsComponent,
    DespatchnoListComponent,
    DdentryProsDetailsComponent,
    DdentryappComponent,
    DespStudListComponent,
    DbaDetailsComponent,
    InvoiceComponent,
    AdjEntryComponent,
    AdjverificationComponent,
    AdjentryDetailsComponent,
    AdjdespatchComponent,
    AdjDespstudlistComponent,
    AdjdbaNoEntryComponent,
    AdjdbaDetailsComponent,
    AdjpendingddComponent,
    ErpdespatchEntryComponent,
    ErpdespdetailsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // other imports here

    MatButtonModule, MatCheckboxModule, MatMenuModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
