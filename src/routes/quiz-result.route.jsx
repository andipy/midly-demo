import { useEffect, useState } from "react";
import ContainerDefault from "../layout/container-default.layout";

import Button from "../components/button.component";
import Navbar from "../components/navbar.component";

const QuizResultRoute = () => {

    //this variable should contain the quiz result which is returned by the specific api call
    const result = 5

    // this local state create an array with the points from 0 to the result coming from the api
    const[points, setPoints] = useState([])
    const generatePointArray = (result) => {
        let pointArray = [];
        for ( var i = 0; i <= result; i++ ) {
            pointArray.push(i)
        }
        setPoints(pointArray)        
    }
    useEffect(() => {
        generatePointArray(result)        
    }, [])


    // this block of the code takes care of the CSS animation
    const [liveCounter, setLiveCounter] = useState(0)
    const [translation, setTranslation] = useState(0)
    const [indicatorWidth, setIndicatorWidth] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if ( liveCounter < result ) {
                setLiveCounter(prev => prev + 1)
                setTranslation(prev => prev + 100)
            }
            if ( liveCounter === result ) {
                setIndicatorWidth('')
            }
        }, 500)
    }, [liveCounter])

    // this block of the code differentiates the feedback message in the screen based on the result
    const [resultTitle, setResultTitle] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    useEffect(() => {
        if ( result <= 2 ) {
            setResultTitle("That's ok")
            setResultMessage(`You can do better, but ${result} points is still something that climbs you up in the leaderboard!`)
        } else if ( result >= 3 ) {
            setResultTitle("Well done my friend!")
            setResultMessage(`${result} more points for you to climb up in this month's leaderboard`)
        }
    }, [])

    return (
        <>
        {/* <Navbar /> */}
        <ContainerDefault containerSpecificStyle={'h-100vh'}>
            <div className="d-flex-column align-items-center j-c-center h-100">
                <h3 className="t-align-center mb-xs-4 f-w-500 fsize-xs-6">{resultTitle}</h3>
                <div className={`point-indicator ${indicatorWidth}`}>
                    <p className="gold point-plus fsize-xs-5">+</p>
                    <div className="point-column" style={{transform: `translateY(-${translation}px)`, transition: 'all 400ms cubic-bezier(.75,-0.01,.01,1) 40ms'}}>                    
                        {points.map(point => {
                            return (
                                <h4 className="point-dot gold">{point}</h4>
                            )
                        } )}
                    </div>
                    <p className="gold point-plus fsize-xs-5">points</p>
                </div>
            
                <p className="t-align-center w-80 mt-xs-4">{resultMessage}</p>
            </div>

            <ContainerDefault containerSpecificStyle={'position-fixed bottom-5'}>
                <Button style={'bg-acid-lime black font-body'} label={'Close'} />
            </ContainerDefault>
        </ContainerDefault>
        </>
    )
}

export default QuizResultRoute;