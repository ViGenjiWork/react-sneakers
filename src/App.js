import React, { useState, useEffect } from 'react'
import { Route } from 'react-router';

import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import axios from 'axios';
import Home from './components/pages/Home';
import Favourites from './components/pages/Favourites';
import AppContext from './context';

function App() {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    async function fetchData() {
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
    }

    fetchData()

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

  const onAddToFavourite = async favouriteItem => {
    try {
      if (favourites.find(item => item.id === favouriteItem.id)) {
        axios.delete(`https://610074bfbca46600171cf8eb.mockapi.io/favourites/${favouriteItem.id}`)
      } else {
        const { data } = await axios.post('https://610074bfbca46600171cf8eb.mockapi.io/favourites', favouriteItem)
        setFavourites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить товар в избранное')
      console.log(error);
    }
  }

  const onChangeSearchInput = (event) => {
    const target = event.target
    setSearchValue(target.value)
  }

  const resetSearchValue = () => {
    setSearchValue('')
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favourites }}>
      <div className="wrapper clear">
        {
          cartOpened
            ? <Drawer
              onClose={() => setCartOpened(!cartOpened)}
              onRemove={onRemoveCartItem}
              items={cartItems}
            />
            : null
        }

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
          <Favourites
            items={favourites}
            onAddToCart={onAddToCart}
            onAddToFavourite={onAddToFavourite}
          />
        </Route>

      </div>
    </AppContext.Provider>
  );
}

export default App;
