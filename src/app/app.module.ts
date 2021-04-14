import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./material.module";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayModule} from "@angular/cdk/overlay";
import {SecurePipe} from "./pipes/secure.pipe";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {UpdateFileComponent} from "./components/update-file/update-file.component";
import {DetailsComponent} from "./components/details/details.component";
import {SizePipe} from "./pipes/size.pipe";
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {SafePipe} from "./pipes/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SecurePipe,
    ConfirmationDialogComponent,
    UpdateFileComponent,
    DetailsComponent,
    SizePipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    NgxDocViewerModule
  ],
  providers: [
    SecurePipe,
    SizePipe,
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
