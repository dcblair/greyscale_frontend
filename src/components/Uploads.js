import React, { useState, useEffect } from 'react';
import UploadModel from '../models/upload';

const Uploads = () => {
  const [Upload, setUpload] = useState([])


  useEffect(() => {
    UploadModel.all()
    .then(data => {
      setUpload(data.Uploads[Math.floor(Math.random() * data.uploads.length)])})
  }, [])

  return (
    <div>
      {Upload.body}
    </div>
  )
}

export default Uploads