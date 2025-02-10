import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from "../contexts/currentFan.context"
import { FansContext } from "../contexts/fans.context"
import { ArtistsContext } from "../contexts/artists.context"
import NavbarDefault from "../components/navbar-default.component"
import Container from "../layout/container.layout"
import Appbar from "../components/appbar.component"
import Post from "../components/post.component"
import CommentsModalLayout from "../layout/comments-modal.layout"
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
	const { modalOpen, openModal, closeModal } = useModal()
	const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()
	const {likeTopic} = useLikeTopic()
	const { saveTopic} = useSaveTopic()
	const [latestPosts, setLatestPosts] = useState()
	const [latestTopics, setLatestTopics] = useState()
	const [latestFanLetters, setLatestFanLetters] = useState()

	useEffect(() => {
		const allPosts = fanclubs
			.filter(fanclub => fanclub.id !== 4) // Exclude Sfera Ebbasta fanclub
			.flatMap(fanclub => fanclub.posts || []);
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
		if ( postInFocus.action === 'SHARE_POST' ) {
			handleShare(postInFocus.post)
		}
		if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
			navigate(`${postInFocus.post.id}`, { state: { postId: postInFocus.id, artistId: postInFocus.artistId, from: pathname} })
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
		openModal()
	}
	const closeComments = () => {
		closeModal()
		setPostInFocus({
			id: undefined,
			action: undefined,
			post: undefined
		})
		setFanclubInFocus(undefined)
		setCommentInFocus(null)
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

						return (
							<Post
								key={index}
								post={post}
								focusPost={(postId, action) => focusPost(postId, action, artistId)}
								likePost={(postId) => likePost(artistId, postId)}
								hasUserSubscribed={hasUserSubscribed}
								handleSubscription={() => setModalSubscription(true)}
								artistId={artistId}
								home={true}
							/>
						)
					})
				})()
			}

			{(() => {
				if (!fanclubs.length) return null

				return fanclubs?.map((f) => {
					const fanLettersToShow = fanclubs
						.filter(fanclub => fanclub.id !== 4) // Exclude Sfera Ebbasta fanclub
						.flatMap(fanclub => fanclub.fanLetters || [])
						.slice(0, 2)

					const artist = artists?.find(a => a.id === f.artistId)

					return fanLettersToShow.length > 0 ?
						<>
							<div 
								className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4'
								onClick={() => navigate(`/artist/${artist?.slug}/letters`, { state: {artist: artist} })}
							>
								<p className='fsize-xs-1 f-w-500'>Da</p>
								<img className='avatar-28 border-radius-100' src={artist?.image} />
								<p className='fsize-xs-1 f-w-500'>{artist?.artistName} - Fan messages</p>
							</div>

							<div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
								<div className="d-flex-column j-c-start align-items-start w-50">
								{fanLettersToShow?.filter((_, index) => index % 2 === 0).map(post => {
									const fan = fans?.find(fan => fan?.id === post?.userId)
									return (
										<PostFanLetter post={post} fan={fan} /> 
									)
								})}
								</div>
								<div className="d-flex-column j-c-start align-items-end w-50">
								{fanLettersToShow?.filter((_, index) => index % 2 !== 0).map(post => {
									const fan = fans?.find(fan => fan?.id === post?.userId)
									return (
										<PostFanLetter post={post} fan={fan} /> 
									)
								})}
								</div>
							</div>
						</>
					: null
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

					return (
						<Post
							key={index}
							post={post}
							focusPost={(postId, action) => focusPost(postId, action, artistId)}
							likePost={(postId) => likePost(artistId, postId)}
							hasUserSubscribed={hasUserSubscribed}
							handleSubscription={() => setModalSubscription(true)}
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
		<CommentsModalLayout
			modalOpen={modalOpen}
			closeModal={closeComments}
		>
			<NavbarCommentsModal
				closeModal={closeComments}
			/>
			<Container style={'pb-xs-12 pb-sm-2'}>
				{fanclubInFocus?.posts.map(post => {
					if ( post.id ===  postInFocus.id) {
						return post.comments.map(comment => {
							return (
								<Comment
									comment={comment}
									key={comment.id}
									inputRef={inputRef}
									spotCommentToReply={spotCommentToReply}
									modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: fanclubInFocus?.id, postId: post.id}})}
									likeComment = {() => likeComment(comment.id, post.id, fanclubInFocus.artistId)}
									postId={post.id}
									likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, fanclubInFocus.artistId)}
								/>
							)
						})
					}})
				}
			</Container>

			<TextbarComments
				handleCurrentComment={handleCurrentComment}
				handleSubmitComment={submitComment}
				currentComment={currentComment}
				setCurrentComment={setCurrentComment}
				modalOpen={modalOpen}
				inputRef={inputRef}
				replyingUser={replyingUser}
			/>

		</CommentsModalLayout>
		<Appbar />
		{/* {
			modalSubscription &&
			<ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclubInFocus} handleSubscription={(period) => handleSubscription(fanclubInFocus?.id, period)}/>
		}
		{err && 
			<FullPageCenter style='z-index-1100 bg-black-transp70'>
				<Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
					<div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
						<h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclubInFocus?.artistId).artistName} è al completo</h2>
					</div>
				</Container>
			</FullPageCenter>
		} */}
		<Snackbar message={messageSnackbar} triggered={triggered} />
		</>
	)
}

export default HomeRoute