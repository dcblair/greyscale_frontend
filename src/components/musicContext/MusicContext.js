import React, { createContext,
              useEffect,
              useRef,
              useState
            } from "react";
import UploadModel from "../../models/upload";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const Ref = useRef();

  const [number, setNumber] = useState(0);
  const [upload, setUpload] = useState('');
  const [uploads, setUploads] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    UploadModel.index()
      .then(data => {
        setUploads(data.uploads)
      })
  }, [number])


  const musicContext = {
    upload,
    setUpload,
    uploads,
    setUploads,
    number,
    setNumber,
    isPaused,
    setIsPaused
  }

  return <Context.Provider value={ musicContext }>{children}</Context.Provider>;
}

export const { Consumer } = Context;