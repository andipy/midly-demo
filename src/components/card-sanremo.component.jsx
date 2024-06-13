import { Link } from 'react-router-dom';

import Sanremo2024 from '../images/pictures/sanremo.png'

const CardSanremo = () => {
    return (
        <Link to='/sanremo-2024'>
            <div className='w-100 pt-xs-4 pr-xs-4 pb-xs-4 pl-xs-4 bg-dark-gradient border-radius-1_25'>
                <img className='object-fit-cover w-100 h-xs-18 border-radius-1' src={Sanremo2024} />
                <h3 className='fsize-xs-3 f-w-500 mt-xs-2'>Classifica speciale Sanremo 2024</h3>
                <p className='fsize-xs-2 f-w-200 grey-200'>Ascolta i brani in gara a Sanremo 2024, fai punti e diventa il Top Fan di questa edizione!</p>
            </div>
        </Link>
    )
}

export default CardSanremo;