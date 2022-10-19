import { introduceMySelf } from "../src/introduceMySelf";

describe("introduceMySelf", () => {
  it("Should introduce me", () => {
    expect(introduceMySelf()).toEqual("hey");
  });
});
