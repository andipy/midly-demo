import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'
import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'

const FanclubTermsRoute = () => {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()

    const [accepted, setAccepted] = useState(false)
    const handleCheckbox = (e) => {
        setAccepted((prev) => !prev)
    }

    const outerDivRef = useRef(null); // Reference to the outer div
    const [isAtBottom, setIsAtBottom] = useState(false); // Track if scrolled to the bottom

    const handleScroll = () => {
        const outerDiv = outerDivRef.current;
        const scrollTop = outerDiv.scrollTop; // How far the user has scrolled from the top
        const scrollHeight = outerDiv.scrollHeight; // Total height of the scrollable content
        const clientHeight = outerDiv.clientHeight; // Visible height of the div

        // Check if user has scrolled to the bottom
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
        setIsAtBottom(true); // We are at the bottom
        } else {
        setIsAtBottom(false); // Not yet at the bottom
        }
    };

    useEffect(() => {
        const outerDiv = outerDivRef.current;

        // Add event listener for scroll
        outerDiv.addEventListener("scroll", handleScroll);

        // Cleanup the event listener when component unmounts
        return () => {
        outerDiv.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }

    return (
        <FullScreenModalLayout>
            <NavbarBackOnly  onClick={onClick}/>

            <ContainerDefault style=''>
                <h3 className='fsize-xs-6 f-w-500 white'>Termini & condizioni e Privacy policy del fanclub</h3>

                <div className='bg-dark-soft border-radius-04 mt-xs-4 overflow-auto fsize-xs-2 f-w-400 grey-100 line-height-140 h-50vh position-relative' ref={outerDivRef}>
                    <p className='pt-xs-6 pb-xs-6 pl-xs-6 pr-xs-6'>Lorem ipsum odor amet, consectetuer adipiscing elit. Rhoncus montes magnis ac senectus montes porttitor. Consectetur class congue dapibus torquent nisi purus dapibus. Ridiculus vel urna pretium hendrerit quam curabitur. Pharetra suspendisse dictum imperdiet lacus iaculis accumsan montes congue. Ridiculus vestibulum pulvinar viverra, interdum aptent suspendisse ipsum est natoque. Hendrerit faucibus auctor sociosqu porta mi accumsan vestibulum; lectus hendrerit.

                    Urna vivamus euismod dui amet in sodales. Vel lacinia litora et ex et aptent lorem. Dis quam aliquet amet ornare sit tempor. Tincidunt condimentum consectetur erat ut phasellus accumsan laoreet. Est venenatis ornare litora semper pharetra ligula leo neque. Vel lobortis urna inceptos lacus magnis urna augue. Penatibus donec vulputate pulvinar tellus senectus; tellus inceptos tristique. Bibendum morbi velit quisque integer rhoncus praesent fusce. Quisque vulputate a; sed orci sed sociosqu pulvinar? Tortor conubia ad, rhoncus dictumst ligula sed quis.

                    Lectus sapien sociosqu tortor venenatis eget nullam. Lacus felis odio rhoncus senectus suscipit fermentum vel pharetra. Purus euismod sollicitudin ad vel ligula in lectus; consectetur bibendum. Molestie conubia vulputate morbi pretium suscipit eget eros id ac. Lorem penatibus cursus primis ullamcorper rutrum vehicula. Elit molestie bibendum non vel risus. Inceptos rhoncus platea sit orci maximus non vitae urna. Nunc aliquam at imperdiet pulvinar sollicitudin eu. Consequat ipsum ipsum penatibus consequat purus pharetra. Et quisque pharetra etiam eu aptent.

                    Lacinia tempus orci commodo per justo ridiculus eget vulputate ante. Malesuada magna leo parturient sed vivamus dis massa. Tellus ad tortor penatibus eget adipiscing primis arcu? Pretium mi eleifend purus porta erat arcu libero? Efficitur enim diam nulla vitae eu accumsan odio vestibulum. Posuere consectetur nunc sagittis bibendum netus posuere. Pulvinar inceptos habitasse magna eu mollis nec fermentum. Semper rutrum dignissim elementum imperdiet pulvinar facilisis. Hendrerit praesent at per maximus nullam faucibus.

                    Porttitor penatibus lacus felis mi habitant, gravida ut sociosqu! Condimentum parturient donec; bibendum amet varius taciti. Nascetur lectus mi sociosqu phasellus luctus scelerisque lobortis per varius. Ased duis purus mauris orci netus nisl ridiculus. Mollis hendrerit velit duis, etiam ipsum laoreet consectetur! Habitant eget conubia potenti donec aliquam sit metus tristique parturient. Penatibus auctor dignissim consectetur nec molestie luctus semper lorem. Consequat eget curabitur imperdiet consectetur duis lobortis; accumsan dictum. Quisque non duis ullamcorper ultrices ipsum metus viverra. Nascetur efficitur litora dapibus enim diam orci phasellus a.

                    Sem potenti facilisi aenean tellus mus porttitor. Mi dui sem potenti eget class aliquet id. Augue nostra urna leo et senectus suspendisse interdum sagittis posuere. Elit curae per habitasse est ac metus finibus; eleifend sem. Curae maecenas diam sociosqu placerat facilisis. Suspendisse tempus auctor tincidunt porta lacinia non. Ridiculus commodo senectus arcu fusce elit curabitur. Nullam posuere lectus imperdiet natoque dignissim viverra.

                    Platea finibus torquent erat varius sed vulputate convallis himenaeos vivamus. Rhoncus rhoncus quisque ullamcorper pellentesque quisque neque taciti. Consequat volutpat himenaeos, velit sodales viverra lectus senectus egestas. Vivamus amet justo ultrices feugiat eleifend hac malesuada blandit. Neque malesuada interdum himenaeos etiam congue etiam netus consequat. Ac inceptos a suspendisse elit integer egestas porttitor inceptos felis. Montes magnis ultricies integer inceptos mauris rhoncus rhoncus et. Cursus elementum a etiam aliquam adipiscing ipsum facilisi nunc consequat.

                    Fusce curae dui feugiat ex tempus rutrum. Dis aptent commodo leo placerat; per magnis massa. Purus laoreet metus quisque quis metus congue eleifend dui. Gravida quam nec ipsum curae nisl habitasse pellentesque facilisis interdum. Elit purus risus purus potenti rhoncus; odio felis. Fermentum et nunc litora ac sollicitudin aliquet tortor.

                    Cras fringilla dui porttitor vulputate proin proin ornare. Maecenas rhoncus vehicula dapibus mauris elementum; nibh porta erat. Dolor iaculis ridiculus urna consequat quisque amet cras nostra. Donec dictum litora donec suscipit porttitor; consectetur primis tempus dui. Commodo mus magna lorem consequat euismod interdum suscipit torquent blandit. Blandit aliquet est ante dui sem taciti, vivamus augue quam. Et purus odio vulputate euismod dictum. Phasellus potenti facilisis dolor euismod id. Erat ridiculus condimentum sociosqu augue fusce elementum euismod curae maximus.

                    Tellus sem nascetur nulla per sem arcu vehicula erat. Et et nam rutrum egestas porta suscipit facilisis natoque. Tortor primis egestas dictum sem posuere neque habitasse. Mi vestibulum justo condimentum nascetur ridiculus. Nostra vivamus eleifend feugiat vulputate maecenas massa. Nisl est neque libero feugiat leo quis. Sociosqu accumsan felis penatibus natoque aptent erat. Cursus eleifend fames nec quis id inceptos odio egestas pellentesque.</p>
                    {!isAtBottom && <div className='overlay-scrollable-card bg-dark-overlay-header-4'></div>}
                    
                </div>

                <div className="d-flex-row mt-xs-6">
                    <input className="no-shrink" type="checkbox" onChange={handleCheckbox} />
                    <p className='fsize-xs-2 ml-xs-2'>Ho preso visione e accetto i <span className='f-w-600 lime-400'>Termini e condizioni</span> e la <span className='f-w-600 lime-400'>Privacy policy</span> del fanclub di MIDLY</p>
                </div>

                <ContainerDefault style='position-absolute bottom-5'>
                    <Button
                        disabled={accepted ? false : true}
                        style={`${accepted ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        label='Accetta e prosegui'
                        onClick={
                            () => navigate('/artist-app/fanclub/activation/info')
                        }
                    />
                </ContainerDefault>
            </ContainerDefault>
        </FullScreenModalLayout>
    )
}

export default FanclubTermsRoute