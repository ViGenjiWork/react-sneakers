import Card from "../Card/Card"
import { useContext } from 'react';
import  AppContext  from './../../context';

const Favourites = () => {

    const {favourites, onAddToFavourite} = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">

                {
                    favourites
                        .map((item, index )=> <Card
                            key={index}
                            onFavourite={onAddToFavourite}
                            favourited={true}
                            {...item}
                        />)
                }

            </div>

        </div>
    )
}

export default Favourites