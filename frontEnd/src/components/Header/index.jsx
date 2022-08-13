import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import styled from 'styled-components'
import GroupManiaLogo from '../../assets/logo.png'
import { useContext} from 'react'
import { ConnexionInfoContext } from '../../utils/context'

const HomeLogo = styled.img`
  height: 100px;
  @media only screen and (max-width: 768px){
    height : 40px;
  }
`

const NavContainer = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-bottom: 20px;
`

const StyledLink = styled(Link)`
  padding: 10px 15px;
  
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  color: ${colors.primary};
  font-size: 22px;
  &:hover{
    filter: brightness(75%);
  }
`

//Notre élément Header
function Header() {
  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

  function deconnexion() {
    saveConnexionInfo()
  }
  return (
    <div>
{/*On regarde si l'utilisateur est connecté et on change les liens en conséquence*/}
      {!connexionInfo ? (
        <NavContainer>
          <Link to="/">
            <HomeLogo src={GroupManiaLogo} />
          </Link>
          <div>
            <StyledLink to="/">Se connecter</StyledLink>
            <StyledLink to="/inscription">S'inscrire</StyledLink>
          </div>
        </NavContainer>) : (
        <NavContainer>
          <Link to="/forum">
            <HomeLogo src={GroupManiaLogo} />
          </Link>
          <StyledLink to="/" onClick={deconnexion}>Se déconnecter</StyledLink>
          </NavContainer>)}
    </div>
  )
}

export default Header
