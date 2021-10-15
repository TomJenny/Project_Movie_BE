const { RESPONSE_CODE } = require("../constants");
const groupCtr = require("../controllers/group.controllers");
const groupSchemas = require("../validations/group.validation");

const authorizeGroup = async (req, res, next) => {
  try {
    if (!req.query.groupCode) {
      return next();
    }

    const { groupCode } = req.query;

    const { error } = groupSchemas.authorGroup.validate(req["query"]);

    const valid = error == null;

    if (!valid) {
      const errorMessage = error.details[0].message;
      return res.status(RESPONSE_CODE.BAD_REQUEST).send(errorMessage);
    }

    const group = await groupCtr.getGroupByGroupCode(groupCode);

    if (!group) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Group Code does not exist");
    }

    req.group = group.id;

    next();
  } catch (err) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = {
  authorizeGroup,
};
