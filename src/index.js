const path = require("path");

const cors = require("@koa/cors");
const { createLogger } = require("bunyan");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");

const { APP_NAME: name, APP_PORT: port } = require ("./const");

const { prepRequestForService } = require("./middleware");

const { routers } = require("./routers");

const { getTemplates } = require("./utils");

const logger = createLogger({ name, level: 0 });

const emailTemplateDirectories = path.join(__dirname, "./templates");

const main = async () => {
  const templates = await getTemplates(emailTemplateDirectories);

  const router = routers({ templates, logger });

  const App = new Koa()
    .use(cors())
    .use(bodyParser())
    .use(prepRequestForService)
    .use(router.app.routes())
    .use(router.app.allowedMethods())
    .use(router.email.routes())
    .use(router.email.allowedMethods())
    .use(compress());

  App.listen({ port }, () => {
    logger.info({ port }, "App Started 🔥");
  });
};

main();
