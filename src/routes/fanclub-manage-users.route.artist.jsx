import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import { ModerationsContext } from "../contexts/moderations.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import { FansContext } from "../contexts/fans.context"

import NavbarBackOnly from "../components/navbar-back-only.component"
import Container from "../layout/container.layout"
import FullPageCenter from "../layout/full-page-center.layout"
const FanclubManageUsersRoute = () => {
    const navigate = useNavigate()
    const { reports, blocked, setBlocked, setReports} = useContext(ModerationsContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const {fans} = useContext(FansContext)

    const [reportedUsers, setReportedUsers] = useState([])
    const [blockedUsers, setBlockedUsers] = useState([])
    const [allReports, setAllReports] = useState([])

    useEffect(() =>{
        const filteredReports = reports.filter(report => report.fanclubArtistId === currentArtist.id)
        const filteredBlockedUsers = blocked.filter(block => block.blockingUser.id === currentArtist.id)
        const unblockedUsers = filteredReports.filter(report => 
            !filteredBlockedUsers.some(block => block.blockedUserId === report.reportedUserId)
            && report.archived === false
        )
        const uniqueReportedUsers = unblockedUsers.filter((report, index, self) =>
            index === self.findIndex((t) => (
                t.reportedUserId === report.reportedUserId  
            ))
        )
        setAllReports(filteredReports)
        setReportedUsers(uniqueReportedUsers)
        setBlockedUsers(filteredBlockedUsers)

        
    }, [reports, blocked, fans])

    const blockUser = (reportedUser) => {
        const newBlock = {
            blockedUserId: reportedUser.reportedUserId,
            blockingUser: {
                id: currentArtist.id,
                userType: 'ARTIST'
            },
            postId: reportedUser.postId,
            commentId: reportedUser.commentId,
            fanclubId: reportedUser.fanclubId,
            fanclubArtistId: reportedUser.artistId,
            createdAt: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
        }
        const updatedReports = reports.map((report) => 
            report.reportedUserId === reportedUser.reportedUserId && report.fanclubId === reportedUser.fanclubId
                ? { ...report, archived: true }
                : report
        )

        setReports(updatedReports)
        setBlocked([...blocked, newBlock])
    }

    const unblockUser = (blockedUser) => {
        const updatedBlocked = blocked.filter(block => 
            !(block.blockedUserId === blockedUser.blockedUserId && block.blockingUser.id === currentArtist.id)
        )
        setBlocked(updatedBlocked)
    }

    
  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)}/>
    <Container style={''}>
        {
            blockedUsers.length === 0 && reportedUsers.length === 0 ?
            <>
            <FullPageCenter>
                <h1 className='t-align-center grey-400 fsize-xs-3 mt-xs-2 mt-xl-2  overflow-x'>Se ci sono utenti bloccati e segnalazioni appariranno qui!</h1>
            </FullPageCenter>
            </>
            :
            <>
                <h4 className="fsize-xs-6 f-w-500 mb-xs-4">Utenti bloccati</h4>
                <div className="mb-xs-12">
                {blockedUsers.length === 0 &&
                    <h1 className='t-align-start grey-400 fsize-xs-3 mt-xs-2 mt-xl-2  overflow-x'>Non ci sono utenti bloccati!</h1>
                }
                {blockedUsers.map((blockedUser, index) => {
                    const fan = fans.find(fan => fan.id === blockedUser.blockedUserId)
                    return(
					<div className="d-flex-row j-c-space-between align-items-center w-100 mt-xs-2 mb-xs-2">
                        <div className="d-flex-row align-items-center j-c-start">
                            <img className="avatar-48 border-radius-100 mr-xs-6" src={fan?.image}></img>
                            <p className="fsize-xs-1 f-w-500">{fan?.username}</p>
                        </div>
                        <div className="d-flex-row">
                            <p className="lime-400 fsize-xs-2 f-w-500" onClick={() => unblockUser(blockedUser)}>Sblocca</p>
                        </div>
                    </div>
                    )
                })}
                </div>
                
                <h4 className="fsize-xs-6 f-w-500 mb-xs-4">Utenti segnalati</h4>
                <div className="mb-xs-12">
                {reportedUsers.length === 0 &&
                    <h1 className='t-align-start grey-400 fsize-xs-3 mt-xs-2 mt-xl-2  overflow-x'>Non ci sono nuove segnalazioni!</h1>
                }
                {reportedUsers.map((reportedUser, index) => {
                    const fan = fans.find(fan => fan.id === reportedUser.reportedUserId)

                    const userReportsCount = allReports.filter(
                        (report) => report.reportedUserId === reportedUser.reportedUserId
                        && report.archived === false
                    ).length
                    return(
					<div className="d-flex-row j-c-space-between align-items-center w-100 mt-xs-2 mb-xs-2">
                        <div className="d-flex-row align-items-center j-c-start">
                            <img className="avatar-48 border-radius-100 mr-xs-6" src={fan?.image}></img>
                            <p className="fsize-xs-1 f-w-500">{fan?.username}</p>
                            <div className="d-flex-row j-c-center align-items-center bg-acid-lime avatar-16 border-radius-100 ml-xs-6">
                                <p className="black f-w-600 fsize-xs-1">{userReportsCount}</p>
                            </div>
                        </div>
                        <div className="d-flex-row">
                            <p className="lime-400 fsize-xs-2 f-w-500" onClick={() => blockUser(reportedUser)}>Blocca</p>
                        </div>
                    </div>
                    )
                })}
                </div>
            </>

        }
    </Container>
    

    </>
  )
}

export default FanclubManageUsersRoute