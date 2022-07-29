import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useInput } from '../../utils/hooks'
import { useState, useContext } from 'react'
import { ConnexionInfoContext } from '../../utils/context'

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
    const [creation, setCreation] = useState(false)
    const [titleValue, setTitleValue] = useInput()
    const [contentValue, setContentValue] = useInput()
    const [imgUrl, setImgUrl] = useState()
    const [img, setImg] = useState()
    const {connexionInfo, saveConnexionInfo} = useContext(ConnexionInfoContext)

    const onImageChange = (e) => {
      const [file] = e.target.files
      setImg(file)
      setImgUrl(URL.createObjectURL(file))
    };

    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/api/forum/`
        )
        const postsList = data

        if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    function create(){
        setCreation(true)
    }

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
                !data.error && console.log(data)
            } catch (err) {
                console.log(err)
            } 
            }
            fetchData()
    }
    
      return (
        <div>
          <CardsContainer>
            {!creation ? 
            <button onClick={create}> Créez un nouveau post</button> :
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
                    value='Créez un nouveau post'
                />
            </Styledform>
            }
            
           
          </CardsContainer>
          {isLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <CardsContainer>
              {postsList.map((post, index) => (
                <Card
                  key={`${post.name}-${index}`}
                  title={post.title}
                  content={post.content}
                  picture={post.imageUrl}
                />
              ))}
            </CardsContainer>
          )}
        </div>
      )
}

export default Forum