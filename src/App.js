import React from 'react'
import { Route, Router } from "react-router-dom";
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import axios from 'axios';
import Orders from './components/pages/Orders';

export const AppContext = React.createContext({})
const url = 'https://60e0612e6b689e001788ca49.mockapi.io'


function App(props) {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartRes, favRes, itemsRes] = await Promise.all([
          axios.get(url + '/cards'),
          axios.get(url + '/favorites'),
          axios.get(url + '/items')
        ])


        setIsLoading(false)

        setCartItems(cartRes.data)
        setFavorites(favRes.data)
        setItems(itemsRes.data)
      } catch (e) {
        alert('Ошибка при запросе данных')
        console.log(e)
      }
    }
    fetchData()
  }, [])


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${url}/cards/${findItem.id}`);
      } else {

        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(url + '/cards', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
        console.log(obj.id)
      }
    } catch (e) {
      alert('Ошибка при добавлении в корзину');
      console.error(e);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${url}/cards/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (e) {
      alert('Ошибка при удалении из корзины');
      console.error(e);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        axios.delete(`${url}/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          url + '/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      alert('Не удалось добавить в фавориты');
      console.error(e);
    }
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };


  return (
    <AppContext.Provider value={{
      cartItems,
      items,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => { setCartOpened(true) }} />
        <Route path='/favorites'>

        </Route>
        <Route path='/' exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}

          />
        </Route>
        <Route path='/favorites' exact>
          <Favorites />
        </Route>
        <Route path='/orders' exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;



