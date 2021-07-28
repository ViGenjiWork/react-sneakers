import React from 'react'
import styles from './Drawer.module.scss'

const Drawer = ({ onClose, items = [], onRemove }) => {

    return (
        <div className={styles.overlay} onClick={(event) => {
            if (event.target.classList.contains(styles.overlay)) {
                onClose()
            }
        }}>
            <div className={styles.drawer}>
                <h2 className="mb-20">Корзина <img className={styles.removeBtn} src="./img/btn-remove.svg" alt="remove" onClick={onClose} /></h2>

                {items.length > 0

                    ? <React.Fragment>
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
                                    <b> 21 498 руб. </b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button className={styles.greenButton}>Оформить заказ <img src="./img/arrow.svg" alt="arrrow" /></button>
                        </div>

                    </React.Fragment>

                    : <div className={styles.cartEmpty}>
                        <img width={120} height={120} className='mb-20' src="./img/cartEmpty.png" alt="cartEmpty" />
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button onClick={onClose} className={styles.greenButton}>
                            <img src="./img/arrow.svg" alt="arrow" />
                            Вернуться назад
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Drawer