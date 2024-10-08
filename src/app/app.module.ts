import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleListComponent } from './components/molecules/article-list/article-list.component'
import { ButtonComponent } from 'src/app/components/atoms/button/button.component';
import { CustomDropdownComponent } from './components/atoms/dropdown/custom-dropdown/custom-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/molecules/dynamic-form/dynamic-form.component';
import { ModalComponent } from './components/organisms/modal/modal.component';
import { CreateModalComponent } from './components/organisms/create-modal/create-modal.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { NavigationComponent } from './components/organisms/navigation/navigation.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';
import { FormTextInputComponent } from './components/atoms/text-input/form-text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ButtonComponent,
    CustomDropdownComponent,
    DynamicFormComponent,
    ModalComponent,
    CreateModalComponent,
    FormTextInputComponent,
    HeaderComponent,
    NavigationComponent,
    FormCreateComponent
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
