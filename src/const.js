const HEADER_REQUEST_ID = "x-request-id";
const UTF_8 = "utf-8";
const ERROR_MESSAGE_NO_EMAIL_TEMPLATE =
  "email template does not exist. If developing -- try restarting the server.";
const ERROR_MESSAGE_INVALID_EMAIL_COMPONENT =
  "invalid email component. must be: json, html, text or subject";

const APP_PORT = process.env.APP_PORT || 8080;
const APP_NAME = process.env.APP_NAME || process.env.npm_package_name;

const HTML = "html";
const TEXT = "text";
const SUBJECT = "subject";
const JSON = "json";

const VALID_EMAIL_COMPONENTS = [HTML, TEXT, SUBJECT, JSON];

module.exports = {
  HEADER_REQUEST_ID
 ,UTF_8
 ,ERROR_MESSAGE_NO_EMAIL_TEMPLATE
 ,ERROR_MESSAGE_INVALID_EMAIL_COMPONENT
 ,APP_PORT
 ,APP_NAME
 ,HTML
 ,TEXT
 ,SUBJECT
 ,JSON
 ,VALID_EMAIL_COMPONENTS
};
