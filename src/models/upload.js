
class UploadModel {
  // show all entries
  static all = () => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry`).then(res => res.json())
  }

  // show entry
  static show = (entryId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry/${entryId}`).then(res => res.json())
  }
  
  // show user entries
  static user = (userId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry/user/${userId}`).then(res => res.json())
  }
  
  // create an entry
  static create = (entryData) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryData)
    }).then(res => res.json())
  }

// update an entry
  static update = (entry, entryId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry/${entryId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(res => res.json())
  }

  // delete an entry
  static delete = (entry, entryId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/entry/${entryId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(res => res.json())
  }
}


export default UploadModel;