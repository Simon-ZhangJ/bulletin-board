import React, { Component } from 'react';
import Commenct from './Comment';
import PropTypes from 'prop-types'

interface ICommentListProps {
    comments: string[];
    onDeleteComment: Function;
}

class CommentList extends Component<ICommentListProps> {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {comments: []}

    handleDeleteComment(index: number) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }
    render() {
        return (
            <div>{this.props.comments.map((comment: any, i: number) => 
                <Commenct 
                comment={comment} 
                key={i}
                index={i}
                onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            )}</div>
        )
    }
}

export default CommentList;