import printButtonFactory from "./PrintButton";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("PrintButton test", function() {
  it("test render", async function() {
    const { fn, hooks } = printButtonFactory();
    hooks.on("r:payPrintBtnFn", function(
      payPrintBtnFn,
      payBtnLabel,
      payBtnClickable
    ) {
      this.update("payPrintBtnFn", () => (
        <button class={{ "btn-blur": !payBtnClickable.value }}>
          {payBtnLabel.value}
        </button>
      ));
    });
    let order;
    hooks.on("order", _order => (order = _order));

    const component = fn();
    const wrapper = mount(component, {
      props: {
        //msg: "Hello World"
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<button class=\\"btn-blur\\">print</button><p></p>"`
    );

    order.items.push({ name: "cola", sent: true });
    await nextTick();

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<button class=\\"\\">pay</button><p></p>"`
    );
  }, 80000);
});
