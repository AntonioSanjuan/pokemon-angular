import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsePopUp } from 'src/app/hooks/usePopUp/usePopUp.service';
import { BasePopUp } from 'src/app/models/internals/common/popUp.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-add-pokemon-comparison',
  templateUrl: './add-pokemon-comparison.component.html',
  styleUrls: ['./add-pokemon-comparison.component.scss']
})
export class AddPokemonComparisonComponent extends BasePopUp {
  constructor(
    public usePopUp: UsePopUp,
    public dialogRef: MatDialogRef<AddPokemonComparisonComponent>
  ) {
    super()
  }


  public compareWith(pokemon: IPokemon) {
    this.usePopUp.close(this.popUpData?.id, pokemon)
    // this.dialogRef.close(pokemon)
  }
}
