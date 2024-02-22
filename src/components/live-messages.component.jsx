import { useEffect, useState } from "react"

import ContainerDefault from "../layout/container-default.layout"
import LiveMessage from "./live-message.component"
import Countdown from "./countdown.component"
import Textbar from "./textbar.component"

const LiveMessages = () => {

    const [currentComment, setCurrentComment] = useState('')
    const handleCurrentComment = (e) => {
        setCurrentComment(e.target.value)
    }
    const [submittedComment, setSubmittedComment] = useState({
        type: 'COMMENT',
        content: ''
    })
    const handleSubmitComment = (e, currentComment) => {
        e.preventDefault()
        if ( currentComment ) {
            setSubmittedComment({
                type: 'COMMENT',
                content: currentComment
            })
        }
        setCurrentComment('')
        setTimeout(() => {
            setSubmittedComment({
                type: 'COMMENT',
                content: ''
            })
        }, 1050)
    }

    const [array, setArray] = useState([])
    useEffect(() => {
        for (let i = 1; i <= 100000; i++) {
          setTimeout(() => setArray((prevState) => [...prevState, i]), 1050 * i);
        }
      }, []);

    return (
        <div className="position-fixed bottom-0 w-100">
            <div className="h-xs-40 bg-dark-overlay-header">
                <ContainerDefault containerSpecificStyle={'position-relative h-inherit d-flex-column j-c-end'}>
                    <div className="position-relative d-flex-column grow-1">
                        {array.map((song, key) => {
                            return <LiveMessage key={key} handleCurrentComment={handleCurrentComment} currentComment={currentComment} setCurrentComment={setCurrentComment} handleSubmitComment={handleSubmitComment} submittedComment={submittedComment} setSubmittedComment={setSubmittedComment} array={array} />
                        })}
                    </div>
                    <Countdown />
                </ContainerDefault>
            </div>
            <Textbar handleCurrentComment={handleCurrentComment} currentComment={currentComment} setCurrentComment={setCurrentComment} handleSubmitComment={handleSubmitComment} submittedComment={submittedComment} setSubmittedComment={setSubmittedComment} />
        </div>
    )
}

export default LiveMessages;