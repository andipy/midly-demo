import { useState, createContext } from 'react'

export const ReportsContext = createContext()

export const ReportsProvider = ({ children }) => {

    const [reports, setReports] = useState([])

    return (
        <ReportsContext.Provider value={{ reports, setReports }}>
            {children}
        </ReportsContext.Provider>
    )
}