import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {create, index, show, update, destroy, isolated, group, isolatedVector} from './controller'
import { schema } from './model'
export Vocabulary, { schema } from './model'

const router = new Router()
const { text } = schema.tree

/**
 * @api {post} /vocabularies Create vocabulary
 * @apiName CreateVocabulary
 * @apiGroup Vocabulary
 * @apiParam text Vocabulary's text.
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.post('/',
  body({ text }),
  create)

/**
 * @api {get} /vocabularies Retrieve vocabularies
 * @apiName RetrieveVocabularies
 * @apiGroup Vocabulary
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of vocabularies.
 * @apiSuccess {Object[]} rows List of vocabularies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /vocabularies/:id Retrieve vocabulary
 * @apiName RetrieveVocabulary
 * @apiGroup Vocabulary
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.get('/:id',
  show)

/**
 * @api {get} /vocabularies/isolated/:id Retrieve vocabulary
 * @apiName RetrieveVocabulary
 * @apiGroup Vocabulary
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.get('/isolated/:id',
  isolated)

/**
 * @api {get} /vocabularies/isolated/vector/:id Retrieve vocabulary
 * @apiName RetrieveVocabulary
 * @apiGroup Vocabulary
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.get('/isolated/vector/:id',
  isolatedVector)

/**
 * @api {get} /vocabularies/group/:id Retrieve vocabulary
 * @apiName RetrieveVocabulary
 * @apiGroup Vocabulary
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.get('/group/:id',
  group)

/**
 * @api {put} /vocabularies/:id Update vocabulary
 * @apiName UpdateVocabulary
 * @apiGroup Vocabulary
 * @apiParam text Vocabulary's text.
 * @apiSuccess {Object} vocabulary Vocabulary's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vocabulary not found.
 */
router.put('/:id',
  body({ text }),
  update)

/**
 * @api {delete} /vocabularies/:id Delete vocabulary
 * @apiName DeleteVocabulary
 * @apiGroup Vocabulary
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vocabulary not found.
 */
router.delete('/:id',
  destroy)

export default router
