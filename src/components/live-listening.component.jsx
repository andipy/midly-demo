import { useEffect, useState } from 'react'
import IconMusic from '../images/icons/icon-music.svg'

const LiveListening = ({ songName }) => {

    const songs = ["3uphon", "Dimmi Che C'è (feat. Tedua)", "s!ri (feat. Lazza & Sfera Ebbasta)", "fuck 3x", "URAGANO DAMN", "!ly (feat. Coez)", "ch1 5ei te", "Offline (feat. bbno$)", "come fa1", "2ollipop", "scuol4", "5olo", "6itch remix - feat. Nitro", "blun7 a swishland", "m8nstar", "_bilico_", "okk@pp@", "mar+e", "come t! vorre!", "molecole (interlude)", "w()ah"]
    const [currentSong, setCurrentSong] = useState('')
    useEffect(() => {
        setCurrentSong(songs[Math.floor(Math.random() * songs.length)])
        
    }, [])

    const [deg, setDeg] = useState()
    useEffect(() => {
        setDeg(Math.floor(Math.random() * 360))
    }, [])

    return (
        <div className="d-flex-row align-items-center gap-0_5em position-absolute live-listening">
            <img className='avatar-28 border-radius-100 bg-white-transp25' style={{ transform: `rotate(${deg}deg)` }} src={IconMusic} />
            <p className="fsize-xs-2">{currentSong}</p>
        </div>
    )
}

export default LiveListening;