import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useFetch, useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from '../../utils/style/Atoms'

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

function Post(){
    const { id } = useParams()
    const [modification, setModification] = useState(false)
    const [titleValue, setTitleValue] = useInput()
    const [contentValue, setContentValue] = useInput()
    const [imgUrl, setImgUrl] = useState()
    const [img, setImg] = useState()
    const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)
    const navigate = useNavigate()

    const onImageChange = (e) => {
        const [file] = e.target.files
        setImg(file)
        setImgUrl(URL.createObjectURL(file))
      };

    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/api/forum/${id}`
        )
    const post = data

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    function modify() {
        setModification(true)
        setImgUrl(post.imageUrl)
    }

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
        {isLoading ? (
            <LoaderWrapper>
                <Loader />
            </LoaderWrapper>
            ) : (
            <CardContainer>
                {!modification ? 
                    <div>
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