import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import NavbarInviteFriendPage from '../components/navbar-invite-friend-page.component';
import InviteFriendCover from '../components/invite-friend-cover.component';
import ReferralLink from '../components/referral-link.component';
import Snackbar from '../components/snackbar.component';

import ContainerDefault from '../layout/container-default.layout';
import Button from '../components/button.component';

const InviteFriendRoute = () => {

    const { state } = useLocation()

    const [triggered, setTriggered] = useState(false);
    const triggerSnackbar = () => {
        setTriggered(true);
        setTimeout(() => {
            setTriggered(false)
        }, 2000)
    }

    return (
        <>
            <NavbarInviteFriendPage artist={state} />
            <InviteFriendCover />
            <Snackbar message={'Link copied to clipboard'} triggered={triggered} />

            <ContainerDefault style={'pb-xs-8 pb-lg-2'}>
                <section className='mt-xs-4'>
                    <h4 className='fsize-xs-5 mb-xs-1 letter-spacing-2 f-w-500'>Invita tutti i tuoi amici!</h4>
                    <p className='fsize-xs-2 f-w-200 grey-200 letter-spacing-1'>For each of them who signs up and joins an artist's leaderboard, you will earn 15 points! <strong>Careful! Send a different link to each person you want to invite; if more than one person signs up from the same invitation link, you'll earn only 15 points for the first person who used it!</strong></p>
                </section>

                <div id='invite-friend-link-section' className='mt-xs-12'>
                    <p className='fsize-xs-2 f-w-200 grey-200 letter-spacing-1 mb-xs-1'>Copia e invia il link dove vuoi</p>
                    <ReferralLink onClickFunction={triggerSnackbar} />
                </div>

                <div className='d-flex-row align-items-center j-c-center mt-xs-8 mb-xs-4'>
                    <hr className='w-100' />
                    <p className='fsize-xs-1 f-w-200 grey-200 letter-spacing-1 pl-xs-2 pr-xs-2'>oppure</p>
                    <hr className='w-100' />
                </div>

                <Button disabled={false} label={'Invita tramite whatsapp'} style={'bg-green-whatsapp fsize-xs-3 f-w-500'} />

            </ContainerDefault>
        </>
    )
}

export default InviteFriendRoute;