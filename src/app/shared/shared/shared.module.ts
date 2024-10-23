import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CapitalizePipe],
  imports: [CommonModule, HttpClientModule],
  exports: [CapitalizePipe],
})
export class SharedModule {}
