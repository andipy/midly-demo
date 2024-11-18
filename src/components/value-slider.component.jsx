import { useState } from "react";

const ValueSlider = ({ max, onValueChange }) => {
    const [value, setValue] = useState(0)
    const min = 0
    const step = 1

    const handleChange = (event) => {
        setValue(event.target.value)
        if (onValueChange) {
            onValueChange(event.target.value)
        }
    }

    return (
        <div className="d-flex-column align-items-center mt-xs-6 mb-xs-6">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="custom-slider"
            />
        </div>
    )
}

export default ValueSlider