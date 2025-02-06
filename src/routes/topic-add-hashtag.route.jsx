import { useEffect, useRef, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import NavbarCommentsModal from "../components/navbar-comments-modal.component"
import IconEdit from '../images/icons/icon-edit.svg'
import IconPlus from '../images/icons/icon-plus-lime.svg'
import Container from "../layout/container.layout"
import FullPageCenter from "../layout/full-page-center.layout"
import Button from "../components/button.component"
import IconOk from '../images/icons/icon-ok.svg'
import NavbarCloseTransparent from "../components/navbar-close-transparent.component"


const TopicAddHashtagRoute= () => {

    //VAR
    const [hashtags, setHashtags] = useOutletContext()
    const navigate = useNavigate()

    const [tag, setTag] = useState()
    const handleTag = (e) => {
        e.preventDefault()
        setTag(e.target.value)
    }

    const updateHashtags = () => {
        setHashtags([...hashtags, tag])
        navigate(-1)
    }

    return (
        <FullScreenModalLayout background='bg-black'>
            <NavbarCloseTransparent closeModal={() => navigate(-1)}/>
            <Container>
                <input
                    className='bg-dark-soft white fsize-xs-2 f-w-500 border-radius-02 mt-xs-4'
                    type='text'
                    placeholder={`${'Hashtag'}`}
                    value={tag}
                    onChange={(e) => handleTag(e)}
                />

            </Container>
            
            <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
                <Container>
                    <Button
                        disabled={false}
                        style={`${'bg-acid-lime dark-900'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        onClick={updateHashtags} 
                        label='Salva'
                    >
                    </Button>
                </Container>
            </div>

        </FullScreenModalLayout>
    )
}

export default TopicAddHashtagRoute