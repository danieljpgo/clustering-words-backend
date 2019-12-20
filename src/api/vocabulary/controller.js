import { success, notFound } from '../../services/response/'
import { Vocabulary } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Vocabulary.create(body)
    .then((vocabulary) => vocabulary.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Vocabulary.count(query)
    .then(count => Vocabulary.find(query, select, cursor)
      .then((vocabularies) => ({
        count,
        rows: vocabularies.map((vocabulary) => vocabulary.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then(success(res))
    .catch(next)

export const isolated = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => {

      // @TODO Add more stopWords
      const stopWords = ['a', 'agora', 'ainda', 'alguém', 'algum']

      // Ignore case
      // Regular expression to remove a punctuation range
      // Regular expression to remove stopWords

      vocabulary.text = vocabulary.text
        .toLocaleLowerCase()
        .replace(new RegExp('[.,;:]', 'g'), ' ')
        .replace(new RegExp('\\b(' + stopWords.join('|') + ')\\b', 'ig'), '')
        .trim()

      let vocabularyIsolated = []

      // Regular expression used to separate using multiple spaces
      vocabulary.text.split(/\s+/g).forEach((word) => {
        if (!vocabularyIsolated.find((value) => value === word)) {
          vocabularyIsolated.push(word)
        }
      })

      return vocabularyIsolated
    })
    .then(success(res))
    .catch(next)

export const group = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => {
      return vocabulary
    })
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? Object.assign(vocabulary, body).save() : null)
    .then((vocabulary) => vocabulary ? vocabulary.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.remove() : null)
    .then(success(res, 204))
    .catch(next)
