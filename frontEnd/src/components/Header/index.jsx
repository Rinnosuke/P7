import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import GroupManiaLogo from '../../assets/logo.png'
import { useContext, useState } from 'react'
import { ConnexionInfoContext } from '../../utils/context'

const HomeLogo = styled.img`
  height: 100px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

  function deconnexion() {
    saveConnexionInfo()
  }
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={GroupManiaLogo} />
      </Link>
      {!connexionInfo ? (
        <div>
          <StyledLink to="/">Se connecter</StyledLink>
          <StyledLink to="/inscription">S'inscrire</StyledLink>
        </div>
      ) :
      (<StyledLink to="/" onClick={deconnexion}>Se déconnecter</StyledLink>)}
    </NavContainer>
  )
}

export default Header
