import React, { Component } from 'react';
import PropTypes from 'prop-types'

interface ICommentProps {
    comment: {
        username: string;
        createdTime: number;
        content: string;
    };
    onDeleteComment?: Function;
    index: number;
}

interface ICommentState {
    timeString: string;
}

class Comment extends Component<ICommentProps, ICommentState> {
    private _timer!: NodeJS.Timer
    static propsTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    constructor(props: ICommentProps) {
        super(props)
        this.state = { timeString: '' }
    }
    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }

    _updateTimeString() {
        const comment = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000
        this.setState({
            timeString: duration > 60 
            ? `${Math.round(duration / 60)} minutes ago`
            : `${Math.round(Math.max(duration, 1))} seconds ago`
        })
    }

    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    private _getProcessedContent(content: string) {
        let s = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
        console.log(s)
        return s
    }
    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>:
                </div>
                <p dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(this.props.comment.content)
                }} />
                <span className='comment-createdime'>
                    {this.state.timeString}
                </span>
                <span
                onClick={this.handleDeleteComment.bind(this)}
                className='comment-delete'>
                    Delete
                </span>
            </div>
        )
    }
}

export default Comment;