import React, { useState, createContext } from 'react'


export const ConnexionInfoContext = createContext()

export const ConnexionInfoProvider = ({ children }) => {
  const [connexionInfo, setConnexionInfo] = useState()

  const saveConnexionInfo = (data) => {
    setConnexionInfo (data ? 
      ( data.admin ? {token : data.token, userId : data.userId, admin : true} : {token : data.token, userId : data.userId}) 
        : null )
  }

  return (
    <ConnexionInfoContext.Provider value={{ connexionInfo, saveConnexionInfo }}>
      {children}
    </ConnexionInfoContext.Provider>
  )
}