import React, { useContext } from 'react'
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'
import AppContext from './../../context';

const Card = ({
    id,
    title,
    imgUrl,
    price,
    onFavourite,
    onPlus,
    favourited = false,
    loading = false,
}) => {

    const { isItemAdded } = useContext(AppContext)
    const [isFavourite, setIsFavourite] = React.useState(favourited)
    const obj = { id, parentId: id, title, imgUrl, price }


    const onClickPlus = () => {
        onPlus(obj)
    }

    const onClickFavourite = () => {
        onFavourite(obj)
        setIsFavourite(!isFavourite)
    }

    return (

        <div className={styles.card}>
            {
                loading
                    ? (
                        <ContentLoader
                            speed={2}
                            width={150}
                            height={187}
                            viewBox="0 0 150 187"
                            backgroundColor="#f2f2f2"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="10" y="196" rx="0" ry="0" width="73" height="26" />
                            <rect x="122" y="199" rx="0" ry="0" width="61" height="25" />
                            <rect x="45" y="50" rx="0" ry="0" width="9" height="1" />
                            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                            <rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
                            <rect x="0" y="135" rx="3" ry="3" width="93" height="15" />
                            <rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
                            <rect x="115" y="155" rx="10" ry="10" width="32" height="32" />
                        </ContentLoader>
                    )
                    : (
                        <>
                            {onFavourite && (<div className={styles.favourite}>
                                <img
                                    onClick={onClickFavourite}
                                    src={isFavourite ? "./img/heart-liked.svg" : "./img/heart-unliked.svg"}
                                    alt="unliked"
                                />
                            </div>
                            )}
                            <img
                                width='100%'
                                height={135}
                                src={imgUrl}
                                alt="Sneakers"
                            />
                            <p>{title}</p>
                            <div className="d-flex justify-between align-center">
                                <div className="d-flex flex-column">
                                    <span>Цена:</span>
                                    <b>{price} руб.</b>
                                </div>
                                {onPlus && (
                                    <img
                                        className={styles.plus}
                                        src={isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'}
                                        alt="plus"
                                        onClick={onClickPlus}
                                    />
                                )}
                            </div>
                        </>
                    )}

        </div>
    )
}

export default Card

