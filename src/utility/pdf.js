const puppeteer = require('puppeteer');
const ejs = require('ejs');

const generatePdf = async (data, template) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const compiledTemplate = ejs.compile(template);

  // Render the template with the data
  const html = compiledTemplate(data);

  // Set the content of the page to the rendered template
  await page.setContent(html);

  await page.pdf({
    format: 'A4',
    path: `${__dirname}/my-fance-invoice.pdf`,
  });

  await browser.close();
};

module.exports = {
  generatePdf,
};
