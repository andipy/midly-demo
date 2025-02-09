import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'

import Post from './post.component'

import IconUnfollow from '../images/icons/icon-unfollow.svg'
import IconOk from '../images/icons/icon-ok.svg'

const CardFollowedArtist = ({ artist, hasUserSubscribed, preview }) => {

    const navigate = useNavigate()
    const [lastPost, setLastPost] = useState(null)

    const statusConvert = {
        'ONGOING' : 'Classifica flash attiva',
        'PENDING' : 'Classifica flash apre tra poco',
        'CLOSED_VISIBLE': 'Classifica flash terminata'
    }

    const { fanclubs } = useContext(FanclubsContext)

    const fetchLastPost = () => {
        const thisFanclub = fanclubs.find(fanclub => fanclub.artistId === artist?.id)
        
        // Ensure thisFanclub exists before attempting to access 'posts'
        if (thisFanclub?.posts?.length > 0) {
            // Sort the posts by 'createdAt' (most recent first)
            const sortedPosts = thisFanclub.posts.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                
                return dateB - dateA // Most recent first
            })
        
            setLastPost(sortedPosts[0])
        }
    }
    
    useEffect(() => {
        if (artist?.id && fanclubs.length > 0) {
            fetchLastPost()
        }
    }, [artist, fanclubs])

    return (
        <div className={`d-flex-column gap-0_25em pt-xs-2 pb-xs-2 pl-xs-6 pr-xs-6 position-relative image-wrapper mb-xs-4 ${lastPost ? 'bg-dark-gradient' : 'bg-dark-gradient'}`} onClick={() => navigate(`/artist/${artist?.slug}`, { state : {artist: artist} })}>
            {lastPost &&
                <p className='fsize-xs-2 f-w-500 blue-bright-600 mb-xs-2'>Ultimo post di:</p>
            }

            <div className='d-flex-row j-c-space-between align-items-center w-100'>
                <div className='d-flex-row align-items-center gap-0_5em'>
                    <img className={`object-fit-cover border-radius-100 ${lastPost ? 'avatar-48' : 'avatar-72'}`} src={artist?.image} />
                    <div className='d-flex-column mb-xs-2'>
                        <h5 className='fsize-xs-4 f-w-500 no-shrink'>{artist?.artistName}</h5>

                        {(artist?.flashLeaderboard.status === 'ONGOING' || artist?.flashLeaderboard.status === 'PENDING' || artist?.flashLeaderboard.status === 'CLOSED_VISIBILE') &&
                            <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 mb-xs-2 mt-xs-2 bg-white-transp15 border-radius-100 w-max-content '>
                                <p className='fsize-xs-0 letter-spacing-1 lime-400'>{statusConvert[artist?.flashLeaderboard.status]}</p>
                            </div>
                        }

                        {!lastPost && hasUserSubscribed &&
                            <p className='fsize-xs-2 f-w-500 lime-400 mt-xs-4'>Vai al suo club</p>
                        }
                    </div>
                </div>

                {!hasUserSubscribed &&
                    <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink'>
                        <img className='avatar-16' src={IconUnfollow} />
                        <span className='fsize-xs-1'>Segui già</span>
                    </div>
                }

                {hasUserSubscribed &&
                    <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink'>
                        <img className='avatar-16' src={IconOk} />
                        <span className='fsize-xs-1'>Sei abbonato</span>
                    </div>
                }
            </div>

            {lastPost &&
            <div className='container'>
                <Post
                    key={lastPost.postId}
                    post={lastPost}
                    hasUserSubscribed={hasUserSubscribed}
                    focusPost={() => {return}}
                    likePost={() => {return}}
                    artistId={lastPost.artistId}
                    handleSubscription={() => {return}}
                    preview={preview}
                />
                </div>
            }
            {lastPost &&
                <div className='position-absolute w-100 h-60 left-0 bottom-0 bg-dark-overlay-header-5'></div>
            }
        </div>
    )
}

export default CardFollowedArtist