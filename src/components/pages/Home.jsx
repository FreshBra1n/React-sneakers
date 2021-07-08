import React from 'react'
import Card from '../Card/Card.js'




function Home({
    setSearchValue,
    onChangeSearchInput,
    searchValue,
    items,
    onAddToFavorite,
    onAddToCart,
    isLoading
}) {


    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()))


        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))

    }

    return (
        <div className='content  p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 > {searchValue ? `Поиск по запросу '${searchValue}'` : 'Все кроссовки'} </h1>
                <div className='search-block d-flex align-center '>
                    <img width={15} height={15} src='./img/loupe.png' alt='Search' />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className='clear cu-p'
                            src='./img/remove.png'
                            alt='Clear' />
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...' />
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {renderItems()}
            </div>
        </div>
    )
}

export default Home