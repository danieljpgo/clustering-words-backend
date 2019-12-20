import { success, notFound } from '../../services/response/'
import { Vocabulary } from '.'
import { processGenericString, processIsolatedVocabulary, processIsolatedVector, processGroupVocabulary, processGroupVector } from '../../services/vocabulary'

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

export const isolated = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => processIsolatedVocabulary(vocabulary))
    .then(success(res))
    .catch(next)

export const isolatedVector = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => processGenericString(vocabulary.text))
    .then((vocabulary) => processIsolatedVector(vocabulary))
    .then(success(res))
    .catch(next)

export const group = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => processGroupVocabulary(vocabulary))
    .then(success(res))
    .catch(next)

export const groupVector = ({ params }, res, next) =>
  Vocabulary.findById(params.id)
    .then(notFound(res))
    .then((vocabulary) => vocabulary ? vocabulary.view() : null)
    .then((vocabulary) => processGenericString(vocabulary.text))
    .then((vocabulary) => processGroupVector(vocabulary))
    .then(success(res))
    .catch(next)
