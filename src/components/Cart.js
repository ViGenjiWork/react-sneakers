const Drawer = () => {
    return (
        <div className="overlay" style={{ display: 'none' }}>
            <div className="drawer">
                <h2 className="mb-20">Корзина <img className="removeBtn" src="./img/btn-remove.svg" alt="remove" /></h2>

                <div className="items">

                    <div className="cartItem d-flex align-center">
                        <div
                            style={{ backgroundImage: 'url(./img/sneakers/1.jpg)' }}
                            className="cartItemImg">
                        </div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
                            <b>12 999руб.</b>
                        </div>
                        <img className="removeBtn" src="./img/btn-remove.svg" alt="remove" />
                    </div>



                    <div className="cartItem d-flex align-center">
                        <div
                            style={{ backgroundImage: 'url(./img/sneakers/2.jpg)' }}
                            className="cartItemImg">
                        </div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
                            <b>12 999руб.</b>
                        </div>
                        <img className="removeBtn" src="./img/btn-remove.svg" alt="remove" />
                    </div>

                </div>


                <div className="cartTotalBlock">
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
                    <button className="greenButton">Оформить заказ <img src="./img/arrow.svg" alt="arrrow" /></button>
                </div>

            </div>
        </div>
    )
}

export default Drawer