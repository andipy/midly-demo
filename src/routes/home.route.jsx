import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FansContext } from "../contexts/fans.context"
import { ArtistsContext } from "../contexts/artists.context"
import NavbarDefault from "../components/navbar-default.component"
import Container from "../layout/container.layout"
import Appbar from "../components/appbar.component"
import Post from "../components/post.component"
import CommentsModalTextbarLayout from "../layout/comments-modal-textbar.layout"
import NavbarCommentsModal from "../components/navbar-comments-modal.component"
import TextbarComments from "../components/textbar-comments.component"
import Comment from "../components/comment.component"
import Snackbar from "../components/snackbar.component"
import PostFanLetter from "../components/post-fan-letter.component"
import ForumTopic from "../components/forum-topic.component"
import useLikePost from "../utils/handle-like-post.hook"
import useSubmitComment from "../utils/handle-submit-comment.hook"
import useLikeComment from "../utils/handle-like-comment.hook"
import useLikeReply from "../utils/handle-like-reply-comment.hook"
import useShare from "../utils/handle-share.hook"
import useModal from "../utils/handle-modal.hooks"
import useFanclubSubscriptionHandler from "../utils/handle-subscription.hook"
import useLikeTopic from "../utils/handle-like-topic.hook"
import useSaveTopic from "../utils/handle-save-topic.hook"
import ModalSubscriptionFanclub from "../components/modal-subscription-fanclub.component"
import FullPageCenter from "../layout/full-page-center.layout"
import ModalLayout from "../layout/modal.layout"
import LikeUser from "../components/like-user.component"
import { Outlet } from "react-router-dom"
const HomeRoute = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = location.pathname
	const {fanclubs} = useContext(FanclubsContext)
	const {currentFan} = useContext(CurrentFanContext)
	const {fans} = useContext(FansContext)
	const {artists} = useContext(ArtistsContext)
	const {likePost} = useLikePost()
	const { handleSubmitComment } = useSubmitComment()
	const { likeComment } = useLikeComment()
	const { likeReply} = useLikeReply()
	const { share, messageSnackbar, triggered } = useShare()
    const { modalOpen: modal1Open, openModal: openModal1, closeModal: closeModal1 } = useModal()
	const { modalOpen: modal2Open, openModal: openModal2, closeModal: closeModal2 } = useModal()
	const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
	const {likeTopic} = useLikeTopic()
	const { saveTopic} = useSaveTopic()
	const [latestPosts, setLatestPosts] = useState()
	const [latestTopics, setLatestTopics] = useState()
	const [latestFanLetters, setLatestFanLetters] = useState()

	useEffect(() => {

		const followedArtistIds = currentFan.followedArtists.map(artist => artist.artistId)
    	const subscribedArtistIds = currentFan.fanclubsSubscribed.map(artist => artist.artistId)

		const excludedArtistIds = new Set([...followedArtistIds, ...subscribedArtistIds])
		const latestPostsByArtist = new Map()
		fanclubs.forEach(fanclub => {
			if (excludedArtistIds.has(fanclub.artistId) && fanclub.posts?.length > 0) {
				const latestPost = fanclub.posts.reduce((latest, post) => 
					new Date(post.createdAt) > new Date(latest.createdAt) ? post : latest
				, fanclub.posts[0])

				latestPostsByArtist.set(fanclub.artistId, latestPost.id)
			}
		})
		const allPosts = fanclubs
			.filter(fanclub => fanclub.id !== 4) // Exclude Sfera Ebbasta fanclub
			.flatMap(fanclub => fanclub.posts || [])
			.filter(post => !latestPostsByArtist.has(post.artistId) || latestPostsByArtist.get(post.artistId) !== post.id)
		const allTopics = fanclubs
			.filter(fanclub => fanclub.id !== 4) // Exclude Sfera Ebbasta fanclub
			.flatMap((fanclub) => fanclub.forum || [])

		const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		const sortedTopics = allTopics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

		setLatestPosts(chunkArray(sortedPosts, 4))
		setLatestTopics(chunkArray(sortedTopics, 4))
	}, [fanclubs])

	const chunkArray = (array, size) => {
		return array.reduce((chunks, item, index) => {
			const chunkIndex = Math.floor(index / size)
			if (!chunks[chunkIndex]) {
			chunks[chunkIndex] = []
			}
			chunks[chunkIndex].push(item)
			return chunks
		}, [])
	}

	const inputRef = useRef(null)
	const [commentInFocus, setCommentInFocus] = useState(null)
	const [replyingUser, setReplyingUser] = useState(null)
	const spotCommentToReply = (id, username) => {
		setReplyingUser(username)
		setCommentInFocus(id)
		inputRef.current.focus()
	}
	const [fanclubInFocus, setFanclubInFocus] = useState()
	const [postInFocus, setPostInFocus] = useState({
		id: undefined,
		action: undefined,
		post: undefined
	})
	const focusPost = (id, action, artistId) => {
		const fanclub = fanclubs.find(f => f.artistId === artistId)
		setFanclubInFocus(fanclub)
		const thisPost = fanclub.posts.find(post => post.id === id)
		setPostInFocus({
			id: thisPost.id,
			action: action,
			post: thisPost,
			artistId: artistId
		})
	}
	useEffect(() => {
	if ( postInFocus.id ) {
		if ( postInFocus.action === 'OPEN_COMMENTS' ) {
			openComments()
		}
		if ( postInFocus.action === 'OPEN_LIKES' ) {
			openLikes()
		}
		if ( postInFocus.action === 'SHARE_POST' ) {
			handleShare(postInFocus.post)
		}
		if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
			navigate(`${postInFocus.post.id}`, { state: { postId: postInFocus.id, artistId: postInFocus.artistId, fromPage: '/your-favourites'} })
		}
	}
	}, [postInFocus])

	const handleShare = (post) => {
		share(post, fanclubInFocus?.id)
		setPostInFocus({
			id: undefined,
			action: undefined,
			post: undefined
		})
		setFanclubInFocus(undefined)
	}
	const handleShareTopic = (post, artistId) => {
		share(post, artistId)
	}

	const openComments = (id) => {
		openModal1()
	}
	const openLikes = (id) => {
		openModal2()
	}
	const closeComments = () => {
		closeModal1()
		setPostInFocus({
			id: undefined,
			action: undefined,
			post: undefined
		})
		setFanclubInFocus(undefined)
		setCommentInFocus(null)
	}
	const closeLikes = () => {
		closeModal2()
		setPostInFocus({
			id: undefined,
			action: undefined,
			post: undefined
		})
		setFanclubInFocus(undefined)
	}
	const [currentComment, setCurrentComment] = useState({
		id: undefined,
		userId: undefined,
		userType: undefined,
		userImage: undefined,
		username: undefined,
		createdAt: undefined,
		comment: '',
		likes: [],
		comments: [],
		repliedUsername: undefined
	})
	const handleCurrentComment = (e) => {
		e.preventDefault()
		let commentsNumber
		let currentDate = new Date()
		let date = currentDate.toISOString().split('T')[0]
		fanclubs.map(fanclub => {
			if ( fanclub.artistId === fanclubInFocus?.artistId ) {
				fanclub.posts.map(post => {
					if ( post.id === postInFocus.id ) {
						commentsNumber = post?.commentsCount + 1
					}
				})
			}
		})

		let replied
		if ( commentInFocus) {
			replied = replyingUser
		}

		setCurrentComment(prev => ({
			...prev,
			id: commentsNumber,
			userId: currentFan.id,
			userType: currentFan.type,
			userImage: currentFan.image,
			username: currentFan.username,
			createdAt: date,
			comment: e.target.value,
			repliedUsername: replied
		}))
	}
	
	const submitComment = (e) => {
		e.preventDefault()
		handleSubmitComment(currentComment, postInFocus, commentInFocus, fanclubInFocus?.artistId)
		setCurrentComment({
			id: undefined,
			userId: undefined,
			userType: undefined,
			userImage: undefined,
			username: undefined,
			createdAt: undefined,
			comment: '',
			likes: [],
			comments: [],
			repliedUsername: undefined
		})
		setCommentInFocus(null)
		setReplyingUser(null)
	}
	/* const [followedArtists, setFollowedArtists] = useState([])
    const [subscribedArtists, setSubscribedArtists] = useState([])
	
	const fetchFollowedArtists = () => {
        const followedArtistIds = currentFan.followedArtists.map(artist => artist.artistId)
        const followedArtists = artists
            .filter(artist => followedArtistIds.includes(artist.id))
    
        // Remove artists that are also in the subscribedArtists list
        const uniqueFollowedArtists = followedArtists.filter(artist => 
            !subscribedArtists.some(subscribed => subscribed.id === artist.id)
        )
        
        setFollowedArtists(uniqueFollowedArtists)
    }
    
    const fetchSubscribedArtists = () => {
        const subscribedArtistIds = currentFan.fanclubsSubscribed.map(artist => artist.artistId)
        const subscribedArtists = artists
            .filter(artist => subscribedArtistIds.includes(artist.id))
    
        // Remove artists that are also in the followedArtists list
        const uniqueSubscribedArtists = subscribedArtists.filter(artist => 
            !followedArtists.some(followed => followed.id === artist.id)
        )
        
        setSubscribedArtists(uniqueSubscribedArtists)
    } 

	useEffect(() => {
        fetchSubscribedArtists()
    }, [artists, currentFan])

    useEffect(() => {
        fetchFollowedArtists()
    }, [artists, currentFan, subscribedArtists]) */

	const [modalSubscription, setModalSubscription] = useState(false)

	return (
		<>
		{/* <NavbarDefault /> */}
		<Container style=''>
			{(() => {
					if (!latestPosts?.length) return null

					const firstChunk = latestPosts[0]

					return firstChunk?.map((post, index) => {
						const artistId = post?.artistId
						const hasUserSubscribed = currentFan.fanclubsSubscribed.some(sub => sub.artistId === artistId) 
						const fanclub = fanclubs.find(f => f.artistId === artistId)

						return (
							<Post
								key={index}
								post={post}
								focusPost={(postId, action) => focusPost(postId, action, artistId)}
								likePost={(postId) => likePost(artistId, postId)}
								hasUserSubscribed={hasUserSubscribed}
								handleSubscription={() => {setModalSubscription(true);setFanclubInFocus(fanclub);}}
								artistId={artistId}
								home={true}
							/>
						)
					})
				})()
			}

			{(() => {
				if (!fanclubs.length) return null;

				return fanclubs
					.filter(f => f.id !== 4) // Escludi il fanclub di Sfera Ebbasta
					.map(f => {
						const artist = artists?.find(a => a.id === f.artistId)

						const fanLettersToShow = (f.fanLetters || []).slice(0, 2)

						if (fanLettersToShow.length === 0) return null // Se non ci sono lettere, salta

						return (
							<div key={f.id}>
								<div 
									className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4'
									onClick={() => navigate(`/artist/${artist?.slug}/letters`, { state: { artist } })}
								>
									<p className='fsize-xs-1 f-w-500'>Da</p>
									<img className='avatar-28 border-radius-100' src={artist?.image} />
									<p className='fsize-xs-1 f-w-500'>{artist?.artistName} - Fan messages</p>
								</div>

								<div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
									<div className="d-flex-column j-c-start align-items-start w-50">
										{fanLettersToShow.filter((_, index) => index % 2 === 0).map(post => {
											const fan = fans?.find(fan => fan?.id === post?.userId)
											return <PostFanLetter key={post.id} post={post} fan={fan} />
										})}
									</div>
									<div className="d-flex-column j-c-start align-items-end w-50">
										{fanLettersToShow.filter((_, index) => index % 2 !== 0).map(post => {
											const fan = fans?.find(fan => fan?.id === post?.userId)
											return <PostFanLetter key={post.id} post={post} fan={fan} />
										})}
									</div>
								</div>
							</div>
						)
					})
			})()}

			{(() => {
				if (!latestTopics?.length) return null

				const firstChunk = latestTopics[0]

				return firstChunk?.map((topic, index) => {
					const artistId = topic?.artistId
					const artist = artists?.find(a => a.id === artistId)
					return (
						<>
						<div 
							className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4'
							onClick={() => navigate(`/artist/${artist?.slug}/forum`, { state: {artist: artist} })}
						>
							<p className='fsize-xs-1 f-w-500'>Da</p>
							<img className='avatar-28 border-radius-100' src={artist?.image} />
							<p className='fsize-xs-1 f-w-500'>{artist?.artistName} - Forum</p>
						</div>
							<ForumTopic 
								key={index} 
								topic={topic} 
								artistId={artistId}
								like={() => likeTopic(artistId, topic.id)} 
								save={() => saveTopic(artistId, topic.id)} 
								share={() => handleShareTopic(topic, artistId)} 
								popular={false}
							/>
						</>
					)
				})
			})()}

			{(() => {
				if (!latestPosts?.length) return null

				const secondChunk = latestPosts[1]

				return secondChunk?.map((post, index) => {
					const artistId = post?.artistId
					const hasUserSubscribed = currentFan.fanclubsSubscribed.some(sub => sub.artistId === artistId) 
					const fanclub = fanclubs.find(f => f.artistId === artistId)

					return (
						<Post
							key={index}
							post={post}
							focusPost={(postId, action) => focusPost(postId, action, artistId)}
							likePost={(postId) => likePost(artistId, postId)}
							hasUserSubscribed={hasUserSubscribed}
							handleSubscription={() => {setModalSubscription(true);setFanclubInFocus(fanclub);}}
							artistId={artistId}
							home={true}
						/>
					)
				})
			})()}

			{(() => {
				if (!latestTopics?.length) return null

				const secondchunk = latestTopics[1]

				return secondchunk?.map((topic, index) => {
					const artistId = topic?.artistId
					const artist = artists?.find(a => a.id === artistId)
					return (
						<>
							<div 
								className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4'
								onClick={() => navigate(`/artist/${artist?.slug}/forum`, { state: {artist: artist} })}
							>
								<p className='fsize-xs-1 f-w-500'>Da</p>
								<img className='avatar-28 border-radius-100' src={artist?.image}/>
								<p className='fsize-xs-1 f-w-500'>{artist?.artistName} - Forum</p>
							</div>
							<ForumTopic 
								key={index} 
								topic={topic} 
								artistId={artistId}
								like={() => likeTopic(artistId, topic.id)} 
								save={() => saveTopic(artistId, topic.id)} 
								share={() => handleShareTopic(topic, artistId)} 
								popular={false}
							/>
						</>
					)
				})
			})()}
		</Container>
		{
			modal1Open &&
			<CommentsModalTextbarLayout
				modalOpen={modal1Open}
				closeModal={closeComments}
				handleCurrentComment={handleCurrentComment}
				handleSubmitComment={submitComment}
				currentComment={currentComment}
				setCurrentComment={setCurrentComment}
				inputRef={inputRef}
				replyingUser={replyingUser}
			>
				<Container style={'pb-xs-12 pb-sm-2'}>
				{fanclubs
				.filter(fanclub => fanclub.artistId === fanclubInFocus?.artistId) // Filtra il fanclub giusto
				.map(fanclub => 
				fanclub?.posts.map(post => {
					if (post.id === postInFocus.id) {
					return post?.comments?.map(comment => {
						return (
						<Comment
							comment={comment}
							key={comment.id}
							inputRef={inputRef}
							spotCommentToReply={spotCommentToReply}
							modalUserModeration={() => 
							navigate('user-moderation', { 
								state: { 
								userId: comment.userId, 
								commentId: comment.id, 
								fanclubId: fanclub?.id, 
								postId: post.id 
								} 
							})
							}
							modalUserModerationRep={(userId) => 
								navigate('user-moderation', { 
									state: { 
									userId, 
									commentId: comment.id, 
									fanclubId: fanclub?.id, 
									postId: post.id 
									} 
								})
								}
							replyUserModeration={(userId, reply, replyId) => navigate('user-moderation/report', {state: {  userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id, artistId: fanclub?.artistId, reported: false, type: 'COMMENT', reply, replyId }})}
							likeComment={() => likeComment(comment.id, post.id, fanclub.artistId)}
							postId={post.id}
							likeReply={(replyId, commentId, postId) => 
							likeReply(replyId, commentId, postId, fanclub.artistId)
							}
							deleteComment = {() => navigate('user-moderation/delete', {state: {  userId: comment.userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id, deleted: false}})}
                            deleteReply = {(replyId, userId) => navigate('user-moderation/delete', {state: {  userId: userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id, deleted: false, replyId: replyId, type: 'REPLY'}})}
						/>
						)
					})
					}
				})
				)}
				</Container>

			</CommentsModalTextbarLayout>
		}
		{modal2Open &&
		<ModalLayout
			modalOpen={modal2Open}
			closeModal={closeLikes}
		>
			<NavbarCommentsModal title={'Likes'} closeModal={closeLikes}/>
			<Container style={'pb-xs-12 pb-sm-2'}>
				{fanclubs
					.filter(fanclub => fanclub.artistId === fanclubInFocus?.artistId) // Filtra il fanclub giusto
					.map(fanclub => 
					fanclub?.posts.map(post => {
						if (post.id === postInFocus.id) {
							return post.likes.map(like => {
								let user
								if (like.userId === fanclub?.artistId) {
									const artistFound = artists.find(artist => artist?.id === like.userId);
									if (artistFound) {
										user = {
											id: artistFound.id,
											username: artistFound.artistName,
											image: artistFound.image
										};
									}
								} else {
									const fanFound = fans.find(fan => fan?.id === like.userId);
									if (fanFound) {
										user = {
											id: fanFound.id,
											username: fanFound.username,
											image: fanFound.image
										};
									}
								}
	
								return (
									<LikeUser user={user}/>
								)
							})
						}
					})
					)}
			</Container>
		</ModalLayout>
		}
		<Appbar />
		{
			modalSubscription &&
			<ModalSubscriptionFanclub closeModal={() => {setModalSubscription(false); setFanclubInFocus(null)}} fanclub={fanclubInFocus} handleSubscription={(period) => {handleSubscription(fanclubInFocus?.artistId, period)}}/>
		}
		{err && 
			<FullPageCenter style='z-index-1100 bg-black-transp70'>
				<Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
					<div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
						<h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclubInFocus?.artistId).artistName} è al completo</h2>
					</div>
				</Container>
			</FullPageCenter>
		}
		<Snackbar message={messageSnackbar} triggered={triggered} />
		<Container style=''>
			<Outlet  />
		</Container>
		</>
	)
}

export default HomeRoute