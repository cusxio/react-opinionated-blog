import path from 'path';
import fs from 'fs';
import parser from 'gray-matter';
import marked from 'marked';
import chalk from 'chalk';
import moment from 'moment';
import Promise from 'bluebird';

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang, callback) {
        require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
            callback(err, result.toString());
        });
    },
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
});

const mdFilesDir = path.join(__dirname, '..', '_droplets');
const mdFilesArr = fs.readdirSync(mdFilesDir);

let output = {};

Promise.mapSeries(mdFilesArr, file => {
    const fileAsArr = file.split('-');
    const date = `${fileAsArr[0]}-${fileAsArr[1]}-${fileAsArr[2]}`;
    const formattedDate = moment(date).format('MMMM Do YYYY');
    const shortDate = moment(date).format('DD MMM YYYY');
    const filename = fileAsArr[4];

    const mdFilePath = path.join(mdFilesDir, file);
    const mdFile = fs.readFileSync(mdFilePath, 'utf-8');
    const parsed = parser(mdFile);
    const { title, description, layout, route, tags } = parsed.data;

    return new Promise((resolve, reject) => {
        marked(parsed.content, function (err, content) {
            if (err) {
                reject();
            }
            output[route] = {
                __TITLE__: title,
                __ODATE__: date,
                __SDATE__: shortDate,
                __DATE__: formattedDate,
                __DESC__: description,
                __LAYOUT__: layout,
                __ROUTE__: route,
                __TAGS__: tags,
                __HTML__: content,
                __FILE__: filename,
            };
            resolve();
        });
    });
}).then(() => {
    fs.writeFile(path.join(__dirname, '..', '_tmp', 'data.json'), JSON.stringify(output, null, 4), err => {
        if (err) {
            console.log(`    ${chalk.red.bold(`✖ Error: ${err}`)}`);
        } else {
            console.log(`    ${chalk.green.bold('✔ Data JSON Generated in _tmp.')}`);
        }
    });
});
