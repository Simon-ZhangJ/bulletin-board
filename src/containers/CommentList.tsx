import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

interface IProps {
    initComments: Function;
    onDeleteComment: Function;
    comments: string[];
}

interface IState {
    comments: any;
}

class CommentListContainer extends Component<IProps> {
    static propType = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        deleteComment: PropTypes.func
    }

    _loadComments() {
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)
    }

    componentWillMount() {
        this._loadComments()
    }

    handleDeleteComment(index: number) {
        const { comments } = this.props
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <CommentList
            comments={this.props.comments}
            onDeleteComment={this.handleDeleteComment.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        initComments: (comments: string[]) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex: number) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)