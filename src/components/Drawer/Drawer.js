import React from "react"
import Info from "../info"
import axios from "axios"
import { useCart } from "../hooks/useCart"
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice, tax } = useCart()
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)



    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://60e0612e6b689e001788ca49.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://60e0612e6b689e001788ca49.mockapi.io/cards/' + item.id)
                await delay(1000)
            }


        } catch (error) {
            alert(`Ошибка при создании заказа :(`)
        }
        setIsLoading(false)
    }

    return (

        <div className={`${styles.overlay} ${opened ? styles.overlayVisible:''}`} >
            <div className={styles.drawer} >
                <h2 className='d-flex justify-between mb-30  '>
                    Корзина
                    <img onClick={onClose} className='removeBtn cu-p' width={25} height={25} src='img/remove.png' alt='remove' />
                </h2>

                {
                    items.length > 0 ?
                        <div className='d-flex flex-column flex'>
                            <div className='items  flex '>
                                {items.map((obj) => (
                                    <div key={obj.id} className='cartItem d-flex align-center mb-20'>
                                        <div
                                            className='cartItemImg'
                                            style={{ backgroundImage: `url(${obj.image})` }}
                                        ></div>
                                        <div className='mr-20 flex'>
                                            <p className='mb-5'> {obj.title}</p>
                                            <b> {obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className='removeBtn' width={25} height={25} src='img/remove.png' alt='remove' />
                                    </div>
                                ))
                                }
                            </div>
                            <div className='cartTotalBlock '>
                                <ul >
                                    <li className='d-flex'>
                                        <span>Итог : </span>
                                        <div></div>
                                        <b> {totalPrice}руб.</b>
                                    </li>
                                    <li className='d-flex'>
                                        <span>Налог 5% : </span>
                                        <div></div>
                                        <b> {tax}  руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить заказ </button>
                            </div>
                        </div>
                        : (
                            <Info
                                image={isOrderComplete ? 'img/ready.png' : 'img/empty-box.jpg'}
                                title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                                description={isOrderComplete ? `Ваш заказ #${orderId} будет передан курьерской доставке ` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать закакз.'} > </Info>
                        )
                }






            </div >
        </div >

    )
}

export default Drawer