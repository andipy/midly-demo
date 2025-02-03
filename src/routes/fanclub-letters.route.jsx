import { useEffect, useState, useContext } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { FansContext } from "../contexts/fans.context"
import useFanclub from "../utils/get-fanclub.hooks"
import Container from "../layout/container.layout"
import PostFanLetter from "../components/post-fan-letter.component"
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
  return (
    <>
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