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

    const fieldName = {
        USERNAME: 'username',
        INSTAGRAM_USERNAME: 'instagram',
        EMAIL: 'email',
        BIRTHDATE: 'birthdate',
        GENRE: 'genre',
        CELLPHONE: 'cellphone',
        ADDRESS: 'adress'
    }[field]

    const fieldLabels = {
        USERNAME: 'USERNAME',
        INSTAGRAM_USERNAME: 'INSTAGRAM',
        EMAIL: 'EMAIL',
        BIRTHDATE: 'DATA DI NASCITA',
        GENRE: 'GENERE',
        CELLPHONE: 'CELLULARE',
        ADDRESS: 'INDIRIZZO'
    }

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

    const renderFieldInput = () => {
        switch (field) {
            case 'USERNAME':
            case 'INSTAGRAM_USERNAME':
            case 'EMAIL':
            case 'CELLPHONE':
                return (
                    <input
                        id={`input-${fieldName}`}
                        className='bg-dark-soft white letter-spacing-1 border-radius-08'
                        type='text'
                        placeholder={currentFan[fieldName]}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        required
                    />
                )
            case 'BIRTHDATE':
                return (
                    <input
                        id='input-birthdate'
                        className='bg-dark-soft white letter-spacing-1 border-radius-08'
                        type='date'
                        placeholder='gg/mm/aaaa'
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        required
                    />
                )
            case 'GENRE':
                return (
                    <select
                        id='input-genre'
                        className='bg-dark-soft white letter-spacing-1 border-radius-08'
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        required
                    >
                        <option value='DONNA'>DONNA</option>
                        <option value='UOMO'>UOMO</option>
                        <option value='NON BINARIO'>NON BINARIO</option>
                        <option value='ALTRO'>ALTRO</option>
                    </select>
                )
            case 'ADDRESS':
                return (
                    <>
                        {['name', 'surname', 'strada', 'zipcode', 'city', 'province', 'state'].map((fieldKey) => (
                            <div key={fieldKey} className='mt-xs-8 mb-xs-8'>
                                <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>
                                    {fieldKey.toUpperCase()}
                                </label>
                                <input
                                    id={`input-${fieldKey}`}
                                    className='bg-dark-soft white letter-spacing-1 border-radius-08'
                                    type='text'
                                    name={fieldKey}
                                    placeholder={adress[fieldKey]}
                                    value={adress[fieldKey]}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                        ))}
                    </>
                )
            default:
                return null
        }
    }

    return (
        <>
            <NavbarPersonalInfoFieldModify title={field} />
            <ContainerDefault containerSpecificStyle='pb-xs-appbar'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-xs-8 mb-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3 pl-xs-6'>{fieldLabels[field]}</label>
                        {renderFieldInput()}
                    </div>
                    <div className='container bottom-5'>
                        <button className='bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4 mb-xs-4' type='submit'>
                            <span className='fsize-xs-3 f-w-600 dark-900 letter-spacing-1'>Conferma modifiche</span>
                        </button>
                    </div>
                </form>
            </ContainerDefault>
        </>
    )
}

export default UserInfoFieldModifyRoute