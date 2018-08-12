const baseState         = {};
const FETCH_ALL_NEWS    = 'FETCH_ALL_NEWS';

export function newsCollectionReducer(state = baseState, action ) {
    switch (action.type) {
        case FETCH_ALL_NEWS:
            return {
                ...state,
                articles: action.payload
            };
        default:
            return state;
    }
}
