import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import NavbarPersonalInfoFieldModify from '../components/navbar-personal-info-modify.component'
import ContainerDefault from '../layout/container-default.layout'

const UserInfoFieldModifyRoute = () => {
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    const [newValue, setNewValue] = useState('')
    const [adress, setAdress] = useState({
        name: currentFan.adress?.name || '',
        surname: currentFan.adress?.surname || '',
        strada: currentFan.adress?.strada || '',
        zipcode: currentFan.adress?.zipcode || '',
        city: currentFan.adress?.city || '',
        province: currentFan.adress?.province || '',
        state: currentFan.adress?.state || '',
    })

    const location = useLocation()
    const { field } = location.state || {}
    const navigate = useNavigate()

    const fieldName = (() => {
        switch (field) {
            case 'Username': return 'username'
            case 'Instagram username': return 'instagram'
            case 'Email': return 'email'
            case 'Data di nascita': return 'birthdate'
            case 'Genere': return 'genre'
            case 'Cellulare': return 'cellphone'
            case 'Indirizzo': return 'adress'
        }
    })()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (fieldName === 'adress') {
            setCurrentFan((prev) => ({
                ...prev,
                adress: {
                    ...adress,  
                },
            }))
        } else {
            setCurrentFan((prev) => ({
                ...prev,
                [fieldName]: newValue,
            }))
        }
        navigate(-2)
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target
        setAdress((prevAdress) => ({
            ...prevAdress,
            [name]: value,
        }))
    }

    return (
        <>
            <NavbarPersonalInfoFieldModify title={field} />
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
                {(() => {
                    switch (field) {
                        case 'Username':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>USERNAME</label>
                                        <input
                                            id='input-username'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            placeholder={currentFan.username}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Instagram username':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>INSTAGRAM</label>
                                        <input
                                            id='input-instagram'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            placeholder={currentFan.instagram}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Data di nascita':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>DATA DI NASCITA</label>
                                        <input
                                            id='input-birthdate'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='date'
                                            placeholder={'gg/mm/aaaa'}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Genere':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>GENERE</label>
                                        <select
                                            id='input-genre'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            placeholder={currentFan.genre}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        >
                                            <option value='DONNA'>DONNA</option>
                                            <option value='UOMO'>UOMO</option>
                                            <option value='NON BINARIO'>NON BINARIO</option>
                                            <option value='ALTRO'>ALTRO</option>
                                        </select>
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Email':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>EMAIL</label>
                                        <input
                                            id='input-email'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            placeholder={currentFan.email}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Cellulare':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>CELLULARE</label>
                                        <input
                                            id='input-cellphone'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            placeholder={currentFan.cellphone}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute bottom-5'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        case 'Indirizzo':
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>NOME</label>
                                        <input
                                            id='input-name'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='name'
                                            placeholder={adress.name}
                                            value={adress.name}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>COGNOME</label>
                                        <input
                                            id='input-surname'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='surname'
                                            placeholder={adress.surname}
                                            value={adress.surname}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>VIA E NUMERO</label>
                                        <input
                                            id='input-strada'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='strada'
                                            placeholder={adress.strada}
                                            value={adress.strada}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>CAP</label>
                                        <input
                                            id='input-street'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='zipcode'
                                            placeholder={adress.zipcode}
                                            value={adress.zipcode}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>COMUNE/CITTA'</label>
                                        <input
                                            id='input-city'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='city'
                                            placeholder={adress.city}
                                            value={adress.city}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>PROVINCIA</label>
                                        <input
                                            id='input-province'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='province'
                                            placeholder={adress.province}
                                            value={adress.province}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='mt-xs-8 mb-xs-8'>
                                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>STATO</label>
                                        <input
                                            id='input-state'
                                            className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                            type='text'
                                            name='state'
                                            placeholder={adress.state}
                                            value={adress.state}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className='container position-absolute'>
                                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        default:
                            return <></>
                    }
                })()}
            </ContainerDefault>
        </>
    )
}

export default UserInfoFieldModifyRoute