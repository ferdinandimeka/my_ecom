import React from 'react'
import './loaderCardOne.css'

export default function loaderCardOne() {
 return (
    <div className="card">
        <div className="card__skeleton card__title"></div>
        <div className="card__skeleton card__description">         </div>
    </div>
  )
}
