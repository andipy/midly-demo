import { useState } from "react"
import { Outlet, useOutletContext, useNavigate } from 'react-router-dom'

import NavbarDefault from "../components/navbar-default.component"
import ContainerDefault from "../layout/container-default.layout"
import Notification from "../components/notification.component"
import PostCopy from "../components/post-copy.component"
import SwipeCarousel from "../layout/swipe-carousel.layout"
import img1 from '../images/pictures/current-fan.jpg'
import img2 from '../images/pictures/ai_01.png'
import aud1 from '../assets/audio/live-quiz/dimmi-che-ce-thasup-vox.mp3'
import vid1 from '../assets/video/video-test.MP4'
const NewComponentsTest = () => {



  const post1 = {
    id: 0,
    artistId: 2,
    media: [img1, img2],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
    ],
    createdAt: '2024-10-03'
  }

  const post2 = {
    id: 0,
    artistId: 2,
    media: [img1, img2],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: true
    },
    likes: 23,
    shares: 23,
    comments: [
    ],
    createdAt: '2024-12-03'
  }
  const post3 = {
    id: 0,
    artistId: 2,
    media: [img1, img2],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }
  const post4 = {
    id: 0,
    artistId: 2,
    media: [img2],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }
  const post5 = {
    id: 0,
    artistId: 2,
    media: [img2, img1],
    text: 'Ci vediamo a San Siro!',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }

  const post6 = {
    id: 0,
    artistId: 2,
    media: [],
    text: 'Ci vediamo a San Siro!',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }

  const post7 = {
    id: 0,
    artistId: 2,
    media: [aud1],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
    ],
    createdAt: '2024-12-03'
  }
  const post8 = {
    id: 0,
    artistId: 2,
    media: [img2, vid1],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }
  const post9 = {
    id: 0,
    artistId: 2,
    media: [vid1],
    text: '',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }

  const post10 = {
    id: 0,
    artistId: 2,
    media: [vid1, img2, aud1],
    text: 'Ciao questa è una prova testo',
    caption: 'Caption del contenuto, scritta dall artista e trocata al massimo alla seconda riga se diventa troppo lunga',
    link: {
        url: '',
        name: ''
    },
    settings: {
        isPrivate: false
    },
    likes: 23,
    shares: 23,
    comments: [
      {
        userId: 1,
        text: 'Ciao come stai?'
      },
      {
        userId: 2,
        text: 'Bellissimo!'
      },
      {
        userId: 1,
        text: 'Ti amo'
      },
      {
        userId: 6,
        text: 'Mi manchi '
      },
    ],
    createdAt: '2024-12-03'
  }

  const notification1 = {
      id: 0,
      postId: 1,
      type: 'LIKE',
      users: [
        {
          id: 6,
          userName: 'Giulietta',
        },
        {
          id: 2,
          userName: 'marco',
        },
        {
          id: 3,
          userName: 'username',
        },
        {
          id: 4,
          userName: 'dan',
        }
      ],
      read: true,

  }

  
  const notification2 = {
      id: 0,
      postId: 1,
      type: 'LIKE',
      users: [
        {
          id: 1,
          userName: 'imTheKing',
        },
        {
          id: 2,
          userName: 'marco',
        },
      ],
      read: false,

  }

  

  

  const images = [img1, img2]




  return (
    <>
    <NavbarDefault />
    <h2 className="fsize-xs-5 f-w-600">Notifica letta: </h2>
    <Notification notification={notification1} />
    <h2 className="fsize-xs-5 f-w-600">Notifica non letta: </h2>
    <Notification notification={notification2}/>
    <ContainerDefault>
      {/* <h2>Carousel slider:</h2>
      <div className="w-100 h-96px bg-dark-gradient overflow-all-hidden">
        <SwipeCarousel images={images} />
      </div> */}

      <h2 className="fsize-xs-5 f-w-600">Post pubblico foto multipla: </h2>
      <p>Data più di 30 giorni fa: </p>
      <PostCopy 
        post={post1} 
        hasUserSubscribed={true}/>
      <p>(Funziona show comment dei commenti post)</p>

      <h2 className="fsize-xs-5 f-w-600">Post pubblico con commenti foto multipla: </h2>
      <p>Data meno di 30 giorni fa: </p>
      <PostCopy post={post3} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post privato utente non iscritto: </h2>
      <PostCopy post={post2} hasUserSubscribed={false} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico foto singola: </h2>
      <PostCopy post={post4} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico foto multipla e testo: </h2>
      <PostCopy post={post5} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico solo testo: </h2>
      <PostCopy post={post6} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico solo audio: </h2>
      <PostCopy post={post7} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico con video: </h2>
      <PostCopy post={post8} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico solo video: </h2>
      <PostCopy post={post9} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post pubblico multi tutto: </h2>
      <PostCopy post={post10} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post privato utente iscritto: </h2>
      <PostCopy post={post2} hasUserSubscribed={true} userType={'FAN'}/>
      <h2 className="fsize-xs-5 f-w-600">Post artista che l'ha creato: </h2>
      <PostCopy post={post10} hasUserSubscribed={false} userType={'ARTIST'}/>
      <h2 className="fsize-xs-5 f-w-600">Post privato artista che l'ha creato: </h2>
      <PostCopy post={post2} hasUserSubscribed={false} userType={'ARTIST'}/>

      
      



    </ContainerDefault>
    {/* OUTLET COMMENTI */}
    <div className='position-relative w-100 d-flex-column j-c-center align-items-center'>
        <Outlet /> 
    </div>
    </>
    
  )
}

export default NewComponentsTest