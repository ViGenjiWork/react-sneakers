import Card from "../Card/Card"
import { useContext } from 'react';
import  AppContext  from './../../context';

const Favourites = ({ onAddToCart, onAddToFavourite }) => {

    const state = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">

                {
                    state.favourites
                        .map(item => <Card
                            key={item.id}
                            id={item.id}
                            price={item.price}
                            title={item.title}
                            imgUrl={item.imgUrl}
                            onPlus={() => onAddToCart(item)}
                            onFavourite={() => onAddToFavourite(item)}
                            favourited={true}
                        />)
                }

            </div>

        </div>
    )
}

export default Favourites