const Router = require("@koa/router");
const httpStatus = require("http-status-codes");
const Mustache = require("mustache");

const {
  APP_NAME,
  APP_PORT,
  ERROR_MESSAGE_NO_EMAIL_TEMPLATE,
  ERROR_MESSAGE_INVALID_EMAIL_COMPONENT,
  VALID_EMAIL_COMPONENTS,
} = require("./const");
const { mjmlToHtml, getEmailBodyAndType } = require("./utils");
const valid = require("./validation");

const emailRouter = ({ logger, templates }) => {
  const validateEmailCall = async ({ templateId, component, emailBase }) => {
    if (!templates[templateId])
      throw new Error(ERROR_MESSAGE_NO_EMAIL_TEMPLATE);
    if (!VALID_EMAIL_COMPONENTS.includes(component))
      throw new Error(ERROR_MESSAGE_INVALID_EMAIL_COMPONENT);
    await valid.emailBase.validateAsync(emailBase);
  };

  const generateEmailContent = async (templateId, payload) => {
    if (!templates[templateId])
      throw new Error(ERROR_MESSAGE_NO_EMAIL_TEMPLATE);
    const template = { ...templates[templateId] };
    return {
      subject: Mustache.render(template.subject, payload),
      text: Mustache.render(template.text, payload),
      html: await mjmlToHtml(Mustache.render(template.mjml, payload), {}),
    };
  };

  const router = new Router({ prefix: "/email" });

  router.get("/templates", async (ctx) => {
    ctx.response.body = Object.keys(templates);
  });

  router.post("/templates/:templateId/:component/", async (ctx) => {
    const { reqId } = ctx.state;
    const { templateId, component } = ctx.params;
    const { emailBase, ...emailExtra } = ctx.request.body;
    emailBase.eid = reqId;

    let body = {};
    let status = httpStatus.OK;
    try {
      await validateEmailCall({ templateId, component, emailBase });
      const emailContent = await generateEmailContent(templateId, {
        emailBase,
        ...emailExtra,
      });
      const email = getEmailBodyAndType(emailContent, component);
      body = email.body;
      ctx.type = email.type;
    } catch (err) {
      logger.error({ err, templateId, component, reqId }, "email call error");
      status = httpStatus.BAD_REQUEST;
      body.error = err.message;
    }
    ctx.response.status = status;
    ctx.response.body = body;
  });

  return router;
};

const routers = ({ logger, templates }) => {
  const router = new Router();
  router.get("/ping", (ctx) => {
    logger.debug("/ping endpoint called");
    ctx.response.body = {
      reqId: ctx.state.reqId,
      app_port: APP_PORT,
      service_name: APP_NAME,
      service_version: process.env.npm_package_version,
      timestamp: Date.now(),
    };
  });
  return {
    app: router,
    email: emailRouter({ logger, templates }),
  };
};

module.exports = { routers };