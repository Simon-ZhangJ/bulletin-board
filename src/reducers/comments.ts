const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

interface IAction {
    type: string, 
    comments: string[], 
    comment: string, 
    commentIndex: number,
}

export default function(state: any, action: IAction) {
    if (!state) {
        state = {comments: []}
    }
    switch (action.type) {
        case INIT_COMMENTS:
            return {comments: action.comments}
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            }
        case DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state
    }
}

export const initComments = (comments: string[]) => {
    return {type: INIT_COMMENTS, comments}
}

export const addComment = (comment: string) => {
    return {type: ADD_COMMENT, comment}
}

export const deleteComment = (commentIndex: number) => {
    return {type: DELETE_COMMENT, commentIndex}
}