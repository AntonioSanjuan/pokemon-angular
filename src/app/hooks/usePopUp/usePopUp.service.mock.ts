import { UsePopUp } from "./usePopUp.service";

const openSpy = jest.fn()
const closeSpy = jest.fn()

export const UsePopUpMock: Partial<UsePopUp> = {
  open: openSpy,
  close: closeSpy
}

export const UsePopUpMockReset = () => {
  openSpy.mockReset()
  closeSpy.mockReset()
}