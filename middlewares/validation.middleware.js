const { RESPONSE_CODE } = require("../constants");

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;

      const message = details.map((i) => i.message).join(",");

      res.status(RESPONSE_CODE.BAD_REQUEST).json({
        error: message,
      });
    }
  };
};

module.exports = validationMiddleware;
