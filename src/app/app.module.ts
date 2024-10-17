import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from 'src/app/components/atoms/button/button.component';
import { CustomDropdownComponent } from './components/atoms/custom-dropdown/custom-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/molecules/dynamic-form/dynamic-form.component';
import { ModalComponent } from './components/organisms/modal/modal.component';
import { CreateModalComponent } from './components/organisms/create-modal/create-modal.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { NavigationComponent } from './components/organisms/navigation/navigation.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';
import { FormTextInputComponent } from './components/atoms/text-input/form-text-input.component';
import { TableComponent } from './components/organisms/table/table.component';
import { DashboardComponent } from './components/molecules/dashboard/dashboard.component';
import { NakedButtonComponent } from './components/atoms/naked-button/naked-button.component';
import { ToastComponent } from './components/atoms/toast/toast.component';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CustomDropdownComponent,
    DynamicFormComponent,
    ModalComponent,
    CreateModalComponent,
    FormTextInputComponent,
    HeaderComponent,
    NavigationComponent,
    FormCreateComponent,
    TableComponent,
    DashboardComponent,
    NakedButtonComponent,
    ToastComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
