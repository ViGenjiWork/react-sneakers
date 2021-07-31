import axios from 'axios';
import { useEffect, useState } from 'react'
import Card from './../Card/Card';
import { useContext } from 'react';
import AppContext from './../../context';


export const Orders = () => {

    const { onAddToFavourite, onAddToCart } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://610074bfbca46600171cf8eb.mockapi.io/orders')
                setOrders(data.map(obj => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                alert('Произошла ошибка при загрузке ваших заказов')
                console.log(error);
            }
        })()

    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}