import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

interface ICommentInputContainerProps {
    username?: string;
    comments?: any;
    onSubmit?: Function;
}

interface ICommentInputContainerState {
    username: string;
    comments?: any;
}

class CommentInputContainer extends Component<ICommentInputContainerProps, ICommentInputContainerState> {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor(props: ICommentInputContainerProps) {
        super(props)
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({
                username
            })
        }
    }

    _saveUsername (username: string) {
        localStorage.setItem('username', username)
    }

    handlerSubmitComment(comment: any) {
        if (!comment) return
        if (!comment.username) return alert('Please input username')
        if (!comment.content) return alert('Please input content')
        const {comments} = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render() {
        return (
            <CommentInput
            username={this.state.username}
            onUserNameInputBlur = {this._saveUsername.bind(this)}
            onSubmit={this.handlerSubmitComment.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state: ICommentInputContainerState) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onSubmit: (comment: any) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)
