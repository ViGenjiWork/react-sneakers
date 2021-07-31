import React, { useState } from 'react'
import styles from './Drawer.module.scss'
import Info from './../Info/Info';
import axios from 'axios';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onClose, items = [], onRemove, opened }) => {

    const { cartItems, setCartItems, totalPrice } = useCart()
    const [orderId, setOrderId] = useState(null)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://610074bfbca46600171cf8eb.mockapi.io/orders/', { items: cartItems })

            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://610074bfbca46600171cf8eb.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert('При оформлении заказа произошла ошибка ;(')
            console.log(error);
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`} onClick={(event) => {
            if (event.target.classList.contains(styles.overlay)) {
                onClose()
            }
        }}>
            <div className={styles.drawer}>
                <h2 className="mb-20">Корзина <img className={styles.removeBtn} src="./img/btn-remove.svg" alt="remove" onClick={onClose} /></h2>

                {items.length > 0

                    ?
                    <React.Fragment>
                        <div className={styles.items}>
                            {
                                items.map(obj => (
                                    <div className={styles.cartItem} key={obj.id}>
                                        <div
                                            style={{ backgroundImage: `url(${obj.imgUrl})` }}
                                            className={styles.cartItemImg}>
                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            onClick={() => {
                                                onRemove(obj.id)
                                            }}
                                            className={styles.removeBtn}
                                            src="./img/btn-remove.svg"
                                            alt="remove"
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li className="d-flex">
                                    <span>Итого:</span>
                                    <div></div>
                                    <b> {totalPrice} </b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{Math.round(totalPrice * 0.05)} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>Оформить заказ <img src="./img/arrow.svg" alt="arrrow" /></button>
                        </div>

                    </React.Fragment>
                    :
                    <Info
                        image={isOrderComplete ? './img/complete-order.png' : './img/cartEmpty.png'}
                        title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                    />
                }
            </div>
        </div>
    )
}

export default Drawer
// ТАЙМКОД 29:25