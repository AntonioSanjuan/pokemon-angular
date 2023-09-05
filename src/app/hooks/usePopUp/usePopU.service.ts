import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { PopUpStatus } from 'src/app/models/internals/common/popUpStatus.model';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';

@Injectable()
export class UsePopUp {
  private popUpStatusObj = new BehaviorSubject<PopUpStatus>("closed")

  public get popUpStatus$() {
    return this.popUpStatusObj.asObservable()
  }

  constructor(
    private dialog: MatDialog
  ) {}

  public openAddPokemonComparison() {
    this.dialog.open(AddPokemonComparisonComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  public close() {
    this.dialog.closeAll()
  }
}
