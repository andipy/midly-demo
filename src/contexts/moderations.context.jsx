import { useState, createContext } from 'react'

export const ModerationsContext = createContext()

export const ModerationsProvider = ({ children }) => {
    // Stato per i report
    const [reports, setReports] = useState([])

    // Stato per i bloccati
    const [blocked, setBlocked] = useState([])

    return (
        <ModerationsContext.Provider value={{ reports, setReports, blocked, setBlocked }}>
            {children}
        </ModerationsContext.Provider>
    )
}