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
function Creation(){
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

    function post(e) {
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
              
              const response = await fetch(`http://localhost:8000/api/forum/`, {
                  method: "POST",
                  headers: {
                  'Authorization': 'Bearer '+ connexionInfo.token
                  },
                  body: postInfo
                  })
              const data = await response.json()
              !data.error && navigate("/forum")
            } catch (err) {
              console.log(err)
            } 
          }
          fetchData()
    }
    
      return (
            <Styledform onSubmit={post}>
                <input
                    placeholder='Titre'
                    onChange={setTitleValue}
                    value={titleValue}
                />
                <StyledTextarea
                    placeholder='Contenu'
                    onChange={setContentValue}
                    value={contentValue}
                />
                <input
                    type='file'
                    onChange={onImageChange}
                />
                <img src={imgUrl} alt="" />
                <input 
                    type='submit'
                    value='Créer un nouveau post'
                />
            </Styledform>
      )
}

export default Creation