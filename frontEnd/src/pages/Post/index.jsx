import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import { useParams, useNavigate } from 'react-router-dom'

const Styledform = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
width: 600px;
`

const StyledTextarea = styled.textarea`
height: 150px;
`

const StyledImg = styled.img`
height: 150px;
width: 150px;
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
            {!modification ? 
            <div>
            <StyledImg src={post.imageUrl} alt={post.title} />
            <div>{post.title}</div>
            <div>{post.content}</div>
            {post.userId == connexionInfo.userId || connexionInfo.admin? (
                <div>
            <button onClick={modify}> Modifier</button>
            <button onClick={deletePost}> Suprimer</button>
            </div>) : null}
            </div> :
            <Styledform onSubmit={modifyPost}>
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
                <input 
                    type='submit'
                    value='modifier votre post'
                />
            </Styledform> }
        </div>
    )
}

export default Post