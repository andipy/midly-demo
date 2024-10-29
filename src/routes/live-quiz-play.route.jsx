import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { LiveQuizContext } from '../contexts/live-quiz.context';

import ContainerDefault from '../layout/container-default.layout'



function LiveQuizPlay() {
    const { id } = useParams();
    const { quizzes } = useContext(LiveQuizContext);

    const quiz = quizzes.find(quiz => quiz.quizId === id);
    const songChunk = quiz.songChunks.find(chunk => chunk.chunkId === '1');

    /* console.log("Quiz play: ", quiz);
    console.log("Quiz songchunk: ", songChunk); */
  return (
    <>
        <header className='position-relative h-xs-10'>
            <img className='w-100 h-inherit object-fit-cover' src={quiz.image} alt='image'></img>
        </header>
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-4'}>
            <div className='d-flex-row align-items-center mt-xs-4 gap-0_5em '>
                <span className='fsize-xs-3 pt-xs-2 pb-xs-2 align-self-start grey-300'>
                    {quiz.artistName}
                </span>
                <span className='fsize-xs-3 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2 border-radius-100 bg-dark-gradient gold align-self-start'>
                    {songChunk.songName}
                </span>
            </div>
            <p className='t-align-center lime-400 mt-xs-10 mb-xs-10'>60 secondi rimanenti</p>
            <form>
                <div>
                    <p className='fsize-xs-6'>{songChunk.firstLine}</p>
                    <hr className=' bg-white white mt-xs-4 mb-xs-4'>

                    </hr>
                    <p className='fsize-xs-6'>{songChunk.secondLine}</p>
                    <textarea className='bg-dark-soft white letter-spacing-1 border-radius-04 mt-xs-4 fsize-xs-3' rows='4' placeholder='Scrivi il verso mancante'></textarea>
                </div>
                <button className="bg-acid-lime black font-body mt-xs-6" onClick={() => {}}>
                    <span className='fsize-xs-2 f-w-500'>Invia la risposta</span>
                </button>
            </form>
        </ContainerDefault>
    </>
  )
}

export default LiveQuizPlay