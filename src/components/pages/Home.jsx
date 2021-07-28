import React from 'react'

import Card from '../Card/Card'

const Home = ({
    items,
    searchValue,
    resetSearchValue,
    onChangeSearchInput,
    onAddToCart,
    onAddToFavourite,
    isLoading
}) => {

    const renderItems = () => {

        const filteredItems = items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()),)

        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                onFavourite={(obj) => onAddToFavourite(obj)}
                loading={isLoading}
                {...item}
                
            />
        ))
    }
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки`}</h1>
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="Search" />
                    {searchValue ? <img onClick={resetSearchValue} className='cu-p clear' src="./img/btn-remove.svg" alt="clear" /> : null}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>

        </div>
    )
}

export default Home