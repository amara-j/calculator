import Calculator from "./Calulator.js";

it("sums numbers", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
