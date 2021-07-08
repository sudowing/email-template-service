const { v4 } = require("uuid");
const { HEADER_REQUEST_ID } = require("./const");

const prepRequestForService = async (ctx, next) => {
  // assign request uuid & set in state for logs and response header
  const reqId = v4();
  ctx.response.set(HEADER_REQUEST_ID, reqId);
  ctx.state = { reqId };
  await next();
};

module.exports = {prepRequestForService};