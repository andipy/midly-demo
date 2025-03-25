import FullPageCenter from "../layout/full-page-center.layout"
import Container from "../layout/container.layout"
import Button from "./button.component"

const PostType = ({close, createPost, createConcert, createTopic}) =>  {
  return (
    <FullPageCenter style='z-index-1100 bg-black-transp70'>
            <Container style='centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'>   
                <div>
                    <p className='fsize-xs-3 f-w-400 t-align-center'>Seleziona il tipo di post che vuoi creare</p>
                    <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime grey-800 border-lime border-radius-04'
                            label='Contenuto'
                            onClick={() => createPost()} 
                        />
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime grey-800 border-lime border-radius-04'
                            label='Concerto/tour'
                            onClick={() => createConcert()} 
                        />
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime grey-800 border-lime border-radius-04'
                            label='Topic'
                            onClick={() => createTopic()} 
                        />
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-300 letter-spacing-1 bg-dark-soft-2 lime-400 border-lime border-radius-04'
                            label='Annulla'
                            onClick={() => close()} 
                        />
                    </div>
                </div>
            </Container>
        </FullPageCenter>
  )
}

export default PostType