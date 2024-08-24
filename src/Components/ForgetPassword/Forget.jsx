import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import icon from '../../IMG/Icon/react-1-logo-black-and-white.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from '../Sign-in/Navbar';
import Loading from '../Loading/Loading';

export default function Forget() {
    //title change
    const [title, setTitle] = useState('Forget Password'); 
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

//Forget
let navigate = useNavigate()
let [loading,setLoading] = useState(false)
let [msg,setMsg] = useState('')
async function handleForget(values){
    try{
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
        console.log(data);
        if(data.statusMsg === 'success'){
            navigate('/reset-code')
        }
    }
    catch(error){
        setMsg(error?.response?.data?.message)
        setLoading(false)
    }
}
let validationScheme = Yup.object({
    email:Yup.string().email().required("Email pattern incorrect"),
})
let formik = useFormik({
    initialValues:{
        email:'',
    },
    validationSchema:validationScheme,
    onSubmit:handleForget
})



return (
    <>
    <Navbar/>
    <div className="container">
        <div className="forget">
            <h1>please enter your verification code</h1>
            <form className='forms' onSubmit={formik.handleSubmit}>
            {msg?<div class="alert alert-danger" role="alert">
                    {msg}
                </div>:''}
                <div class="input-group mb-3">
                    <input type="text" id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {/* {alert} */}
                {formik.errors.email && formik.touched.email?  <div class="alert alert-danger" role="alert">
                    Email Pattern is incorrect
                </div>:''}
                <button type="submit" className="btn btn-outline-success">Verify</button>
            </form>
        </div>
    {loading?<Loading></Loading>:''}
    </div>

    </>
  )
}
