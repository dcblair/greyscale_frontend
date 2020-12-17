import React, { createContext,
              useEffect,
              useState
            } from "react";
import UploadModel from "../../models/upload";

export const Context = createContext({});

export const Provider = ({ children }) => {

  const [number, setNumber] = useState(0);
  const [upload, setUpload] = useState('');
  const [uploads, setUploads] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const [ready, setReady] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    UploadModel.index()
      .then(data => {
        setUploads(data.uploads)
      })
  }, [number, isChanged])


  const musicContext = {
    upload, setUpload,
    uploads, setUploads,
    number, setNumber,
    isPaused, setIsPaused,
    ready, setReady,
    isChanged, setIsChanged
  }

  return <Context.Provider value={ musicContext }>{ children }</Context.Provider>;
}

export const { Consumer } = Context;