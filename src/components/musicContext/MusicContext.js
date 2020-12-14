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
  const [number, setNumber] = useState(15);
  const [upload, setUpload] = useState('');
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() =>{
    UploadModel.show(number)
      .then(data => setUpload(data.upload))
  }, [number])


  const musicContext = {
    upload,
    setUpload,
    number,
    setNumber,
    isPaused,
    setIsPaused
  }

  return <Context.Provider value={ musicContext }>{children}</Context.Provider>;
}

export const { Consumer } = Context;