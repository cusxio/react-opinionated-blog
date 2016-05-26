import path from 'path';
import fs from 'fs';

export default function getAssetsPaths() {
    const obj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'app', 'bundles', 'webpack-stats.json')));

    if (obj.vendor) {
        return {
            css: obj.main.css,
            main: obj.main.js,
            vendor: obj.vendor.js,
        };
    }
    return {
        css: obj.main.css,
        main: obj.main.js,
    };
}
