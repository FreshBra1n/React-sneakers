import { AppContext } from "../../App"
import React from 'react'


export const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const price = cartItems.reduce((sum, obj) => Number(obj.price) + Number(sum), 0);
    const totalPrice = price.toFixed(3)
    const tax = Math.floor(totalPrice / 100 * 5 * 1000)

    return { cartItems, setCartItems, totalPrice, tax };
}

