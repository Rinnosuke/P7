import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useInput } from '../../utils/hooks'
import { useNavigate} from 'react-router-dom'
import { useState } from 'react'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 0 40px;
  @media only screen and (max-width: 768px){
    margin: 20px;
  }
`


const HomeContainer = styled.div`
  margin: 30px;
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  @media only screen and (max-width: 768px){
    margin: 0px;
  }
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
width: 500px;
margin-bottom: 10px;
color: ${colors.tertiary};
@media only screen and (max-width: 768px){
  width: 300px;
}
@media only screen and (min-width: 1080px){
  width: 800px;
}
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

const ErrorMessage = styled.p`
color: red;
`

function Inscription(){
    const [emailValue, setEmailValue] = useInput()
    const [passwordValue, setPasswordValue] = useInput()
    const navigate = useNavigate()
    const [errorEmailDuplicate, seterrorEmailDuplicate] = useState(false)

    async function inscription(e) {
        e.preventDefault()
        seterrorEmailDuplicate(false)
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
                if(response.status === 403) {seterrorEmailDuplicate(true)}
            const data = await response.json()
            !data.error && navigate("/")
            
        } catch (err) {
            console.log(err)
            //if(response.status === 403) {console.log('test')}
        }
    }
    
  return (
    <HomeWrapper>
      <HomeContainer>
        <StyledTitle>
          Rentrez votre adresse Email et choisissez un mot de passe pour vous inscrire.
        </StyledTitle>
        <StyledForm onSubmit={inscription}>
        {errorEmailDuplicate ? (
          <ErrorMessage>Erreur : Adresse Email déjà utilisé</ErrorMessage>
        ) : null }
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