import * as ActionTypes from '../actions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_PAGE:
            return Object.assign({}, state, {
                page: action.page,
            });
        default:
            return state;
    }
}
