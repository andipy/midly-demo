import ContainerDefault from '../layout/container-default.layout'

import NavbarMultistep from '../components/navbar-multistep.component'

import IllustrationsFanclubEmpty from '../images/illustrations/illustration-fanclub-empty.svg'

const FanclubTipsRoute = () => {

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={false} editable={false} />
            <ContainerDefault style={'pt-xs-topbar'}>
                <h3 className='fsize-xs-5 f-w-600'>Come usare al meglio il fanclub</h3>
                <p className='mt-xs-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore quae quod rerum numquam, laboriosam corrupti ab quidem sit necessitatibus est nulla adipisci eum, accusamus, iusto enim tempora asperiores et ex sint corporis illo? Ad, quisquam, totam sunt nostrum repellendus earum libero exercitationem eaque consequatur sed, accusantium rem quos adipisci dicta?</p>
                <img className='w-35' src={IllustrationsFanclubEmpty} alt='' />
                <p className='mt-xs-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore quae quod rerum numquam, laboriosam corrupti ab quidem sit necessitatibus est nulla adipisci eum, accusamus, iusto enim tempora asperiores et ex sint corporis illo?</p>
                <p className='mt-xs-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore quae quod rerum numquam, laboriosam corrupti ab quidem sit necessitatibus est nulla adipisci eum, accusamus, iusto enim tempora asperiores et ex sint corporis illo?</p>
            </ContainerDefault>
        </>
    )
}

export default FanclubTipsRoute