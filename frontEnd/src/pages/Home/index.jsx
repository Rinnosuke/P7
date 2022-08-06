import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext} from 'react'
import { useInput } from '../../utils/hooks'
import { ConnexionInfoContext } from '../../utils/context'
import { Link, useNavigate } from 'react-router-dom'


const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 0 40px;
`


const HomeContainer = styled.div`
  margin: 30px;
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  align-items: center;
`


const StyledTitle = styled.h2`
  line-height: 40px;
  max-width: 500px;
  text-align: center;
  color: ${colors.tertiary};
`

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
`

const StyledInput = styled.input`
width: 700px;
margin-bottom: 10px;
color: ${colors.tertiary};
`

const StyledButtonInput = styled.input`
width: 100px;
color: ${colors.tertiary};
background-color: ${colors.secondary};
font-size: 18px;
&:hover{
  filter: brightness(95%);
  box-shadow: 2px 2px 5px ${colors.tertiary};
}
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
        <StyledForm onSubmit={connection}>
            <StyledInput
                placeholder='Email'
                onChange={setEmailValue}
                value={emailValue}
            />
            <StyledInput
                placeholder='Mot de passe'
                onChange={setPasswordValue}
                value={asterix()}
            />
            <StyledButtonInput 
                type='submit'
                value='Connexion'
            />
        </StyledForm>
      </HomeContainer>) : (
      <Link to="/forum">
        Forum
      </Link>)
    }
    </HomeWrapper>
  )
}

export default Home
