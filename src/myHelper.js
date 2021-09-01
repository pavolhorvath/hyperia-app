import axios from "axios"

var myHelper = {
	Axios: null,
	getFormData: null
}

myHelper.Axios = axios.create({
	baseURL: 'http://hyperia.test/',
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})

myHelper.getFormData = function (object) {
	var formData = new FormData();

	for ( var key in object ) {
		formData.append(key, object[key])
	}

	return formData
}

export default myHelper