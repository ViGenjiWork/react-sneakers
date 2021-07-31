import React, { useContext } from 'react'
import styles from './Info.module.scss'
import AppContext from '../../context';

const Info = ({ image, title, description }) => {

    const { setCartOpened } = useContext(AppContext)

    return (
        <div className={styles.cartEmpty}>
            <img width={120} className='mb-20' src={image} alt="cartEmpty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
                <img src="./img/arrow.svg" alt="arrow" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info