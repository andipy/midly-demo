import { useEffect, useState, useContext } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { FansContext } from "../contexts/fans.context"
import useFanclub from "../utils/get-fanclub.hooks"
import Container from "../layout/container.layout"
import PostFanLetter from "../components/post-fan-letter.component"
import Button from "../components/button.component"
const FanclubLettersRoute = () => {
    const {context} = useOutletContext()
    const navigate = useNavigate()
    const fanclub = useFanclub(context?.id)
    const {fans} = useContext(FansContext)
    const [posts, setPosts] = useState()
    useEffect(() => {
        if (fanclub) {
            setPosts(fanclub.fanLetters)
        }
    }, [fanclub])
    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.fanLetters.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])
  return (
    <>
        {
            empty &&
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Sii il primo a postare un messaggio per {context?.artistName} direttamente nel suo fanclub.</p>
                    <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Posta un messaggio' onClick={''} />
                </div>
            </div>
            
        }
        <Container style={'pb-xs-2 mt-xs-2'}>
            <div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
                <div className="d-flex-column j-c-start align-items-start">
                {posts?.filter((_, index) => index % 2 === 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} /> 
                    )
                })}
                </div>
                <div className="d-flex-column j-c-start align-items-end">
                {posts?.filter((_, index) => index % 2 !== 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} /> 
                    )
                })}
                </div>

            </div>
        
        </Container>
    </>
  )
}

export default FanclubLettersRoute