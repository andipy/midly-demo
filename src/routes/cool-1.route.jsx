// import "../cool.css"
import { useEffect, useState } from "react"

const Cool1Route = () => {

    const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [rotation, setRotation] = useState(0);
  const screenW = window.innerWidth;

  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(Math.floor(e.clientX / screenW * 100))
      setEndX(null);  // Reset endX when a new drag starts
    }

    const handleMouseMove = (e) => {
      if (isDragging) {
        setEndX(Math.floor(e.clientX / screenW * 100))
      }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (endX !== null && startX !== null) {
        if ( (endX - startX) > 10 ) {
            setRotation((prevRotation) => prevRotation + 90);
        } else if ( (startX - endX) > 10 ) {
            setRotation((prevRotation) => prevRotation - 90);
        }
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, endX, screenW]);

    return (
        <>
        <section className="banner">
            <div
                className="slider"
                style={
                    {
                        '--quantity': 4,
                        transform: `perspective(1000px) rotateX(-15deg) rotateY(${rotation}deg)`
                    }
                }
            >
                <div className="item" style={{ '--position': 1 }}>
                    <div className="card">
                        <h4>ASCOLTI SUL CATAGOLO</h4>
                        <h3>14'216</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 2 }}>
                    <div className="card">
                        <h4>ASCOLTI SUL BRANO</h4>
                        <h3>12'820</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 3 }}>
                    <div className="card">
                        <h4>UTENTI MIDLY CHE HANNO FATTO TALI ASCOLTI</h4>
                        <h3>2'013</h3>
                    </div>
                </div>
                <div className="item" style={{ '--position': 4 }}>
                    <div className="card">
                        <h4>MEDIA ASCOLTI / UTENTI</h4>
                        <h3>6.4</h3>
                    </div>
                </div>
            </div>
            {/* <button className='button-rotation' onClick={handleRotate}>Ruota</button> */}

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

export default Cool1Route