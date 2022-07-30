import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'

const CardContent = styled.span`
  color: #5843e4;
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.span`
  color: black;
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  border: 5px solid ${colors.tertiary};
  width: 600px;
  height: 300px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

function Card({ post }) {
  const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

  const [liked, setLiked] = useState(post.usersLiked.includes(connexionInfo.userId))
  const [disliked, setDisliked] = useState(post.usersDisliked.includes(connexionInfo.userId))
  const [postLikes, setPostLikes] = useState(post.likes)
  const [postDislikes, setPostDislikes] = useState(post.dislikes)

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

  function like(e) {
    e.preventDefault()
    e.nativeEvent.stopPropagation()
    !liked ? postLike(1) : postLike(0)
    !liked ? setPostLikes(postLikes + 1): setPostLikes(postLikes - 1)
    setLiked(!liked)
  }
  function dislike(e) {
    e.preventDefault()
    e.nativeEvent.stopPropagation()
    !disliked ? postLike(-1) : postLike(0)
    !disliked ? setPostDislikes(postDislikes + 1): setPostDislikes(postDislikes - 1)
    setDisliked(!disliked)
  }
  return (
    <CardWrapper>
      <CardImage src={post.imageUrl} alt={post.title} />
      <CardTitle>{post.title}</CardTitle>
      <CardContent>{post.content}</CardContent>
      <button onClick={like}>{postLikes} Likes</button>
      <button onClick={dislike}>{postDislikes} Dislikes</button>
    </CardWrapper>
    
  )
}

export default Card
