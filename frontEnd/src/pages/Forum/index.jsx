import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch} from '../../utils/hooks'
import { Link} from 'react-router-dom'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const StyledButton = styled.button`
color: ${colors.tertiary};
background-color: ${colors.secondary};
font-size: 25px;
padding: 20px 40px;
&:hover{
  filter: brightness(95%);
  box-shadow: 2px 2px 5px ${colors.tertiary};
}
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`


function Forum(){
    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/api/forum/`
        )
    const postsList = data

    if (error) {
    return <span>Oups il y a eu un problème</span>
    }
    return (
      <div>
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <CardsContainer>
            <StyledButton>
              <StyledLink to={`/creation`}>Créer un nouveau post</StyledLink>
            </StyledButton>
            {postsList.map((post, index) => (
              <StyledLink to={`/post/${post._id}`} key={`${post.name}-${index}`}>
                <Card
                  post={post}
                />
              </StyledLink>
            ))}
          </CardsContainer>
        )}
      </div>
    )
}

export default Forum