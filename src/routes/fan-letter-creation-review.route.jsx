import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'

import Container from '../layout/container.layout'

import Button from '../components/button.component'

import NavbarFanLetterCreation from '../components/navbar-fan-letter-creation.component'
const FanLetterCreationReviewRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { postId, artist } = location.state || {}
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const [post, setPost] = useState({})

    const fetchThisPost = () => {
        let thisPost
        fanclubs.forEach(fanclub => {
            if (fanclub.artistId === artist?.id) {
                thisPost = fanclub.fanLetters.find(elem => elem.id === postId)
            }
        })
        setPost(thisPost)
    }

    useEffect(() => {
        if (postId) {
            fetchThisPost()
        }
    }, [postId])

    const handleCaption = (e) => {
        e.preventDefault()
        setPost(prev => ({
            ...prev,
            caption: e.target.value
        }))
    }
    useEffect(() => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artist?.id) {
                    return {
                        ...fanclub,
                        fanLetters: fanclub.fanLetters.map(elem => {
                            if ( elem.id === postId ) {
                                return {
                                    ...elem, 
                                    mode: 'SKETCH',                                   
                                    caption: post?.caption
                                }
                            }
                            return elem
                        })
                    }
                }
                return fanclub
            })
        )
    }, [post])

    const updatePosts = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artist?.id) {
                    return {
                        ...fanclub,
                        fanLetters: fanclub.fanLetters.map(elem => {
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

        navigate(`/artist/${artist.slug}/fanclub/letters`, { state: { artist: artist} })
    }

    const deletePost = () => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === artist?.id) {
                    return {
                        ...fanclub,
                        fanLetters: fanclub.fanLetters.filter(elem => elem.id !== postId)
                    }
                }
                
                return fanclub
            })
        )
    } 
  return (
    <>
        <NavbarFanLetterCreation artist={artist} transparent={true} deletePost={() => deletePost()} goBack={true}/>
        <Container style={'pt-xs-topbar pb-xs-appbar'}>
            <h1 className='fsize-xs-5 f-w-600 mb-xs-8'>Rivedi il messaggio e pubblica</h1>
            <div className='position-relative'>
            {post?.media && (
                post.media.type === 'IMAGE' ? (
                    <img
                        key={1}
                        className="border-radius-04 w-100 h-100"
                        src={post.media.url}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                ) : post.media.type === 'VIDEO' ? (
                    <video
                        key={1}
                        className="border-radius-04 w-100 h-100"
                        src={post.media.url}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        controls={false}
                        autoPlay
                        playsInline
                        loop
                    />
                ) : null
            )}
            </div>
            
            <div className='mt-xs-10'>
                <label className='fsize-xs-1 grey-300 letter-spacing-3 ml-xs-4'>{'CAPTION'}</label>
                <textarea
                    id={`input-caption`}
                    className='bg-dark-soft white fsize-xs-2 f-w-500 white letter-spacing-1 border-radius-02 mt-xs-2'
                    type='text'
                    placeholder={`${post?.caption ? post?.caption : 'Scrivi una didascalia per il tuo post'}`}
                    value={post?.caption}
                    rows={4}
                    onChange={(e) => handleCaption(e)} 
                    style={{ resize: 'none' }}
                />
            </div>
        </Container>

        <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark'>
            <Container>
                <Button
                    style='bg-acid-lime black fsize-xs-3 f-w-600'
                    onClick={updatePosts}
                    label='Pubblica'
                />
            </Container>
        </div>
    </>  
    )
}

export default FanLetterCreationReviewRoute