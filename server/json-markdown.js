import path from 'path';
import fs from 'fs';
import parser from 'gray-matter';
import marked from 'marked';
import hljs from 'highlight.js';
import chalk from 'chalk';

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
        const mdFilePath = path.join(mdFilesDir, file);
        const mdFile = fs.readFileSync(mdFilePath, 'utf-8');
        const parsed = parser(mdFile);
        const { title, description, layout, route } = parsed.data;
        const html = marked(parsed.content);
        output[file] = {
            __TITLE__: title,
            __DESC__: description,
            __LAYOUT__: layout,
            __ROUTE__: route,
            __HTML__: html,
            __FILE__: file,
        };
    });
    fs.writeFile(path.join(__dirname, '..', 'public', 'md.json'), JSON.stringify(output, null, 4), err => {
        if (err) {
            throw err;
        } else {
            console.log(`${chalk.red('JSON Generated.')}`);
        }
    });
}

mdToJson();
