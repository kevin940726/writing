const inquirer = require('inquirer');
const dedent = require('dedent');
const dateFormat = require('dateformat');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const chalk = require('chalk');

function createTemplate({
  title = '',
  hero = '',
} = {}) {
  return dedent`
    ---
    title: '${title}'
    date: ${dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')}
    layout: Post
    ${hero ? `hero: ${hero}` : ''}
    ---
  `;
}

inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'Enter the post title:',
  },
  {
    type: 'input',
    name: 'hero',
    message: 'Enter the hero image url path (optional):',
  },
]).then(answers => {
  const template = createTemplate(answers);

  const filename = `${sanitize(answers.title.replace(/\s/g, '-'))}.md`;

  fs.writeFile(filename, template, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`${chalk.yellow(`🎉  Successfully create post ${chalk.bold(filename)} !`)}`);
  })
});
