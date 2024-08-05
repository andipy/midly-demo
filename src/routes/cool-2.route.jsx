// import "../cool.css"
import { useState } from "react"

const Cool2Route = () => {
    
    // const [rotation, setRotation] = useState(1)
    // const handleRotation = () => {
    //     setRotation(prev => {
    //         if ( prev < 4 ) {
    //             return prev + 1
    //         } else {
    //             return 1
    //         }
    //     })
    // }

    return (
        <>
        <section className="banner">
            <div className={`manual-slider`} style={{ '--quantity': 4 }}>
                <div className="item" style={{ '--position': 1 }}>
                    <div className="card">
                        {/* <h4>ASCOLTI SUL CATAGOLO</h4> */}
                        <h3>MY NAME IS GUY</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 2 }}>
                    <div className="card">
                        {/* <h4>ASCOLTI SUL BRANO</h4> */}
                        <h3>I LANDED ON EARTH AND I'M HERE TO STAY</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 3 }}>
                    <div className="card">
                        {/* <h4>UTENTI MIDLY CHE HANNO FATTO TALI ASCOLTI</h4> */}
                        <h3>MY ROMAN EMPIRE IS I DRIP AS FUK</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 4 }}>
                    <div className="card">
                        {/* <h4>MEDIA ASCOLTI / UTENTI</h4> */}
                        <h3>MY COLLECTION WAS SENT FROM THE SPACE, IT'S ABOUT TO LAND</h3>
                    </div>
                </div>
            </div>
            {/* <button onClick={handleRotation}>Ruota</button> */}

            <div className="content">
                {/* <div className="heading">
                    <h2 data-content='REPORT'>REPORT</h2>
                    <h3 data-content='CLASSIFICA FLASH'>CLASSIFICA FLASH</h3>
                </div> */}
                <h1 data-content='MIDLY'>MIDLY</h1>
                
                <div className="model"></div>
            </div>
            
        </section>

        <section className="section-2">
            <p className="paragprah">
            The Collection, released on Opensea, consists of 111 Fashion and Music-inspired 1/1 NFTS, rendered in 3D with a particular attention to detail.
            To underline the inclusive aspect of the Community, it has been designed to be as various as possible, to allow every holder to choose the version of GUY that better reflects their style.
            The Collection has caught the attention of many artist that have shown their support for the project and what it stands for.
            </p>
        </section>
        
        </>
    )
}

export default Cool2Route