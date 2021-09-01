import React from "react"
import myHelper from "../myHelper"

class Account extends React.Component
{
	state = {
		login: '',
		password: ''
	}

	handleLoginChange = (e) => {
		this.setState({
			login: e.target.value
		})
	}

	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	handleLoginClick = () => {
		var formData = myHelper.getFormData({
			login: this.state.login,
			password: this.state.password
		})
		myHelper.Axios.post('login', formData)
			.then(response => {
				if (response.data.errors) {
					this.props.setErrors(response.data.errors)
					this.setState({
						password: ''
					})
				} else {
					this.props.setToken(response.data.token)
					this.props.setLogin(this.state.login)
					this.props.setIsLogin(true)
					this.setState({
						login: '',
						password: ''
					})
				}
			})
	}

	handleLogoutClick = () => {
		this.props.setIsLogin(false)
	}

	render() {
		return (
			<div className="account_container">
				<div className="login_container" hidden={this.props.isLogin}>
					<span className="login">
						Prihlasovacie meno:
						<input type="text" name="login" value={this.state.login} onChange={this.handleLoginChange} />
					</span>
					<span className="password">
						Prihlasovacie meno:
						<input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
					</span>
					<span className="login_btn" onClick={this.handleLoginClick}>Prihlásiť</span>
				</div>

				<div className="logout_container" hidden={!this.props.isLogin}>
					<span className="logout_btn" onClick={this.handleLogoutClick}>Odhlásiť</span>
				</div>
			</div>
		)
	}
}

export default Account