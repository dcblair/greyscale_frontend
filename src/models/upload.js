
class UploadModel {
  // show all uploads
  static all = () => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload`).then(res => res.json())
  }

  // show upload
  static show = (uploadId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload/${uploadId}`).then(res => res.json())
  }
  
  // show user uploads
  static user = (userId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload/user/${userId}`).then(res => res.json())
  }
  
  // create an upload
  static create = (uploadData) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }).then(res => res.json())
  }

// update an upload
  static update = (upload, uploadId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload/${uploadId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(upload)
    }).then(res => res.json())
  }

  // delete an upload
  static delete = (upload, uploadId) => {
    return fetch(`${process.env.REACT_APP_INTERNAL_API_URL}/upload/${uploadId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(upload)
    }).then(res => res.json())
  }
}


export default UploadModel;