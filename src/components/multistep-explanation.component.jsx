import { Link } from 'react-router-dom'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'

const MultistepExplanation = ({ sliderSteps, leaderboard, artist, sliderPage, incrementPageSlider, decrementPageSlider }) => {
    return (
        <FullPageCenter className={'z-index-999 bg-black-transp80'}>
            <ContainerDefault style={'d-flex-row j-c-space-between'}>
                <h2 className='fsize-xs-9 f-w-600 t-align-center mb-xs-12 mx-xs-auto'>Regole della <br /> CLASSIFICA FLASH <br /> di {artist?.artistName}</h2>
            </ContainerDefault>

            <div className={`d-inline-flex-row align-self-start align-items-center mb-xs-12 horizontal-slider-base horizontal-slider-${sliderPage}`}>
                <div className='w-100vw'>
                    <ContainerDefault style={'d-flex-column gap-1em'}>
                        <div className='d-flex-column align-items-center'>
                            {leaderboard?.song &&
                                <p className='fsize-xs-5 f-w-300 t-align-center'>1 ascolto su Spotify del brano "{leaderboard?.song.title}"</p>
                            }
                            {leaderboard?.album &&
                                <p className='fsize-xs-5 f-w-300 t-align-center'>1 ascolto su Spotify di ogni brano dell'album "{leaderboard?.album.title}"</p>
                            }
                            <span>↓</span>
                            <p className='fsize-xs-5 f-w-600 t-align-center'>3 punti nella CLASSIFICA FLASH</p>
                        </div>
                        <p className='fsize-xs-5 f-w-300 t-align-center'>Vale più punti degli altri suoi brani, ma viene conteggiato <span className='f-w-600'>massimo 10 volte al giorno</span></p>
                    </ContainerDefault>
                </div>
                <div className='w-100vw'>
                    <ContainerDefault style={'d-flex-column gap-1em'}>
                        <div className='d-flex-column align-items-center'>
                            <p className='fsize-xs-5 f-w-300 t-align-center'>1 ascolto su Spotify di qualsiasi altro brano di {artist?.artistName}</p>
                            <span>↓</span>
                            <p className='fsize-xs-5 f-w-600 t-align-center'>1 punto nella CLASSIFICA FLASH</p>
                        </div>
                    </ContainerDefault>
                </div>
                <div className='w-100vw'>
                    <ContainerDefault style={'d-flex-column gap-1em'}>
                        <p className='fsize-xs-5 f-w-300 t-align-center'>Gli ascolti che fai su Spotify si <span className='f-w-600'>trasformano in punti nella CLASSIFICA circa entro 90 minuti</span>, ricarica la pagina per aggiornare la classifica</p>
                    </ContainerDefault>
                </div>
                <div className='w-100vw'>
                    <ContainerDefault style={'d-flex-column gap-1em'}>
                        {leaderboard?.song &&
                            <p className='fsize-xs-5 f-w-300 t-align-center'>Usa la <span className='f-w-600'>live chat</span> nella CLASSIFICA FLASH per commentare il brano "{leaderboard?.song.title}"</p>
                        }
                        {leaderboard?.album &&
                            <p className='fsize-xs-5 f-w-300 t-align-center'>Usa la <span className='f-w-600'>live chat</span> nella CLASSIFICA FLASH per commentare i brani dell'album "{leaderboard?.album.title}"</p>
                        }
                    </ContainerDefault>
                </div>

                <div className='w-100vw'>
                    <ContainerDefault style={'d-flex-column gap-1em'}>
                        <p className='fsize-xs-5 f-w-300 t-align-center'>Se ti serve aiuto, scrivici per assitenza su telegram:</p>
                        <Link to='https://t.me/midlyofficial' target='blank'>
                            <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-2' label='Chiedi aiuto sul canale telegram' />
                        </Link>
                    </ContainerDefault>
                </div>
            </div>

            <ContainerDefault style={'d-flex-row j-c-space-between'}>
                <Button style={`${sliderPage === 1 ? 'border-dark dark-500' : 'border-lime-1 lime-400'} bg-dark  border-radius-04 fsize-xs-3 f-w-500 w-30`} label='Indietro' onClick={decrementPageSlider} disabled={sliderPage === 1 ? true : false} />
                <Button style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 w-65' label={sliderPage === sliderSteps ? 'Ok, vai alla classifica' : 'Avanti'} onClick={incrementPageSlider} />
            </ContainerDefault>
        </FullPageCenter>
    )
}

export default MultistepExplanation