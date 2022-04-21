import { Router } from 'express';

import { DEFAULT_JOI_OPTIONS } from '../constants';
import { createValidator } from '../helpers';
import { personValidationSchema } from '../validation-schemas';
import { personController } from '../controllers';

export const personRouter: Router = Router();

/**
 * @swagger
 * /person/{id}:
 *   get:
 *     tags: [Person]
 *     summary: Get Person by id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            type: object
 *            properties:
 *              person:
 *                $ref: '#/definitions/Person'
 */

personRouter.get(
  '/person/:id',
  createValidator(personValidationSchema.params, 'params', DEFAULT_JOI_OPTIONS),
  personController.try.get
);


/**
 * @swagger
 * /person/{id}/movies:
 *   get:
 *     tags: [Person]
 *     summary: Get Person by id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            type: object
 *            properties:
 *              person:
 *                $ref: '#/definitions/Person'
 *              movies:
 *               type: array
 *               items:
 *                $ref: '#/definitions/Movie'
 */

personRouter.get(
  '/person/:id/movies',
  createValidator(personValidationSchema.params, 'params', DEFAULT_JOI_OPTIONS),
  personController.try.movies
);

/**
 * @swagger
 * /person/similar/character:
 *   get:
 *     tags: [Person]
 *     summary: Get Person by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                 character:
 *                   type: string
 *                 persons:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Person'
 */

personRouter.get(
  '/person/similar/character',
  personController.try.similar
);


/**
 * @swagger
 * definition:
 *    Person:
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 */


/**
 * @swagger
 * definition:
 *    Movie:
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 */
