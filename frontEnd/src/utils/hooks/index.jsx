import { useState, useEffect, useContext } from 'react'
import { ConnexionInfoContext } from '../context'

//Hook pour récupérer des données dans la base de donnée
export function useFetch(url) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

  useEffect(() => {
    if (!url) return
    setLoading(true)
//On fais notre requète avec le token nécessaire
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ connexionInfo.token
          }
          })
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
//On renvoie la promesse de nos données et deux states pour savoir quand on aura fini ou si il y eu une erreur
  return { isLoading, data, error }
}

//Hook pour sauvegarder des imputs
export function useInput() {
  const [inputValue, setInputValue] = useState('')
  
	function handleInput(e) {
		setInputValue(e.target.value)
	}
  return [ inputValue, handleInput ]
}