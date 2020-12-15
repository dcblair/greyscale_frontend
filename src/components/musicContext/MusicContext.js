import React, { createContext,
              useContext,
              useEffect,
              useState
            } from "react";
import { UserContext } from '../userContext';
import UploadModel from "../../models/upload";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const { currentUser, setUser } = useContext(UserContext);
  const [number, setNumber] = useState(0);
  const [upload, setUpload] = useState('');
  const [uploads, setUploads] = useState();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    UploadModel.index()
      .then(data => setUploads(data.uploads))
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