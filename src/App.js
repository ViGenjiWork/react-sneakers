import React, { useState, useEffect } from 'react'
import { Route } from 'react-router';

import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import axios from 'axios';
import Home from './components/pages/Home';
import Favourites from './components/pages/Favourites';
import AppContext from './context';
import { Orders } from './components/pages/Orders';

function App() {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    (async () => {
      try {
        const [cartResponse, favouritesResponse, itemResponse] = await Promise.all([
          axios.get('https://610074bfbca46600171cf8eb.mockapi.io/cart'),
          axios.get('https://610074bfbca46600171cf8eb.mockapi.io/favourites'),
          axios.get('https://610074bfbca46600171cf8eb.mockapi.io/items')
        ])
        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavourites(favouritesResponse.data)
        setItems(itemResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.log(error)
      }
    })()

  }, [])

  const onAddToCart = (cartItem) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(cartItem.id))) {
        setCartItems(prev => prev.filter(item => item.id !== cartItem.id))
      } else {
        axios.post('https://610074bfbca46600171cf8eb.mockapi.io/cart', cartItem)
        setCartItems(prev => [...prev, cartItem])
      }
    } catch (error) {
      alert('Произошла ошибка при добавлении товара в корзину')
      console.log(error);
    }
  }

  const onRemoveCartItem = id => {
    axios.delete(`https://610074bfbca46600171cf8eb.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://610074bfbca46600171cf8eb.mockapi.io/favourites/${obj.id}`);
        setFavourites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://610074bfbca46600171cf8eb.mockapi.io/favourites', obj);
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    const target = event.target
    setSearchValue(target.value)
  }

  const resetSearchValue = () => {
    setSearchValue('')
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favourites,
      isItemAdded,
      onAddToFavourite,
      setCartOpened,
      setCartItems,
      onAddToCart
    }}>
      <div className="wrapper clear">
        < Drawer
          onClose={() => setCartOpened(!cartOpened)}
          onRemove={onRemoveCartItem}
          items={cartItems}
          opened={cartOpened}
        />
        <Header
          onClickCart={() => setCartOpened(!cartOpened)}
        />

        <Route exact path="/">
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavourite={onAddToFavourite}
            resetSearchValue={resetSearchValue}
            isLoading={isLoading}
          />
        </Route>

        <Route exact path="/favourites">
          <Favourites />
        </Route>

        <Route exact path="/orders">
          <Orders />
        </Route>

      </div>
    </AppContext.Provider>
  );
}

export default App;
