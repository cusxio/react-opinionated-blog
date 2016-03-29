import path from 'path';
import fs from 'fs';
import parser from 'gray-matter';
import marked from 'marked';
import hljs from 'highlight.js';
import chalk from 'chalk';
import moment from 'moment';

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: code => {
        return hljs.highlightAuto(code).value;
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

function mdToJson() {
    let output = {};
    mdFilesArr.forEach(file => {
        // Getting Dates out of filenames.
        const fileAsArr = file.split('-');
        const date = `${fileAsArr[0]}-${fileAsArr[1]}-${fileAsArr[2]}`;
        const formattedDate = moment(date).format('MMMM Do YYYY');
        const filename = fileAsArr[4];

        const mdFilePath = path.join(mdFilesDir, file);
        const mdFile = fs.readFileSync(mdFilePath, 'utf-8');
        const parsed = parser(mdFile);
        const { title, description, layout, route, tags } = parsed.data;
        const html = marked(parsed.content);
        output[route] = {
            __TITLE__: title,
            __DATE__: formattedDate,
            __DESC__: description,
            __LAYOUT__: layout,
            __ROUTE__: route,
            __TAGS__: tags,
            __HTML__: html,
            __FILE__: filename,
        };
    });
    fs.writeFile(path.join(__dirname, '..', '_tmp', 'data.json'), JSON.stringify(output, null, 4), err => {
        if (err) {
            throw err;
        } else {
            console.log(`${chalk.red('  JSON Generated.')}`);
        }
    });
}

mdToJson();
