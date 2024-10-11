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
import { TableComponent } from './components/molecules/table/table.component';
import { DashboardComponent } from './components/molecules/dashboard/dashboard.component';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
