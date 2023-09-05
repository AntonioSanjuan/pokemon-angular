import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';

const modules = [
  MatCardModule, 
  MatIconModule, 
  MatButtonModule, 
  MatInputModule, 
  MatChipsModule,
  MatDialogModule
]


@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}