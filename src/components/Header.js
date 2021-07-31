import { Link } from "react-router-dom"
import { useCart } from "./hooks/useCart"

const Header = ({ onClickCart }) => {

    const { totalPrice } = useCart()

    return (
        <header className="d-flex justify-between align-center p-40">

            <div className="d-flex align-center">
                <Link to="/">
                    <img width={40} height={40} src="./img/logo.png" alt="logo" />
                    <div>
                        <h3 className="text-uppercase">React sneakers</h3>
                        <p className='opacity-5'>Магазин лучших кроссовок</p>
                    </div>
                </Link>
            </div>

            <ul className="d-flex">

                <li className="mr-30 cu-p" onClick={onClickCart}>
                    <img width={18} height={18} src="./img/cart.svg" alt="cart" />
                    <span> {totalPrice ? `${totalPrice} руб.` : null}</span>
                </li>

                <li className="mr-20 cu-p">
                    <Link to="/favourites">
                        <img width={18} height={18} src="./img/like.svg" alt="favourites" />
                    </Link>
                </li>

                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="./img/user.svg" alt="user" />
                    </Link>
                </li>

            </ul>

        </header>
    )
}

export default Header