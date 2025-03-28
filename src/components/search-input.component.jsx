import IconSearch from '../images/icons/icon-search-inactive.svg'

const SearchInput = ({ value, onChange }) => {
    return (
        <div id='search-bar' className='position-sticky top-0 z-index-6 w-100vw ml-input-search-center bg-dark pt-xs-4 pb-xs-4'> 
            <div className='container d-flex-row align-items-center j-c-start bg-dark-soft w-100 border-radius-04'>
                <img src={IconSearch} className='avatar-14 ml-xs-2 mr-xs-2' />
                <input className='input-search bg-dark-soft white' type='text' placeholder='Cerca un artista' value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default SearchInput