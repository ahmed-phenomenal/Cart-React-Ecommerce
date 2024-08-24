import React, { useState , useEffect, useContext} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import icon from '../../IMG/Icon/react-1-logo-black-and-white.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from '../Sign-in/Navbar';
import Loading from '../Loading/Loading';
import { auth } from '../../Context/AuthContext';

export default function ResetPassword() {
            //title change
            const [title, setTitle] = useState('Reset Password'); 
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


//Reset Password
let navigate = useNavigate()
let {setlogin} = useContext(auth)
let [loading,setLoading] = useState(false)
let [msg,setMsg] = useState('')
function handleNewPassword(values){
    setLoading(true)
    console.log(values);
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
    .then(({data}) => {console.log(data);
        if(data.token){
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
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{8,16}$/).required("password pattern incorrect use (A-Z , a-z0-9) 8-16 characters"),
})
let formik = useFormik({
    initialValues:{
        email:'',
        newPassword:'',
    },
    validationSchema:validationScheme,
    onSubmit:handleNewPassword
})

  return (
    <>
    <Navbar/>
    <div className="sign-in" style={{top:"25%"}}>
        <div className="container">
            <h1>Reset now</h1>
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
                <label>New Password :  </label>
                <div class="input-group mb-3">
                    <input type="password" id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} class="form-control" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {formik.errors.password && formik.touched.password?  <div class="alert alert-danger" role="alert">
                    Password pattern is inavalid use (A-Z , a-z0-9) 8-16 characters
                </div>:''}
                <div className="fn d-flex justify-content-end">
                    {(formik.errors.email && formik.touched.email) || (formik.errors.newPassword && formik.touched.newPassword)?  <div className="button"><button type="submit" className="buttonInactive">Reset now</button></div>:
                    <div className="button"><button type="submit" className="btn btn-success">{loading?<i className="fa-solid fa-spin fa-circle-notch"></i>:"Reset now"}</button></div>}
                </div>
            </form>
        </div>
    {loading?<Loading></Loading>:''}
    </div>

    </>
  )
}
