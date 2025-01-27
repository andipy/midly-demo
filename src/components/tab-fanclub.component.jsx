
const TabFanclub = ({onClick, postType}) => {
  return (
    <div className="w-100 j-c-space-between align-items-center d-flex-row gap-0_25em"> 
        <div className={` ${postType === 'ALL' ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => onClick('ALL')}> 
            <p className=" fsize-xs-2 ">Bacheca</p>
        </div>
        <div className={` ${postType === 'POSTS' ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => onClick('POSTS')}> 
            <p className=" fsize-xs-2">Contenuti</p>
        </div>
        <div className={` ${postType === 'EVENTS' ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => onClick('EVENTS')}> 
            <p className=" fsize-xs-2 ">Eventi</p>
        </div>
        <div className={` ${postType === 'FORUM' ? 'bg-acid-lime black f-w-600' : 'bg-dark-gradient white f-w-300'} pt-xs-1 pb-xs-1 pl-xs-4 pr-xs-4 border-radius-02`} onClick={() => onClick('FORUM')}> 
            <p className=" fsize-xs-2">Forum</p>
        </div>
    </div>
  )
}

export default TabFanclub