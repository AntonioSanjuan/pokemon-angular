import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { BasePopUp, BasePopUpData } from 'src/app/models/internals/common/popUp.model';

export interface PopUp<T> {
  id: string,
  data: MatDialogRef<unknown, T>
}

export enum PopUpType {
  addPokemonComparison = 'addPokemonComparison'
}

@Injectable()
export class UsePopUp {
  private openedPopUps: PopUp<unknown>[] = []

  constructor(
    private dialog: MatDialog,
    private readonly sso: ScrollStrategyOptions
  ) {}

  public close(id: string, output?: unknown) {
    const popUpToCloseIndex = this.openedPopUps.findIndex((openedPopUp) => {
      return openedPopUp.id === id
    })

    if(popUpToCloseIndex !== -1) {
      const popUpToClose = this.openedPopUps[popUpToCloseIndex]

      popUpToClose?.data.close(output)
      this.openedPopUps.splice(popUpToCloseIndex, 1)
    }
  }

  public open<T>(popUpType: PopUpType): Observable<T | undefined> {
    const newDialogId: string = '1';
    const newDialogConfig: MatDialogConfig = {
      id: newDialogId,
      width: '50vw',
      maxWidth: '50vw',
      scrollStrategy: this.sso.block(),
    }

    let newDialog!: MatDialogRef<BasePopUp, T>;

    switch(popUpType){
      case PopUpType.addPokemonComparison: 
        newDialog = this.dialog.open(AddPokemonComparisonComponent, newDialogConfig)
        newDialog.componentInstance.popUpData = new BasePopUpData(newDialogId)
        break;
      default:
        newDialog = this.dialog.open(AddPokemonComparisonComponent, newDialogConfig)
        break;
    }

    const popUp: PopUp<T> = { 
      id: newDialog.id,
      data: newDialog
    }
    this.openedPopUps.push(popUp)
    return popUp.data.afterClosed()


  }
}
