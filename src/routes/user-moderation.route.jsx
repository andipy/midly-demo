import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import FullPageCenter from '../layout/full-page-center.layout'
import UserModeration from '../components/user-moderation.component'

const UserModerationRoute = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const { state } = useLocation()
	const { userId, postId, fanclubId, commentId } = state



	return (
		<FullPageCenter style='z-index-1100 bg-black-transp70'>
			<UserModeration
				modalUserModeration={() => navigate(-1)}
				user={userId}
				post={postId}
				fanclub={fanclubId}
				comment={commentId}
			/> 
		</FullPageCenter>
	)
}

export default UserModerationRoute