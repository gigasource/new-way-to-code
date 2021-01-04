import Simple from './Simple';
import { mount } from '@vue/test-utils';

describe('Simple', () => {
  it('ok', () => {
    const { hooks, fn } = Simple();
    hooks.on('r:xyz', function() {
      this.update('simpleComponentRenderFn', () => <div>x</div>)
    });
    const component = fn();
    const wrapper = mount(component, {});
    expect(wrapper.html()).toMatchInlineSnapshot(`" <div>x</div> "`);
  });
});
