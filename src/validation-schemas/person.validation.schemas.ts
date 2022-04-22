import { EOperands } from '../constants';

const joi = require('joi');

export const personValidationSchema: Record<string, any> = {
  params: joi.object({
    id: joi.number().positive().integer().required(),
  }),
  paramsRolesCount: joi.object({
    operand: joi.string().valid(...Object.values(EOperands)).required(),
    value: joi.number().positive().integer().allow(0).required()
  })
}
