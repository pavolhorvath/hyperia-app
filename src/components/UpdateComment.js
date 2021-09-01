import React from "react"

class UpdateComment extends React.Component
{
	state = {
		formData: {
			id: this.props.id,
			autor: this.props.autor,
			content: this.props.content,
			positive: this.props.positive,
			negative: this.props.negative,
			parentId: this.props.parentId,
			articleId: this.props.articleId
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
			<div className="update_comment_form">
				<div className="form_row">
					<label>Autor:</label>
					<input type="text" name="autor" value={this.state.formData.autor} onChange={this.valueChange} />
				</div>
				<div className="form_row">
					<label>Komentár:</label>
					<input type="text" name="content" value={this.state.formData.content} onChange={this.valueChange} />
				</div>
				<div className="form_row">
					<label>Počet pozitívnych reakcií:</label>
					<input type="number" min="0" name="positive" value={this.state.formData.positive} onChange={this.valueChange} />
				</div>
				<div className="form_row">
					<label>Počet negatívnych reakcií:</label>
					<input type="number" min="0" name="negative" value={this.state.formData.negative} onChange={this.valueChange} />
				</div>
				<div className="form_buttons">
					<span className="save_button" onClick={this.saveClick}>Uložiť</span>
					<span className="cancel_button" onClick={this.props.cancelUpdateForm}>Zrušiť</span>
				</div>
			</div>
		);
	}
}

export default UpdateComment