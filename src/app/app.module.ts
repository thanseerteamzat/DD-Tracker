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

import { TimepickerModule } from 'ngx-bootstrap';


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
import { InvoiceComponent } from './Invoicee/Invoice Generation/invoice.component';
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
import { DbaDespListComponent } from './dba-desp-list/dba-desp-list.component';
import { InvoiceEntryComponent } from './Invoicee/invoice-entry/invoice-entry.component';
import { RoundPipe } from './round.pipe';
import { ToWordPipe } from './to-word.pipe';
import { InvoiceentryverificationComponent } from './Invoicee/invoiceentryverification/invoiceentryverification.component';
import { DdkkcComponent } from './ddkkc/ddkkc.component';
import { InvoiceReportComponent } from './Invoicee/invoice-report/invoice-report.component';
import { InvoiceManualComponent } from './Invoicee/invoice-manual/invoice-manual.component';
// import { KkcverificationComponent } from '.KKC/kkcverification/kkcverification.component';
import { InvoiceEntryDetailsComponent } from './invoice-entry-details/invoice-entry-details.component';
import { DdDespatchAckComponent } from './Acknowledgement/dd-despatch-ack/dd-despatch-ack.component';
import { KkcSroEntryComponent } from './kkc-sro-entry/kkc-sro-entry.component';
import { DespatchAckDetailsComponent } from './Acknowledgement/despatch-ack-details/despatch-ack-details.component';
import { SrodailyreportComponent } from './srodailyreport/srodailyreport.component';
import { GroupByPipe } from './group-by.pipe';
import { SumPipe } from './sum.pipe';
import { UniquePipe } from './unique.pipe';
import { KcvtpCenterInvoiceDetailsComponent } from './Invoicee/kcvtp-center-invoice-details/kcvtp-center-invoice-details.component';
import { InvoiceAmountPendingComponent } from './Invoicee/invoice-amount-pending/invoice-amount-pending.component';
import { SrohoverificationComponent } from './srohoverification/srohoverification.component';
import { KkcBatchNoEntryComponent } from './kkc-batch-no-entry/kkc-batch-no-entry.component';
import { KkcDdentryComponent } from './KKC/kkc-ddentry/kkc-ddentry.component';
import { InvoiceAmountPendingListComponent } from './Invoicee/invoice-amount-pending-list/invoice-amount-pending-list.component';
// import { KcvtpCenterInvlist2Component } from './Invoicee/kcvtp-center-invlist2/kcvtp-center-invlist2.component';
// import { SroEntryDetailsComponent } from './sro-entry-details/sro-entry-details.component';
import { PhaseTwoKkcEntryComponent } from './KKC/phase-two-kkc-entry/phase-two-kkc-entry.component'
import { KcvtpCenterinvList2Component } from './Invoicee/kcvtp-center-invlist2/kcvtp-center-invlist2.component';
import { SroEntryDetailsComponent } from './sro-entry-details/sro-entry-details.component';
import { KkcDdVerificationComponent } from './KKC/kkc-dd-verification/kkc-dd-verification.component';
import { KkcDdEntryDetailsComponent } from './KKC/kkc-dd-entry-details/kkc-dd-entry-details.component'
import { kkcddEntry } from './models/KKC/kkcddentry';
import { CenterInvoiceList2Component } from './Invoicee/center-invoice-list2/center-invoice-list2.component';
import { SortbyDatePipe } from './sortby-date.pipe';
import { KkcDespatchnoEntryComponent } from './KKC/kkc-despatchno-entry/kkc-despatchno-entry.component';
import { KkcErpDespatchEntryComponent } from './kkc-erp-despatch-entry/kkc-erp-despatch-entry.component';
import { KkcDespatchStudListComponent } from './KKC/kkc-despatch-stud-list/kkc-despatch-stud-list.component';
import { KkcErpDespDetailsComponent } from './kkc-erp-desp-details/kkc-erp-desp-details.component';
import { RefreshComponent } from './refresh/refresh.component';
import { KkcErpHoVerificationComponent } from './kkc-erp-ho-verification/kkc-erp-ho-verification.component';
import { KkcDbaShareReleaseNoteComponent } from './KKC/kkc-dba-share-release-note/kkc-dba-share-release-note.component';
import { dbaShareReleaseNote } from './models/dbaEntry';
import { SroDespatchMonthReportComponent } from './sro-despatch-month-report/sro-despatch-month-report.component';
import { CenterInvoiceReportComponent } from './Invoicee/center-invoice-report/center-invoice-report.component';

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
  { path: 'invoice-generation', component: InvoiceComponent },
  { path: 'adjustment', component: AdjEntryComponent },
  { path: 'adjustment/:adjddlastId', component: AdjEntryComponent },
  { path: 'adjverification', component: AdjverificationComponent },
  { path: 'adjdetails', component: AdjentryDetailsComponent },
  { path: 'adjdetails/:adjddlastId', component: AdjentryDetailsComponent },
  { path: 'adjdespatch-no-entry', component: AdjdespatchComponent },
  { path: 'adjdespstudlist', component: AdjDespstudlistComponent },
  { path: 'adjdba-no-entry', component: AdjdbaNoEntryComponent },
  { path: 'adjdba-details', component: AdjdbaDetailsComponent },
  { path: 'adjpending-dd', component: AdjpendingddComponent },
  { path: 'erp-despatch-entry', component: ErpdespatchEntryComponent },
  { path: 'erp-despatch-entry/:erpdespId', component: ErpdespatchEntryComponent },

  { path: 'erpdesp-details', component: ErpdespdetailsComponent },
  { path: 'erpdesp-details/:erpdespId', component: ErpdespdetailsComponent },
  { path: 'dba-desp-list', component: DbaDespListComponent },
  { path: 'invoice-entry', component: InvoiceEntryComponent },
  { path: 'invoice-entry/:invoiceEntryId', component: InvoiceEntryComponent },

  { path: 'ddkkc', component: DdkkcComponent },
  { path: 'invoiceentryverification', component: InvoiceentryverificationComponent },
  { path: 'invoice-manual-generate', component: InvoiceManualComponent },
  { path: 'invoice-report', component: InvoiceReportComponent },
  // { path: 'kkcverification', component: KkcverificationComponent },
  { path: 'invoiceentry-details', component: InvoiceEntryDetailsComponent },
  { path: 'invoiceentry-details/:invoiceEntryId', component: InvoiceEntryDetailsComponent },

  // { path: 'kkcverification', component: KkcverificationComponent },
  { path: 'dd-despatch-ack', component: DdDespatchAckComponent },
  { path: 'sro-entry', component: KkcSroEntryComponent },
  { path: 'sro-entry/:sroId', component: KkcSroEntryComponent },

  { path: 'despatch-ack-details', component: DespatchAckDetailsComponent },
  { path: 'sro-entry-report', component: SrodailyreportComponent },
  { path: 'kcvtp-centers-invoice', component: KcvtpCenterInvoiceDetailsComponent },
  { path: 'invoice-Amount-pending', component: InvoiceAmountPendingComponent },
  { path: 'srohoverification', component: SrohoverificationComponent },
  { path: 'sro-entry-details', component: SroEntryDetailsComponent },
  { path: 'sro-entry-details/:sroId', component: SroEntryDetailsComponent },


  { path: 'kkc-batchno-entry', component: KkcBatchNoEntryComponent },
  { path: 'kkc-dd-entry', component: KkcDdentryComponent },
  { path: 'kkc-dd-verification', component: KkcDdVerificationComponent },
  { path: 'kkc-dd-entry-details', component: KkcDdEntryDetailsComponent },
  { path: 'kkc-dd-entry-details/:kkcId', component: KkcDdEntryDetailsComponent },

  // {}
  { path: 'srohoverification', component: SrohoverificationComponent },
  { path: 'kkc-batchno-entry', component: KkcBatchNoEntryComponent },
  { path: 'invoice-amt-pendingList', component: InvoiceAmountPendingListComponent },
  { path: 'kcvtp-center-invlist2', component: KcvtpCenterinvList2Component },
  { path: 'kkc-phase-two-entry', component: PhaseTwoKkcEntryComponent },
  // { path: 'kcvtp-center-invlist2', component: KcvtpCenterinvList2Component }
  { path: 'kkc-dd-entry/:kkcId', component: KkcDdentryComponent },
  { path: 'kcvtp-ceterList-2', component: CenterInvoiceList2Component },
  { path: 'kkc-despatchEntry', component: KkcDespatchnoEntryComponent },
  { path: 'kkc-erp-despatch-entry', component: KkcErpDespatchEntryComponent },
  { path: 'kkc-desp-studlist', component: KkcDespatchStudListComponent },

  { path: 'kkc-erp-despatch-entry/:erpId', component: KkcErpDespatchEntryComponent },

  { path: 'kkc-erp-desp-details', component: KkcErpDespDetailsComponent },
  { path: 'kkc-erp-desp-details/:erpId', component: KkcErpDespDetailsComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'kkc-erp-ho-verification', component: KkcErpHoVerificationComponent },
  { path: 'kkc-dbaentry', component: KkcDbaShareReleaseNoteComponent },
  { path: 'kkc-sro-erp-monthly-report',component:SroDespatchMonthReportComponent }
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
    DbaDespListComponent,
    InvoiceEntryComponent,
    RoundPipe,
    ToWordPipe,
    InvoiceentryverificationComponent,
    DdkkcComponent,
    InvoiceReportComponent,
    InvoiceManualComponent,
    // KkcverificationComponent,
    DdDespatchAckComponent,
    InvoiceEntryDetailsComponent,
    KkcSroEntryComponent,
    DespatchAckDetailsComponent,
    SrodailyreportComponent,
    GroupByPipe,
    SumPipe,
    UniquePipe,
    KcvtpCenterInvoiceDetailsComponent,
    InvoiceAmountPendingComponent,
    SrohoverificationComponent,
    KkcBatchNoEntryComponent,
    KkcDdentryComponent,
    InvoiceAmountPendingListComponent,
    KcvtpCenterinvList2Component,
    SroEntryDetailsComponent,
    PhaseTwoKkcEntryComponent,
    // KcvtpCenterinvList2Component,
    SroEntryDetailsComponent,
    KkcDdVerificationComponent,
    KkcDdEntryDetailsComponent,
    CenterInvoiceList2Component,
    SortbyDatePipe,
    KkcDespatchnoEntryComponent,
    KkcErpDespatchEntryComponent,
    KkcDespatchStudListComponent,
    KkcErpDespDetailsComponent,
    RefreshComponent,
    KkcErpHoVerificationComponent,
    KkcDbaShareReleaseNoteComponent,
    SroDespatchMonthReportComponent,
    CenterInvoiceReportComponent

  ],
  imports: [
    FormsModule,
    TimepickerModule.forRoot(),
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
