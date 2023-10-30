import Cover from '../images/illustrations/invite-friend-illustration.svg'

const InviteFriendCover = () => {
    return (
        <div id="invite-friend-cover-img" className="pt-xs-20 pt-lg-6">
            <img className="w-100" src={Cover} alt="{{artist-name}}" />
        </div>
    )
}

export default InviteFriendCover;