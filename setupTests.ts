// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable no-promise-executor-return */
/* eslint-disable camelcase */

jest.mock('ng-apexcharts', () => ({
  ...jest.requireActual('ng-apexcharts'),
  __esModule: true,
}));

// mocks neccesary for ng-apexcharts
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value:
   window.ResizeObserver 
   || jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn()
   }))
});

Object.defineProperty(window.SVGElement.prototype, 'getScreenCTM', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

Object.defineProperty(window.SVGElement.prototype, 'getComputedTextLength', {
  writable: true,
  value: jest.fn().mockReturnValue(0),
});

Object.defineProperty(window.SVGElement.prototype, 'createSVGMatrix', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 10,
    y: 10,
    inverse: () => {},
    multiply: () => {},
  }),
});
