import { UsePopUp } from "./usePopUp.service";

const openAddPokemonComparisonSpy = jest.fn()

export const UsePopUpMock: Partial<UsePopUp> = {
  openAddPokemonComparison: openAddPokemonComparisonSpy,
}

export const UsePopUpMockReset = () => {
  openAddPokemonComparisonSpy.mockReset()
}