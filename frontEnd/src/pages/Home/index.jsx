import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext, useState, useEffect } from 'react'
import { useInput } from '../../utils/hooks'
import { ConnexionInfoContext } from '../../utils/context'
import { Link, useNavigate } from 'react-router-dom'


const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`


const HomeContainer = styled.div`
  margin: 30px;
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
`


const StyledTitle = styled.h2`
  padding-bottom: 30px;
  line-height: 50px;
  max-width: 500px;
  text-align: center;
`

const Styledform = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
`

function Home() {
  
  const [emailValue, setEmailValue] = useInput()
  const [passwordValue, setPasswordValue] = useInput()

  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)
  const navigate = useNavigate()

  async function connection(e) {
    e.preventDefault()
    try {
        const loginInfo = {
            email : emailValue,
            password : passwordValue}
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
            })
        const data = await response.json()
        !data.error && saveConnexionInfo(data)
        !data.error && navigate("/forum")
    } catch (err) {
        console.log(err)
    } 
  }

  function asterix() {
    return passwordValue.replaceAll(/\w/g, ('*'))
  }

  return (
    <HomeWrapper>
      {!connexionInfo ? (
        <HomeContainer>
        <StyledTitle>
          Connectez vous et partagez vos expériences sur le forum de Groupmania !
        </StyledTitle>
        <Styledform onSubmit={connection}>
            <input
                placeholder='Email'
                onChange={setEmailValue}
                value={emailValue}
            />
            <input
                placeholder='Mot de passe'
                onChange={setPasswordValue}
                value={asterix()}
            />
            <input 
                type='submit'
                value='Connectez vous'
            />
        </Styledform>
      </HomeContainer>) : (
      <Link to="/forum">
        Forum
      </Link>)
    }
    </HomeWrapper>
  )
}

export default Home
