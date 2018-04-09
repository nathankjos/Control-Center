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

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}

httpClient.getBars = function(){
	return this({ method: 'get', url: '/api/bars'})
}

httpClient.createBar = function(barFields){
	return this({ method:'post', url:'/api/bars', data: barFields })
}

httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient