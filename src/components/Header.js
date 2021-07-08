import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./hooks/useCart";


function Header(props) {
  const { totalPrice } = useCart()

  return (
    <div>
      <header className=' content d-flex justify-between align-center p-40'>


        <Link to='/'>
          <div className='d-flex align-center'>
            <img width={40} height={40} src='img/logo.png' alt='logo' />
            <div >
              <h3 className='text-uppercase' >
                React Sneakers
              </h3>
              <p className='opacity-5'> Магазин лучших кроссовок</p>
            </div>

          </div>

        </Link>
        <ul className='d-flex cu-p align-center '>
          <li onClick={props.onClickCart} className='mr-30 mb-10'>
            <img width={20} height={20} src='img/tachka.png' alt='Корзина' />
            <span> {totalPrice} руб.</span>
          </li>
          <li>
            <Link to='/favorites'><img width={25} height={25} src='img/favorites.svg' alt='Закладки'></img></Link>
          </li>
          <li>
            <Link to='/orders'> <img width={22} height={22} src='img/user.svg' alt='Пользователь' /></Link>
          </li>
        </ul>

      </header>
   
    </div>

  )
}

export default Header