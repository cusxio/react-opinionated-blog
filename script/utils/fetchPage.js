import axios from 'axios';
import Promise from 'bluebird';

export default (host, page) => {
    return new Promise((resolve, reject) => {
        const pageUrl = host + page;
        axios.get(pageUrl, {
            headers: {
                'Content-type': 'text/html; charset=UTF-8',
            },
        })
        .then(response => {
            resolve([pageUrl, response.data]);
        })
        .catch(error => {
            reject([pageUrl, error]);
        });
    });
};

