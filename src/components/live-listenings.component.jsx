import ContainerDefault from "../layout/container-default.layout";
import LiveListening from "./live-listening.component";
import Countdown from "./countdown.component";
import { useEffect, useState } from "react";

const LiveListenings = () => {

    const [array, setArray] = useState([])
    useEffect(() => {
        for (let i = 1; i <= 1000; i++) {
          setTimeout(() => setArray((prevState) => [...prevState, i]), 1050 * i);
        }
      }, []);

    return (
        <div className="position-fixed w-100 bottom-0 h-xs-40 bg-dark-overlay-header">
            <ContainerDefault containerSpecificStyle={'position-relative h-inherit d-flex-column j-c-end'}>
                <div className="position-relative d-flex-column grow-1">
                    {array.map((song, key) => {
                        return <LiveListening key={key} />
                    })}
                </div>
                <Countdown />
            </ContainerDefault>
        </div>
    )
}

export default LiveListenings;