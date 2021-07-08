import React from "react"
import Card from "../Card/Card"
import { AppContext } from "../../App"

function Favorites() {
    const { favorites, onAddToFavorite } = React.useContext(AppContext)
    return (
        <div className='content  p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                {favorites.length > 0 ? <h1 > Мои закладки </h1> : <h1>Ваши закладки пусты</h1>}
            </div>
            <div className='d-flex flex-wrap'>
                {favorites
                    .map((item, index) => {
                        return <Card
                            key={index}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            {...item}
                        />
                    })}
            </div>
        </div>
    )
}

export default Favorites