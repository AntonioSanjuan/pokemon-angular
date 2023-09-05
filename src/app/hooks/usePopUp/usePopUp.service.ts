import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpStatus } from 'src/app/models/internals/common/popUpStatus.model';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

export interface PopUp {
  id: string,
  data: MatDialogRef<unknown, unknown>
}

@Injectable()
export class UsePopUp {
  private openedPopUps: PopUp[] = []

  constructor(
    private dialog: MatDialog,
    private readonly sso: ScrollStrategyOptions
  ) {}

  public openAddPokemonComparison(): Observable<IPokemon> {
    const newDialog = this.dialog.open(AddPokemonComparisonComponent, {
      width: '50vw',
      maxWidth: '50vw',
      scrollStrategy: this.sso.block(),   
    })

    this.openedPopUps.push({ 
      id: newDialog.id,
      data: newDialog
    })

    return newDialog.afterClosed()
  }
}
