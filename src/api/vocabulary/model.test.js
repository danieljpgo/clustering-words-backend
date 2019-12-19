import { Vocabulary } from '.'

let vocabulary

beforeEach(async () => {
  vocabulary = await Vocabulary.create({ text: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = vocabulary.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vocabulary.id)
    expect(view.text).toBe(vocabulary.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = vocabulary.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vocabulary.id)
    expect(view.text).toBe(vocabulary.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
