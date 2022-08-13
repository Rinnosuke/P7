import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useFetch, useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from '../../utils/style/Atoms'
import ArrowLeft from '../../assets/arrow-left-solid.svg'

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
    background-color: white;
    padding: 10px;
    @media only screen and (max-width: 768px){
        width: 400px;
      }
`

const StyledTextarea = styled.textarea`
    height: 150px;
`

const StyledImg = styled.img`
    height: 150px;
    width: 150px;
`

const StyledButton = styled.button`
width: 120px;
margin: 10px;
color: ${colors.tertiary};
background-color: ${colors.secondary};
font-size: 18px;
&:hover{
  filter: brightness(95%);
  box-shadow: 2px 2px 5px ${colors.tertiary};
}
`
const StyledButtonInput = styled.input`
    width: 250px;
    color: ${colors.tertiary};
    background-color: ${colors.secondary};
    font-size: 18px;
    &:hover{
    filter: brightness(95%);
    box-shadow: 2px 2px 5px ${colors.tertiary};
}
`

const ArrowImg = styled.img`
  width: 25px;
  filter: invert(22%) sepia(97%) saturate(3396%) hue-rotate(3deg) brightness(102%) contrast(103%);
  position: relative;
  right: 300px;
  @media only screen and (max-width: 768px){
    right: 200px;
  }
`

function Post(){
    const { id } = useParams()
    const [modification, setModification] = useState(false)
    const [titleValue, setTitleValue] = useInput()
    const [contentValue, setContentValue] = useInput()
    const [imgUrl, setImgUrl] = useState()
    const [img, setImg] = useState()
    const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)
    const navigate = useNavigate()

//On récupère les informations du post depuis le serveur avec notre hook personalisé
    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/api/forum/${id}`
        )
    const post = data
    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

//Fonction pour se souvenir que l'utilsateur a appuyé sur le bouton modifier
    function modify() {
        setModification(true)
        setImgUrl(post.imageUrl)
    }

//Fonction pour se souvenir de l'image uploader ainsi que de son URL
    const onImageChange = (e) => {
        const [file] = e.target.files
        setImg(file)
        setImgUrl(URL.createObjectURL(file))
    }

//Fonction pour enregistrer les modifications sur le serveur
    function modifyPost(e) {
        e.preventDefault()
        async function fetchData() {
        try {
            const postInfo = new FormData()
            const postContent = {
                title : titleValue,
                content : contentValue
            }
            postInfo.append('post', JSON.stringify(postContent))
            postInfo.append('image', img)
            const response = img ? await fetch(`http://localhost:8000/api/forum/${id}`, {
                method: "PUT",
                headers: {
                'Authorization': 'Bearer '+ connexionInfo.token
                },
                body: postInfo
                }) : await fetch(`http://localhost:8000/api/forum/${id}`, {
                method: "PUT",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ connexionInfo.token
                },
                body: JSON.stringify(postContent)
                })
            const data = await response.json()
            !data.error && navigate("/forum")
            } catch (err) {
                console.log(err)
            } 
            }
            fetchData()
            setModification(false)
    }
  
    async function deletePost() {
        try {
            const response = await fetch(`http://localhost:8000/api/forum/${id}`, {
                method: "DELETE",
                headers: {
                'Authorization': 'Bearer '+ connexionInfo.token
                }
                })
            const data = await response.json()
            !data.error && navigate("/forum")
            } catch (err) {
            console.log(err)
            } 
    }

    return (
        <div>
{/*En attendant la réponse du serveur on affiche seulement notre loader*/}
        {isLoading ? (
            <LoaderWrapper>
                <Loader />
            </LoaderWrapper>
        ) : (
            <CardContainer>
                <ArrowImg src={ArrowLeft} />
                {!modification ? 
                    <div>
{/*On affiche notre post et on rajoute deux boutons pour le modifier ou le supprimer*/}
                        <Card
                            post={post}
                            />
                            {post.userId == connexionInfo.userId || connexionInfo.admin? (
                        <div>
                        <StyledButton onClick={modify}> Modifier</StyledButton>
                        <StyledButton onClick={deletePost}> Suprimer</StyledButton>
                        </div>) : null}
                    </div> :
                    <StyledForm onSubmit={modifyPost}>
{/*Si l'utilisateur veut modifier son post on lui propose un formulaire pour rentrer les nouvelles informations*/}
                        <input
                            placeholder={post.title}
                            onChange={setTitleValue}
                            value={titleValue}
                        />
                        <StyledTextarea
                            placeholder={post.content}
                            onChange={setContentValue}
                            value={contentValue}
                        />
                        <input
                            type='file'
                            onChange={onImageChange}
                        />
                        <StyledImg src={imgUrl} alt="" />
                        <StyledButtonInput 
                            type='submit'
                            value='modifier votre post'
                        />
                    </StyledForm> }
            </CardContainer>)}
        </div>
    )
}

export default Post