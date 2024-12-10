import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'

import NavbarDismiss from '../components/navbar-dismiss.component'
import Button from '../components/button.component'

const ContentCreationReviewRoute = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { postId } = location.state || {}
    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [post, setPost] = useState({})

    const fetchThisPost = () => {
        let thisPost
        fanclubs.forEach(fanclub => {
            if (fanclub.artistId === currentArtist.id) {
                thisPost = fanclub.posts.find(elem => elem.id === postId)
            }
        })
        setPost(thisPost || {})
    }

    useEffect(() => {
        if (postId) {
            fetchThisPost()
        }
    }, [postId, fanclubs, currentArtist])

    const updatePosts = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(elem => {
                            if ( elem.id === postId ) {
                                return {
                                    ...elem,
                                    mode: 'PUBLISHED',
                                }
                            }
                            return elem
                        })
                    }
                }
                return fanclub
            })
        )

        navigate('/artist-app/fanclub')
    }

    const deletePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.filter(elem => elem.id !== postId)
                    }
                }
            })
        )
    }

    return (
        <>
            <NavbarDismiss transparent={true} forcedExitPath={'/artist-app/fanclub'} clear={deletePost} />

            <ContainerDefault containerSpecificStyle={'pt-xs-topbar'}>
                <Carousel>
                    {post?.media ?
                        post.media.map(media => (
                            media.type === 'IMAGE' ?
                                <img
                                    key={media.id}
                                    className={`border-radius-04 w-100 h-100`}
                                    src={media.url}
                                />
                            : media.type === 'VIDEO' ?
                                <video
                                    key={media.id}
                                    className={`border-radius-04 w-100 h-100`}
                                    src={media.url}
                                    controls={false}
                                    autoPlay
                                    loop
                                />
                            :
                                null
                        ))
                    :
                        <p>No media available for this post.</p>
                    }
                </Carousel>
            </ContainerDefault>

            <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
                <ContainerDefault>
                    <Button
                        style='bg-acid-lime black fsize-xs-3 f-w-600'
                        onClick={updatePosts}
                        label='Pubblica'
                    />
                </ContainerDefault>
            </div>
        </>
    )
}

export default ContentCreationReviewRoute
