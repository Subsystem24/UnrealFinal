import React from 'react'
import "./Button.css"
import { Link } from "react-router-dom";

function Button() {
  return (
    <>
      <style>
        @import url(`https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap`)
      </style>
      <Link to="/catalog">
        <button className="button-89" role="button">Explore</button>
      </Link>
    </>
  )
}

export default Button
