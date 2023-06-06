import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonServiceModule } from 'src/app/services/poke-api/poke-api.service.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [
    SharedModule,
    PokemonServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule],
})
export class HomeModule {}