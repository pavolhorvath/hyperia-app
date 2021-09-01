import React from "react"
import myHelper from "../myHelper"
import AddComment from "./AddComment";
import UpdateComment from "./UpdateComment";

class Comment extends React.Component
{
	state = {
		showAddForm: false,
		updateForm: false
	}

	constructor() {
		super();
		this.refAddComment = React.createRef()
	}

	setComment = (comment, index) => {
		var thisComment = this.props.comment
		thisComment.childs[index] = comment
		this.props.setComment(thisComment, this.props.index)
	}

	addPositive = () => {
		var formData = myHelper.getFormData({commentId: this.props.comment.id})
		myHelper.Axios.post('addpositive', formData)
			.then(response => {
				if (response.data.errors) {
					this.props.setErrors(response.data.errors)
				} else {
					this.props.setComment(response.data, this.props.index)
				}
			})
	}

	addNegative = () => {
		var formData = myHelper.getFormData({commentId: this.props.comment.id})
		myHelper.Axios.post('addnegative', formData)
			.then(response => {
				if (response.data.errors) {
					this.props.setErrors(response.data.errors)
				} else {
					this.props.setComment(response.data, this.props.index)
				}
			})
	}

	showAddCommentForm = () => {
		this.setState({
			showAddForm: true
		})
		this.refAddComment.current.setFormData({
			autor: '',
			content: '',
			parentId: this.props.comment.id,
			articleId: this.props.comment.articleId
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
					this.props.setErrors(response.data.errors)
				} else {
					var thisComment = this.props.comment
					thisComment.childs.push(response.data)
					this.props.setComment(thisComment, this.props.index)
					this.setState({
						showAddForm: false
					})
				}
			})
	}

	deleteComment = () => {
		if ( window.confirm("Naozaj chcete zmazať komentár?") ) {
			var formData = myHelper.getFormData({
				id: this.props.comment.id,
				login: this.props.login,
				'Login-Token': this.props.token
			})
			myHelper.Axios.post('deletecomment', formData)
				.then(response => {
					if (response.data.errors) {
						this.props.setErrors(response.data.errors)
					} else {
						this.props.removeFromList(this.props.index)
					}
				})
		}
	}

	removeFromList = (index) => {
		var thisComment = this.props.comment
		delete thisComment.childs[index]
		this.props.setComment(thisComment, this.props.index)
	}

	showUpdateCommentForm = () => {
		var updateCommentForm = (
			<UpdateComment
				id={this.props.comment.id}
				autor={this.props.comment.autor}
				content={this.props.comment.content}
				positive={this.props.comment.positive}
				negative={this.props.comment.negative}
				parentId={this.props.comment.parentId}
				articleId={this.props.comment.articleId}
				saveFormData={this.saveUpdateForm}
				cancelUpdateForm={this.cancelUpdateForm}
			/>
		)
		this.setState({
			updateForm: updateCommentForm
		})
	}

	saveUpdateForm = (formData) => {
		console.log(formData)
		formData['login'] = this.props.login
		formData['Login-Token'] = this.props.token
		myHelper.Axios.post('updatecomment', myHelper.getFormData(formData))
			.then(response => {
				if (response.data.errors) {
					this.props.setErrors(response.data.errors)
				} else {
					this.props.setComment(response.data, this.props.index)
					this.cancelUpdateForm()
				}
			})
			.catch(error => {
				this.props.setIsLogin(false)
				this.props.setErrors(["Boli ste odhlásený z dôvodu nečinnosti."])
				this.cancelUpdateForm()
			});
	}

	cancelUpdateForm = () => {
		this.setState({
			updateForm: null
		})
	}

	render() {
		var adminActions = null;
		if (this.props.isLogin) {
			adminActions = (
				<div className="admin_actions">
					<span className="update_button" onClick={this.showUpdateCommentForm}>Upraviť</span>
					<span className="delete_button" onClick={this.deleteComment}>Zmazať</span>
				</div>
			)
		}

		return (
			<div className="comment">
				<div className="content">{this.props.comment.content}</div>
				<div className="comment_info">
					<span className="autor">Autor: {this.props.comment.autor}</span>
					<span className="cdate">Dátum: {this.props.comment.cdate}</span>
					<span className="positive" onClick={this.addPositive}>{this.props.comment.positive}</span>
					<span className="negative" onClick={this.addNegative}>{this.props.comment.negative}</span>
					<span className="react_button" onClick={this.showAddCommentForm}>Reagovať</span>
					{adminActions}
					{this.state.updateForm}
					<div className="childs">
						{this.props.comment.childs.map((child, index) => {
							return (
								<Comment key={child.id} index={index} comment={child} isLogin={this.props.isLogin} setIsLogin={this.props.setIsLogin} setErrors={this.props.setErrors} setComment={this.setComment} login={this.props.login} token={this.props.token} removeFromList={this.removeFromList} />
							)
						})}
					</div>
					<AddComment ref={this.refAddComment} showAddForm={this.state.showAddForm} cancelAddForm={this.cancelAddForm} saveFormData={this.saveAddForm} />
				</div>
			</div>
		)
	}
}

export default Comment