import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { auth } from '../../Context/AuthContext'
import { getCartApi } from '../../API/CartApi'
import useQueryCart from '../../Hooks/useQueryCart'

export default function Navbar() {
    let navigate = useNavigate()
    let {setlogin,islogin} = useContext(auth)

    function logout(){
        localStorage.removeItem('userToken')
        setlogin(null)
        navigate('/sign-in')
    }

    let {iserror , error , data , isLoading} = useQueryCart('getcart' , getCartApi)
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between">
            <div className="container">
                <Link to={'/home'}><a className="navbar-brand" href="#"><i class="fa-solid fa-cart-shopping"></i><span className='word'>fresh cart</span></a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                {islogin?<>
                 <div className="collapse navbar-collapse justify-content-center center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to={'/home'} className="nav-link mx-1">Home</Link>
                        <Link to={'/cart'} className="nav-link mx-1">Cart</Link>
                        <Link to={'/wish-list'} className="nav-link mx-1">wish list</Link>
                        <Link to={'/products'} className="nav-link mx-1">Products</Link>
                        <Link to={'/categories'} className="nav-link mx-1">Categories</Link>
                        <Link to={'/brands'} className="nav-link mx-1">Brands</Link>
                    </div>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav nav5">
                        <Link to={'/cart'} 
                        className="nav-link mx-1"><button type="button" className="btn position-relative">
                        <i className="fa-solid fa-cart-shopping" style={{ color: 'black', fontSize: '28px' }}></i>
                        <span className="position-absolute top-45 start-50 badge notification">
                            {data?.data?.numOfCartItems}
                        </span>
                        </button>
</Link>
                        <Link to={'/sign-in'} onClick={logout} className="nav-link mx-1">log out</Link>
                    </div>
                </div>
                </>
                :                
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to={'/register'} className="nav-link mx-1">register</Link>
                        <Link to={'/sign-in'} className="nav-link mx-1">log in</Link>
                    </div>
                </div>}
            </div>
        </nav>
    </>
  )
}
