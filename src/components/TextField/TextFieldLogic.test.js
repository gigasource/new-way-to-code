import logicFactory from './TextFieldLogic';

describe('TextFieldLogic test', function () {
  it('should show false isValidText', function () {
    const { isValidText } = logicFactory()
    expect([isValidText.value]).toMatchInlineSnapshot(`
      Array [
        false,
      ]
    `)
  })

  it('should show true isValidText', function () {
    const { text ,isValidText } = logicFactory()
    text.value = '12345'
    expect([isValidText.value]).toMatchInlineSnapshot(`
      Array [
        true,
      ]
    `)
  })
})
