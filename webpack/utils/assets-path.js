import path from 'path';
import fs from 'fs';

export default function getAssetsPaths() {
    const obj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'app', 'bundles', 'webpack-stats.json')));
    return {
        css: obj.main.css,
        js: obj.main.js,
    };
}
