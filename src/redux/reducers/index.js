import { ADD_POST, DELETE_POST, EDIT_POST, UPDATE, DELETE_ALL } from '../actions/action-types.js';
const postReducer = (state = [], action) => {
    switch (action.type) {
        
        case ADD_POST:
            return state.concat([action.data])
        case DELETE_POST:
            return state.filter((post) => post.id !== action.id)
        case DELETE_ALL:
            return state = [];
        case EDIT_POST:
            return state.map((post) => post.id === action.id ? { ...post, editing: !post.editing } : post)
        case UPDATE:
            return state.map((post) => {
                if (post.id === action.data.id) {
                    return {
                        ...post,
                        value: action.data.value
                    }
                }
                else 
                    return post;
            })
        default:
            return state;
    }
}
export default postReducer;