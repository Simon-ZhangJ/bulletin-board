import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface ICommentInputProps {
    username: string;
    onUserNameInputBlur: Function;
    onSubmit: Function;
}

interface ICommentInputState {
    username: string;
    content: string;
}

class CommentInput extends Component<ICommentInputProps, ICommentInputState> {

    private textarea!: HTMLTextAreaElement

    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }

    constructor(props: ICommentInputProps) {
        super(props);
        this.state = {
            username: props.username,
            content: ''
        }
    }

    componentWillMount() {
        // this._loadUsername()
    }

    componentDidMount() {
        this.textarea.focus()
    }

    handleUsernameBlur(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(event.target.value)
        }
    }

    handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value
        })
    }

    handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(
                {
                    username: this.state.username, 
                    content: this.state.content,
                    createdTime: +new Date()
                }
            )
        }
        this.setState({content: ''})
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>Name</span>
                    <div className='comment-field-input'>
                        <input 
                        value={this.state.username} 
                        onBlur={this.handleUsernameBlur.bind(this)}
                        onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>Comment</span>
                    <div className='comment-field-input'>
                        <textarea 
                        ref={(txtArea: HTMLTextAreaElement) => this.textarea = txtArea}
                        value={this.state.content} 
                        onChange={this.handleCommentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        )
    }
}

export default CommentInput;