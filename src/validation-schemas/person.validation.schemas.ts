const joi = require('joi');

export const personValidationSchema: Record<string, any> = {
  params: joi.object({
    id: joi.number().positive().integer()
  })
}
