class UserModel {
  static create(data) {
    return fetch("http://localhost:4000/api/v1/auth/register", {
    // return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  static login(credentials) {
    // return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/login`, {
    return fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    }).then(res => res.json())
  }

  static logout() {
    // return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/logout`, {
    return fetch("http://localhost:4000/api/v1/auth/logout", {
      method: "DELETE",
      credentials: 'include'
    })
  }
}

export default UserModel