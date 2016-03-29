import allPages from '../../../_tmp/data.json';

export const GET_PAGE = 'GET_PAGE';

export function getPage(page) {
    return {
        type: GET_PAGE,
        page: allPages[page],
    };
}
