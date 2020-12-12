class UserModel {
  static create(data) {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  static login(credentials) {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    }).then(res => res.json())
  }

  static update = (user, userId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
  }

  static logout() {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: 'include'
    })
  }
}

export default UserModel