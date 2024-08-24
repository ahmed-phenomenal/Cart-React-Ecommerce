import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import icon from '../../IMG/Icon/react-1-logo-black-and-white.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from '../Sign-in/Navbar';
import Loading from '../Loading/Loading';

export default function ResetCode() {
        //title change
        const [title, setTitle] = useState('Reset Code'); 
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
    async function handleSubmit(values){
        try{
            setLoading(true)
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
            console.log(data);
            if(data.status === 'Success'){
                setLoading(false)
                navigate('/reset-password')
            }
        }
        catch(error){
            setMsg(error?.response?.data?.message)
            setLoading(false)
            console.log(error);
        }
    }
    let formik = useFormik({
        initialValues:{
            resetCode:'',
        },
        onSubmit:handleSubmit
    })


  return (
    <>
        <Navbar/>
    <div className="container">
        <div className="forget">
            <h1>reset your account password</h1>
            <form className='forms' onSubmit={formik.handleSubmit}>
                <div class="input-group mb-3">
                    <input type="text" id='resetCode' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} class="form-control" placeholder="Code" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <button type="submit" className="btn btn-outline-success">Verify</button>
            </form>
        </div>
    </div>
    {loading?<Loading></Loading>:''}

    </>
  )
}
