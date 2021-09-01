import React from "react"

class AddComment extends React.Component
{
	state = {
		formData: {
			autor: '',
			content: '',
			parentId: 0,
			articleId: 0
		},
	}

	setFormData = (formData) => (
		this.setState({
			formData: formData
		})
	)

	valueChange = (e) => {
		var formData = this.state.formData
		formData[ e.target.name ] = e.target.value
		this.setState({
			formData: formData
		})
	}

	saveClick = () => {
		this.props.saveFormData(this.state.formData)
	}

	render() {
		return (
			<div className="add_comment_form" hidden={!this.props.showAddForm}>
				<div className="form_row">
					<label>Autor:</label>
					<input type="text" name="autor" value={this.state.formData.autor} onChange={this.valueChange} />
				</div>
				<div className="form_row">
					<label>Komentár:</label>
					<input type="text" name="content" value={this.state.formData.content} onChange={this.valueChange} />
				</div>
				<div className="form_buttons">
					<span className="save_button" onClick={this.saveClick}>Uložiť</span>
					<span className="cancel_button" onClick={this.props.cancelAddForm}>Zrušiť</span>
				</div>
			</div>
		);
	}
}

export default AddComment