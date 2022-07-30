import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import { Link, useNavigate } from 'react-router-dom'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Styledform = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
width: 600px;
`

const StyledTextarea = styled.textarea`
height: 150px;
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
          <CardsContainer>
            <Link to={`/creation`}>Créer un nouveau post</Link>
          </CardsContainer>
          {isLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <CardsContainer>
              {postsList.map((post, index) => (
                <Link to={`/post/${post._id}`} key={`${post.name}-${index}`}>
                  <Card
                    post={post}
                  />
                </Link>
              ))}
            </CardsContainer>
          )}
        </div>
      )
}

export default Forum