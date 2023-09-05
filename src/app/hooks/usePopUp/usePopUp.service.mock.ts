import { of } from "rxjs"
import { mockGetter } from "src/app/utils/tests/commonMocks";
import { UsePopUp } from "./usePopU.service";
import { PopUpStatus } from "src/app/models/internals/common/popUpStatus.model";

const openAddPokemonComparisonSpy = jest.fn()

export const UseFilterPokemonsMock: Partial<UsePopUp> = {
  openAddPokemonComparison: openAddPokemonComparisonSpy,
  popUpStatus$: of<PopUpStatus>("closed"),
}

export const UseFilterPokemonsMockReset = () => {
  openAddPokemonComparisonSpy.mockReset()

  mockGetter(UseFilterPokemonsMock, "popUpStatus$", of<PopUpStatus>("closed"))
}