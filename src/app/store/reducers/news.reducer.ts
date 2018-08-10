const baseState     = {};
const FETCH_NEWS    = 'FETCH_NEWS';

export function newsReducer(state = baseState, action ) {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                article: action.payload
            };
        default:
            return state;
    }
}
