import IconCopy from '../images/icons/icon-copy.svg'

const ReferralLink = ({onClickFunction}) => {
    return (
        <div id="invite-friend-link" className="d-flex-row j-c-space-between align-items-center border-radius-08 bg-dark-soft pb-xs-4 pt-xs-4 pl-xs-8 pr-xs-8" onClick={onClickFunction}>
            <span className="fsize-xs-1 f-w-400 white letter-spacing-1">https://www.midly.it/signup?..</span>
            <img src={IconCopy} alt="COPY" />
        </div>
    )
}

export default ReferralLink;