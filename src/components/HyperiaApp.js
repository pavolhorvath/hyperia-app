import React from "react"
import myHelper from "../myHelper"
import Cookies from "universal-cookie"
import Account from "./Account";
import Comment from "./Comment";
import AddComment from "./AddComment";

class HyperiaApp extends React.Component
{
	constructor() {
		super();

		this.cookies = new Cookies()
		this.refAddComment = React.createRef()

		this.state = {
			id: '',
			title: '',
			content: '',
			autor: '',
			cdate: '',
			comments: [],
			isLogin: false,
			errors: [],
			token: '',
			login: '',
			showAddForm: false
		}

		var token = this.cookies.get('Login-token')
		var login = this.cookies.get('login')
		if (token && login) {
			this.state.token = token
			this.state.login = login
			this.state.isLogin = true
		}

		this.loadData()
	}

	loadData = () => {
		myHelper.Axios.post('article', myHelper.getFormData({id: 1}))
			.then(response => {
				this.setState(response.data)
			})
	}

	setIsLogin = (val) => {
		this.setState({
			isLogin: val
		})
		if (!val) {
			this.setToken('')
		}
	}

	setErrors = (errors) => {
		this.setState({
			errors: errors
		})
		setTimeout(() => {
			this.setState({
				errors: []
			})
		}, 5000)
	}

	setToken = (token) => {
		this.setState({
			token: token
		})
		this.cookies.set('Login-token', token, {path: '/'})
	}

	setLogin = (login) => {
		this.setState({
			login: login
		})
		this.cookies.set('login', login, {path: '/'})
	}

	setComment = (comment, index) => {
		var comments = this.state.comments
		comments[index] = comment
		this.setState({
			comments: comments
		})
	}

	showAddCommentForm = () => {
		this.setState({
			showAddForm: true
		})
		this.refAddComment.current.setFormData({
			autor: '',
			content: '',
			parentId: 0,
			articleId: this.state.id
		})
	}

	cancelAddForm = () => {
		this.setState({
			showAddForm: false
		})
	}

	saveAddForm = (formData) => {
		myHelper.Axios.post('addcomment', myHelper.getFormData(formData))
			.then(response => {
				if (response.data.errors) {
					this.setErrors(response.data.errors)
				} else {
					var comments = this.state.comments
					comments.push(response.data)
					this.setState({
						comments: comments,
						showAddForm: false
					})
				}
			})
	}

	removeFromList = (index) => {
		var comments = this.state.comments
		delete comments[index]
		this.setState({
			comments: comments
		})
	}

	render() {
		return (
			<div className="container">
				<Account isLogin={this.state.isLogin} setIsLogin={this.setIsLogin} setToken={this.setToken} setLogin={this.setLogin} setErrors={this.setErrors}/>
				<div className="article" id={'article_'+this.state.id}>
					<h1 className="title">{this.state.title}</h1>
					<div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
					<div className="article_info">
						<span className="autor">Autor: {this.state.autor}</span>
						<span className="cdate">Pridaný: {this.state.cdate}</span>
					</div>
				</div>

				<div className="comments">
					{this.state.comments.map((comment, index) => {
						return (
							<Comment key={comment.id} comment={comment} index={index} isLogin={this.state.isLogin} setIsLogin={this.setIsLogin} setErrors={this.setErrors} setComment={this.setComment} login={this.state.login} token={this.state.token} removeFromList={this.removeFromList} />
						)
					})}
					<span className="add_comment_button" onClick={this.showAddCommentForm} >Pridať komentár</span>
					<AddComment ref={this.refAddComment} showAddForm={this.state.showAddForm} cancelAddForm={this.cancelAddForm} saveFormData={this.saveAddForm} />
				</div>

				<div className="errors">
					{this.state.errors.map((error, index) => {
						return (
							<span className="error" key={index}>{error}</span>
						)
					})}
				</div>
			</div>
		)
	}
}

export default HyperiaApp