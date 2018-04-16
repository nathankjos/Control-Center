import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = function() {
	return localStorage.getItem('token')
}
httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}
httpClient.getCurrentUser = function() {
	const token = this.getToken()
	if(token) return jwtDecode(token)
	return null
}
httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}
httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}
httpClient.updateUser = function(id, userInfo) {
	return this({ method: 'patch', url: `/api/users/${id}`, data: userInfo})
}
httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}

httpClient.getCategories = function(){
	return this({ method: 'get', url: '/api/categories'})
}
httpClient.getCategory = function(id){
	return this({ method: 'get', url: `/api/categories/${id}`})
}
httpClient.createCategory = function(categoryFields){
	return this({ method:'post', url:'/api/categories', data: categoryFields })
}
httpClient.addCategoryToNav = function(category) {
	return this({ method: 'patch', url: `/api/categories/${category}`})
}
httpClient.updateNavBarLinks = function(categories) {
	return this({ method: 'patch', url: `/api/categories`, data: categories})
}
httpClient.deleteCategory = function(id) {
	return this({ method: 'delete', url: `/api/categories/${id}`})
}
httpClient.updateCategory = function(id, newName) {
	return this({ method: 'patch', url: `/api/categories`, data: newName})
}
httpClient.saveToDoList = function(item, id) {
	return this({ method: 'post', url: `/api/categories/${id}`, data: item})
}
httpClient.saveNotes = function(note, id) {
	return this({ method: 'post', url: `/api/categories/${id}`, data: note})
}
httpClient.saveLinks = function(link, id) {
	return this({ method: 'post', url: `/api/categories/${id}`, data: link})
}

httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient