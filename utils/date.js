const getTimeStampSecond = () => Date.now() / 1000;
const getTimeStampMiliSecond = () => Date.now();

module.exports = {
  getTimeStampSecond,
  getTimeStampMiliSecond,
};
