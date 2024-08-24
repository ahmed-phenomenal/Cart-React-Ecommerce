import React, { useState , useEffect, useContext} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import { jwtDecode } from "jwt-decode";
import * as Yup from 'yup'
import icon from '../../IMG/Icon/react-1-logo-black-and-white.png'

import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { auth } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';

export default function Signin() {
    //title change
    const [title, setTitle] = useState('Sign-in Components'); 
    useEffect(() => {
        document.title = title; 
    }, [title]); 

    //icon change
    const [favicon, setFavicon] = useState(icon); // Initial favicon
    useEffect(() => {
        const updateFavicon = (iconUrl) => {
        const link = document.querySelector("link[rel~='icon']");
        if (!link) {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = iconUrl;
            document.head.appendChild(newLink);
        } else {
            link.href = iconUrl;
        }
        };
    updateFavicon(favicon);
  }, [favicon]); // Dependency array with favicon, so it updates when favicon state changes


//Login
let navigate = useNavigate()
let {setlogin} = useContext(auth)
let [loading,setLoading] = useState(false)
let [msg,setMsg] = useState('')
function handleLogin(values){
    setLoading(true)
    console.log(values);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    .then(({data}) => {console.log(data);
        if(data.message === 'success'){
            setMsg('')
            setLoading(false)
            localStorage.setItem('userToken',data.token)
            setlogin(jwtDecode(data.token))
            navigate('/home')
        }
    })
    .catch((error) => {setMsg(error?.response?.data?.message)
        console.log(error?.response?.data?.message)
        setLoading(false)
    })
}
let validationScheme = Yup.object({
    email:Yup.string().email().required("Email pattern incorrect"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{8,16}$/).required("password pattern incorrect use (A-Z , a-z0-9) 8-16 characters"),
})
let formik = useFormik({
    initialValues:{
        email:'',
        password:'',
    },
    validationSchema:validationScheme,
    onSubmit:handleLogin
})


return (
    <>
    <Navbar/>
    <div className="sign-in">
        <div className="container">
            <h1>login now</h1>
            <form className='forms' onSubmit={formik.handleSubmit}>
            {msg?<div class="alert alert-danger" role="alert">
                    {msg}
                </div>:''}
                <label>Email : </label>
                <div class="input-group mb-3">
                    <input type="text" id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {/* {alert} */}
                {formik.errors.email && formik.touched.email?  <div class="alert alert-danger" role="alert">
                    email pattern is inavalid
                </div>:''}
                <label>Password :  </label>
                <div class="input-group mb-3">
                    <input type="password" id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {formik.errors.password && formik.touched.password?  <div class="alert alert-danger" role="alert">
                    Password pattern is inavalid use (A-Z , a-z0-9) 8-16 characters
                </div>:''}
                <div className="fn d-flex justify-content-between">
                    <div>
                        <Link to={'/forget'} className='text'>forget your password ?</Link>
                    </div>
                    {(formik.errors.email && formik.touched.email) || (formik.errors.password && formik.touched.password)?  <div className="button"><button type="submit" className="buttonInactive">login now</button></div>:
                    <div className="button"><button type="submit" className="btn btn-success">{loading?<i className="fa-solid fa-spin fa-circle-notch"></i>:"login now"}</button></div>}
                </div>
            </form>
        </div>
    </div>
    {loading?<Loading></Loading>:''}
    {/* Password : Ahmed1234 */}

    </>
  )
}
