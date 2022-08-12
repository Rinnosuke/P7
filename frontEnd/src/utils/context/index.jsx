import React, { useState, createContext } from 'react'

//On crée un context pour sauvegarder nos informations de connection
export const ConnexionInfoContext = createContext()

//On crée un provider pour fournir facilement les informations de connection à tout nos éléments
export const ConnexionInfoProvider = ({ children }) => {
  const [connexionInfo, setConnexionInfo] = useState()

//Fonction pour sauvegarder ou supprimer les informations de connection
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