import logicFactory from "./PrintButtonLogic";

describe("PrintButtonLogic test", function() {
  it("test factory", function() {
    const { order, payBtnClickable, payBtnLabel } = logicFactory();
    expect([payBtnLabel.value, payBtnClickable.value]).toMatchInlineSnapshot(`
      Array [
        "print",
        false,
      ]
    `);
    order.items.push({ name: "cola", sent: true });
    expect([payBtnLabel.value, payBtnClickable.value]).toMatchInlineSnapshot(`
      Array [
        "pay",
        true,
      ]
    `);
    order.items.push({ name: "fanta" });
    expect([payBtnLabel.value, payBtnClickable.value]).toMatchInlineSnapshot(`
      Array [
        "print",
        true,
      ]
    `);
  });
});
