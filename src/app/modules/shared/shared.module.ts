import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

const modules: any[] = [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule];
const sharedComponents: any[] = [];
const sharedDirectives: any[] = [];

@NgModule({
  declarations: [...sharedComponents, ...sharedDirectives],
  imports: [...modules],
  exports: [...modules, ...sharedComponents, ...sharedDirectives],
})
export class SharedModule {}