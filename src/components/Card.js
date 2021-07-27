import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div className="favourite">
                <img src="./img/heart-unliked.svg" alt="unliked" />
            </div>
            <img width={133} height={112} src="./img/sneakers/1.jpg" alt="Sneakers" />
            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="./img/plus.svg" alt="plus" />
                </button>
            </div>
        </div>
    )
}

export default Card
