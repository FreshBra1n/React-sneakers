import React from 'react'
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import { AppContext } from '../../App'

function Card({ id, image, title, price, onFavorite, onPlus, favorited = false, loading = false, }) {
    const { isItemAdded } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const obj = { id, parentId: id, title, image, price };


    const onCLickPlus = () => {
        onPlus(obj)
    }
    const onCLickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }
    return (

        <div className={styles.card} >
            {loading ? (<ContentLoader
                speed={2}
                width={155}
                height={265}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
                <rect x="0" y="168" rx="10" ry="10" width="150" height="15" />
                <rect x="0" y="190" rx="10" ry="10" width="100" height="15" />
                <rect x="1" y="234" rx="10" ry="10" width="80" height="25" />
                <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>) : (<>
                {onFavorite && <div className={styles.favorite} onClick={onCLickFavorite}>
                    <img className={styles.likes} src={isFavorite ? 'img/like.svg' : 'img/unlike.svg '} alt='unlike' />
                </div>}
                <img width={150} height={150} src={image} alt='Sneakers' />
                <h5 >{title}</h5>
                <div className=' d-flex justify-between align-center '>
                    <div className=" d-flex flex-column   ">
                        <span>Цена:</span>
                        <b> {price}руб.</b>
                    </div>

                    {onPlus && <img
                        className={styles.plus}
                        onClick={onCLickPlus}
                        width={30}
                        height={30}
                        src={isItemAdded(id) ? 'img/chek.svg' : 'img/plus.png'} alt='plus' />
                    }
                </div>
            </>)
            }

        </div>

    )

}

export default Card