import React, { useEffect, useState } from 'react'
import icon from '../../IMG/Icon/wallet.png'
import Navbar from '../Sign-in/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Loading from '../Loading/Loading';
import Skelaton from '../Skelaton';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios'
import { auth } from '../../Context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { useMutation } from '@tanstack/react-query';
import useMutationCart from '../../Hooks/useMutationCart';
import { Cash, onlinepayment } from '../../API/payment';
import useQueryCart from '../../Hooks/useQueryCart';
import { getCartApi } from '../../API/CartApi';
export default function Pay() {
          //title change
          const [title, setTitle] = useState('Pay Now'); 
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

        let { iserror: cartError, error: cartApiError, data: cartData, isLoading: cartLoading } = useQueryCart('getcart', getCartApi);
        let { mutate: onlinePaymentMutate, data: onlinePaymentData } = useMutationCart(onlinepayment);
        let { mutate: cashPaymentMutate, data: cashPaymentData } = useMutationCart(Cash);
        let api = cartData?.data?.data?._id
        function handleSubmit(shippingAddress){
                onlinePaymentMutate({api,shippingAddress})
                cashPaymentMutate({api,shippingAddress})
                console.log(onlinePaymentData);
                console.log(cashPaymentData);
        }
        console.log(onlinePaymentData?.data);
        if(onlinePaymentData?.data?.status === 'success'){
            window.location.href = onlinePaymentData?.data?.session?.url
        }

        let [msg,setMsg] = useState('')
        let validationScheme = Yup.object({
            phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number must only contain digits")
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number can't be more than 15 digits")
            .required("Phone number is required"),
            details: Yup.string()
            .matches(/^[^\d]+$/, 'City name must not contain any digits')
            .min(4, 'Details must be at least 6 characters')
            .required('Details are required'),
            city: Yup.string()
            .matches(/^[^\d]+$/, 'City name must not contain any digits')
            .min(5, 'City name must be at least 6 characters')
            .required('City is required')
        });
    let formik = useFormik({
        initialValues:{
            details: '',
            phone: '',
            city: ''
        },
        validationSchema:validationScheme,
        onSubmit:handleSubmit
    })
  return (
    <>
        <Navbar></Navbar>
        <div className="pay">
            <div className="container">
                <form className='forms' onSubmit={formik.handleSubmit}>
                <label>Details </label>
                    <div class="input-group mb-3">
                        <input type="text" id='details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} class="form-control" placeholder="Details" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    {formik.errors.details && formik.touched.details?  <div class="alert alert-danger" role="alert">
                        details is required
                    </div>:''}

                    <label>Phone </label>
                    <div class="input-group mb-3">
                        <input type="number" id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} class="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    {formik.errors.phone && formik.touched.phone?  <div class="alert alert-danger" role="alert">
                        phone is required , check pattern(01.....)
                    </div>:''}

                    <label>City </label>
                    <div class="input-group mb-3">
                        <input type="text" id='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} class="form-control" placeholder="City" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    {formik.errors.city && formik.touched.city?  <div class="alert alert-danger" role="alert">
                        city pattern is incorrect
                    </div>:''}
                    {formik.errors.details && formik.touched.details || formik.errors.phone && formik.touched.phone || formik.errors.city && formik.touched.city?<button className='btn7 my-5'>pay now</button>:<button type="submit" class="btn btn-outline-info btn6 my-5">pay now</button>}
                    
                </form>
            </div>
        </div>
        {/* {loading?<Skelaton></Skelaton>:''}
        {loading?<Loading></Loading>:''} */}
    </>
  )
}
