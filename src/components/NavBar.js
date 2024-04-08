import React from "react";
import MovieLogo from "../img/logos_icon.png";
import { Link } from 'react-router-dom'

function NavBar() {

    return (
        <div className="flex border-black space-x-8 item-center pl-3 py-3 bg-zinc-900 text-slate-50">
            <Link to="/"><img src={MovieLogo} className="w-[40px] h-[30px] item-center"></img></Link>
            <Link to="/movies">Movies</Link>
            <Link to="/watchlist">Watchlist</Link>
        </div>
    )
}

export default NavBar;