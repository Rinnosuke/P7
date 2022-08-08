import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useInput } from '../../utils/hooks'
import { useNavigate } from 'react-router-dom'

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
width: 180px;
color: ${colors.tertiary};
background-color: ${colors.secondary};
font-size: 18px;
&:hover{
  filter: brightness(95%);
  box-shadow: 2px 2px 5px ${colors.tertiary};
}
`

function Inscription(){
    const [emailValue, setEmailValue] = useInput()
    const [passwordValue, setPasswordValue] = useInput()
    const navigate = useNavigate()

    async function inscription(e) {
        e.preventDefault()
        try {
            const signupInfo = {
                email : emailValue,
                password: passwordValue}
            const response = await fetch(`http://localhost:8000/api/auth/signup`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
                })
            const data = await response.json()
            !data.error && navigate("/")
            
        } catch (err) {
            console.log(err)
        }
    }
    
  return (
    <HomeWrapper>
      <HomeContainer>
        <StyledTitle>
          Rentrez votre adresse Email et choisissez un mot de passe pour vous inscrire.
        </StyledTitle>
        <StyledForm onSubmit={inscription}>
            <StyledInput
                placeholder='Email'
                type='email'
                onChange={setEmailValue}
                value={emailValue}
            />
            <StyledInput
                placeholder='Mot de passe'
                type='password'
                onChange={setPasswordValue}
                value={passwordValue}
            />
            <StyledButtonInput 
                    type='submit'
                    value='Créer votre compte'
                />
        </StyledForm>
      </HomeContainer>
    </HomeWrapper>
  )
}

export default Inscription