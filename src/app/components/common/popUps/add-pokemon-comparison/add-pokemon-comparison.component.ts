import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-add-pokemon-comparison',
  templateUrl: './add-pokemon-comparison.component.html',
  styleUrls: ['./add-pokemon-comparison.component.scss']
})
export class AddPokemonComparisonComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPokemonComparisonComponent>
  ) {}

  public compareWith(pokemon: IPokemon) {
    this.dialogRef.close(pokemon)
  }
}
