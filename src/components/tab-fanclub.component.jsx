import { useNavigate, useLocation } from "react-router-dom"
const TabFanclub = ({onClick, postType}) => {
    const {pathname } = useLocation()
    const navigate = useNavigate()
  return (
    <div className="w-100 j-c-space-between align-items-center d-flex-row gap-0_25em"> 
        <div className={` ${pathname.includes('dashboard')? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {onClick('ALL'); navigate('dashboard')}}> 
            <p className=" fsize-xs-2 ">Bacheca</p>
        </div>
        <div className={` ${pathname.includes('posts') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {onClick('POSTS'); navigate('posts')}}> 
            <p className=" fsize-xs-2">Post</p>
        </div>
        <div className={` ${pathname.includes('events') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {onClick('EVENTS'); navigate('events')}}> 
            <p className=" fsize-xs-2 ">Eventi</p>
        </div>
        <div className={` ${pathname.includes('forum') ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => {onClick('FORUM'); navigate('forum')}}> 
            <p className=" fsize-xs-2">Forum</p>
        </div>
    </div>
  )
}

export default TabFanclub