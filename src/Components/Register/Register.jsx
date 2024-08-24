import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import { jwtDecode } from "jwt-decode";
import * as Yup from 'yup'
import icon from '../../IMG/Icon/react-1-logo-black-and-white.png'

import Navbar from '../Sign-in/Navbar'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { auth } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';

export default function Register() {
        //title change
        const [title, setTitle] = useState('Sign-Up Components'); 
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


    //register
    let navigate = useNavigate()
    let {setlogin} = useContext(auth)
    let [loading,setLoading] = useState(false)
    let [msg,setMsg] = useState('')
    function handleRegister(values){
        setLoading(true)
        console.log(values);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .then(({data}) => {console.log(data);
            if(data.message === 'success'){
                setMsg('')
                setLoading(false)
                localStorage.setItem('userToken',data.token)
                setlogin(jwtDecode(data.token))
                navigate('/sign-in')
            }
        })
        .catch((error) => {setMsg(error?.response?.data?.message)
            console.log(error?.response?.data?.message)
            setLoading(false)
        })
    }

    let validationScheme = Yup.object({
        name:Yup.string().min(2,'min length is 2 char').max(10,'max length is 10').matches(/^[^\d]+$/, 'City name must not contain any digits').required('name is required'),
        email:Yup.string().email().required("Email pattern incorrect"),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{8,16}$/).required("password pattern incorrect use (A-Z , a-z0-9) 8-16 characters"),
        rePassword:Yup.string().oneOf([Yup.ref('password')]).required("repassword is reuired"),
        phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must only contain digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number can't be more than 15 digits")
        .required("Phone number is required")
    })
    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },
        validationSchema:validationScheme,
        onSubmit:handleRegister
    })

  return (

    <>
    <Navbar></Navbar>
    <div className="register">
        <div className="container">
            <h1>register now</h1>
            <form className='forms' onSubmit={formik.handleSubmit}>
            {msg?<div class="alert alert-danger" role="alert">
                    {msg}
                </div>:''}
            <label>Name : </label>
                <div class="input-group mb-3">
                    <input type="text" id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {/* {alert} */}
                {formik.errors.name && formik.touched.name?  <div class="alert alert-danger" role="alert">
                    name is required
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
                <label>re-password :  </label>
                <div class="input-group mb-3">
                    <input type="password" id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword?  <div class="alert alert-danger" role="alert">
                    re-password isn't same as password
                </div>:''}
                <label>Phone :  </label>
                <div class="input-group mb-3">
                    <input type="number" id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} class="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {formik.errors.phone && formik.touched.phone?  <div class="alert alert-danger" role="alert">
                    phone number is invalid
                </div>:''}
                <div className="fn d-flex justify-content-end">
                    {(formik.errors.email && formik.touched.email) || (formik.errors.password && formik.touched.password) || (formik.errors.rePassword && formik.touched.rePassword) || (formik.errors.name && formik.touched.name) || (formik.errors.phone && formik.touched.phone)?  <div className="button"><button type="submit" className="buttonInactive">Register now</button></div>:
                    <div className="button"><button type="submit" className="btn btn-success">{loading?<i className="fa-solid fa-spin fa-circle-notch"></i>:"Register now"}</button></div>}
                </div>
            </form>
        </div>
    {loading?<Loading></Loading>:''}
    </div>
    </>
  )
}
