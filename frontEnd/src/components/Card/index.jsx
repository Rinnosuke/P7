import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import ThumbsUp from '../../assets/thumbs-up-solid.svg'
import ThumbsDown from '../../assets/thumbs-down-solid.svg'

const CardContent = styled.span`
  font-size: 22px;
  color: ${colors.tertiary};
`

const CardTitle = styled.h2`
  color: ${colors.primary};
  font-size: 22px;
  align-self: center;
  margin: 5px;
`

const CardImage = styled.img`
  width: 100%
  align-self: center;
`

const CardWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  margin: 10px;
  border: 5px solid black;
  width: 600px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`
const ButtonContainer = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 1px;
`

const StyledImg = styled.img`
  width: 20px;
  margin-left: 3px;
`
const GreenImg = styled.img`
  width: 20px;
  margin-left: 3px;
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
`

const RedImg = styled.img`
  width: 20px;
  margin-left: 3px;
  filter: invert(12%) sepia(70%) saturate(5863%) hue-rotate(357deg) brightness(117%) contrast(118%);
`
//Notre élément Card prend un post en prop pour pouvoir l'afficher
function Card({ post }) {
  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

  const [liked, setLiked] = useState(post.usersLiked.includes(connexionInfo.userId))
  const [disliked, setDisliked] = useState(post.usersDisliked.includes(connexionInfo.userId))
  const [postLikes, setPostLikes] = useState(post.likes)
  const [postDislikes, setPostDislikes] = useState(post.dislikes)

//Fonction qui envoie au serveur si nous avons like/dislike un post
  async function postLike(like) {
        try {
          const likeInfo = {
            userId : connexionInfo.userId,
            like : like}
            
            const response = await fetch(`http://localhost:8000/api/forum/${post._id}/like`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ connexionInfo.token
                },
                body: JSON.stringify(likeInfo)
                })
            const data = await response.json()
            console.log(data)
          } catch (err) {
            console.log(err)
          } 
  }

//Fonction quand on appuis sur le bouton like
  function like(e) {
    e.preventDefault()
    e.nativeEvent.stopPropagation()
//On regarde si on doit rajouter ou enlever un like
    !liked ? postLike(1) : postLike(0)
//On change les informations de la page
    !liked ? setPostLikes(postLikes + 1): setPostLikes(postLikes - 1)
    setLiked(!liked)
  }
//Même chose que au dessus mais pour le bouton dislike
  function dislike(e) {
    e.preventDefault()
    e.nativeEvent.stopPropagation()
    !disliked ? postLike(-1) : postLike(0)
    !disliked ? setPostDislikes(postDislikes + 1): setPostDislikes(postDislikes - 1)
    setDisliked(!disliked)
  }
  return (
    <CardWrapper>
{/*On regarde le prop pour savoir ce qu'on affiche*/}
      <CardTitle>{post.title}</CardTitle>
      <CardImage src={post.imageUrl} alt={post.title} />
      <CardContent>{post.content}</CardContent>
      <ButtonContainer>
{/*On regarde si le prop est liker/disliker pour l'affichage des boutons coreespondants*/}
        <StyledButton onClick={like}>{postLikes}  {liked? <GreenImg src={ThumbsUp} /> : <StyledImg src={ThumbsUp} />}</StyledButton>
        <StyledButton onClick={dislike}>{postDislikes}  {disliked? <RedImg src={ThumbsDown} /> : <StyledImg src={ThumbsDown} />}</StyledButton>
      </ButtonContainer>
    </CardWrapper>
  )
}

export default Card
