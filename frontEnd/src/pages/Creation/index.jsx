import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'
import { useNavigate } from 'react-router-dom'

const FormContainer = styled.div`
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
    border: 5px solid black;
    @media only screen and (max-width: 768px){
        width: 400px;
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

//Fonction pour se souvenir de l'image uploader ainsi que de son URL
    const onImageChange = (e) => {
      const [file] = e.target.files
      setImg(file)
      setImgUrl(URL.createObjectURL(file))
    };

//Fonction pour enregistrer le nouveau post dans le serveur
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
        <FormContainer>
{/*On r??cup??re les informations du nouveau post avec un formulaire*/}
            <StyledForm onSubmit={post}>
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
                <StyledButtonInput
                    type='submit'
                    value='Cr??er un nouveau post'
                />
            </StyledForm>
        </FormContainer>
      )
}

export default Creation