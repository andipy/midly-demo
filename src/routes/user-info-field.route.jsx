import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { CurrentFanContext } from '../contexts/currentFan.context'
import Container from '../layout/container.layout'
import Appbar from '../components/appbar.component'
import NavbarPersonalInfoField from '../components/navbar-personal-info-field.component'

const UserInfoFieldRoute = () => {
    const { currentFan } = useContext(CurrentFanContext)
    const location = useLocation()
    const { type } = location.state || {}

    const renderFieldContent = (type) => {
        switch (type) {
            case 'USERNAME':
                return renderField('USERNAME', currentFan.username, 'Aggiungi il tuo username!');
            case 'INSTAGRAM_USERNAME':
                return renderField('INSTAGRAM', currentFan.instagram, 'Aggiungi il tuo instagram!');
            case 'BIRTHDATE':
                return renderField('DATA DI NASCITA', currentFan.birthdate, 'Aggiungi la tua data di nascita!');
            case 'GENRE':
                return renderField('GENERE', currentFan.genre, 'Aggiungi il tuo genere!');
            case 'EMAIL':
                return renderField('EMAIL', currentFan.email, 'Aggiungi la tua mail!');
            case 'CELLPHONE':
                return renderField('CELLULARE', currentFan.cellphone, 'Aggiungi il tuo cellulare!');
            case 'ADDRESS':
                return renderAddressFields(currentFan.address);
            default:
                return (
                    <>
                        <h4>Modifica Informazioni</h4>
                        <p>Seleziona un'opzione per modificare le informazioni del tuo account.</p>
                    </>
                )
        }
    }


    const renderAddressFields = (address) => (
        <>
            {renderField('NOME', address.name, 'Aggiungi il tuo nome!')}
            {renderField('COGNOME', address.surname, 'Aggiungi il tuo cognome!')}
            {renderField('VIA E NUMERO', address.strada, 'Nessun indirizzo! Aggiungilo')}
            {renderField('CAP', address.zipcode, 'Nessun CAP! Aggiungilo')}
            {renderField('COMUNE/CITTA\'', address.city, 'Nessuna città! Aggiungila')}
            {renderField('PROVINCIA', address.province, 'Nessuna provincia! Aggiungila')}
            {renderField('STATO', address.state, 'Nessuno stato! Aggiungilo')}
        </>
    )

    const renderField = (label, value, placeholder) => (
        <div className='mt-xs-8 mb-xs-8'>
            <label className='fsize-xs-1 grey-300 letter-spacing-3'>{label}</label>
            {value ? 
                <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{value}</h6>
            : 
                <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>{placeholder}</h6>
            }
        </div>
    )

    return (
        <>
            <NavbarPersonalInfoField title={type} />
            <Container style={'pb-xs-appbar'}>
                <div>
                    {renderFieldContent(type)}
                </div>
            </Container>
            <Appbar />
        </>
    )
}

export default UserInfoFieldRoute