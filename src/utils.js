const fs = require("fs");
const mjml2html = require("mjml");

const cnst = require("./const");

const readDir = (directoryPath) =>
  new Promise((resolve, reject) => {
    fs.readdir(directoryPath, function (err, files) {
      if (err) throw reject(err);
      resolve(files);
    });
  });

const readFile = (filepath, encoding = cnst.UTF_8) =>
  new Promise((resolve, reject) => {
    try {
      fs.readFile(filepath, encoding, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });

const getTemplateStrings = (directoryPath) =>
  async templateName => {
    const [mjml, text, subject] = await Promise.all([
      readFile(`${directoryPath}/${templateName}/body.mjml`),
      readFile(`${directoryPath}/${templateName}/body.txt`),
      readFile(`${directoryPath}/${templateName}/subject.txt`),
    ]);
    return { text, subject, mjml };
  };

const getTemplates = async (directoryPath) => {
  const templateDirectories = await readDir(directoryPath);
  const names = templateDirectories.filter((item) => item !== ".keep");
  const templates = await Promise.all(
    names.map(getTemplateStrings(directoryPath))
  );
  return Object.fromEntries(
    templates.map((template, i) => [names[i], template])
  );
};

const mjmlToHtml = (mjml, options = {}) =>
  new Promise((resolve, reject) => {
    const { html, errors } = mjml2html(mjml, options);
    if (errors.length) reject(errors);
    resolve(html);
  });

const getEmailBodyAndType = (content, component) => {
  switch (component) {
    case cnst.SUBJECT:
      return { body: content.subject, type: cnst.TEXT };
    case cnst.HTML:
      return { body: content.html, type: cnst.HTML };
    case cnst.TEXT:
      return { body: content.text, type: cnst.TEXT };
    default:
      return { body: content, type: cnst.JSON };
    }
};

module.exports = {
   readDir
  ,readFile
  ,getTemplateStrings
  ,getTemplates
  ,mjmlToHtml
  ,getEmailBodyAndType
};