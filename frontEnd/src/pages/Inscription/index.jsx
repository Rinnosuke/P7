import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useInput } from '../../utils/hooks'
import { useNavigate } from 'react-router-dom'

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

    function asterix() {
        return passwordValue.replaceAll(/\w/g, ('*'))
    }

  return (
    <HomeWrapper>
      <HomeContainer>
        <StyledTitle>
          Rentrez votre adresse Email et choisissez un mot de passe pour vous inscrire.
        </StyledTitle>
        <Styledform onSubmit={inscription}>
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
                    value='Créez votre compte'
                />
        </Styledform>
      </HomeContainer>
    </HomeWrapper>
  )
}

export default Inscription