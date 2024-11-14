import { useState } from "react";
function ValueSlider({max, onValueChange}) {
    const [value, setValue] = useState(0);
    const min = 0
    const step = 1


    const handleChange = (event) => {
        setValue(event.target.value)
        if (onValueChange) {
            onValueChange(event.target.value)
        }
    };

    return (
        <div className="d-flex-column align-items-center mt-xs-2">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="w-80 mt-xs-2"
            />
            <div className="value-display">
                <span>Value: {value}</span>
            </div>
        </div>
    );
}

export default ValueSlider