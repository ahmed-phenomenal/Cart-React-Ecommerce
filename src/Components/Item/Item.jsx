import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import { addToCartApi } from '../../API/CartApi'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { addToWishListApi, getWishListApi } from '../../API/wishListApi'
import useQueryWishList from '../../Hooks/useQueryWishList'
import Skelaton from '../Skelaton'

export default function Item({ele}) {
    // let [loading,setloading] = useState(false)
    let {status:statuscart,mutate:mutatecart , isPending:pendingcart} = useMutation({mutationFn:addToCartApi})
    if(statuscart == 'success'){
        console.log('added');
        toast.success("It has Been Successefully added 🚅", {
            theme: "colored",
        })
    }
    if(statuscart == 'error'){
        console.log('error');
    }
    let {status:statuswishlist,mutate:mutatewishlist , isPending:pendingwish} = useMutation({mutationFn:addToWishListApi})
    if(statuswishlist === 'success'){
        console.log("adddddddded");
        toast.success("It has Been Successefully added ❤️", {
            theme: "colored",
        })
    }
    let {iserror , error , data , isLoading} = useQueryWishList('getwishlist' , getWishListApi)
    const ids = data?.data?.data?.map((arr) => {
        return arr?.id;       // Return the ID to create a new array of IDs
    });
    const checkIfInIds = (ids, eleId) => {
        let color = false;
        if (ids) { // Check if ids is not undefined or null
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === eleId) {
                    color = true;
                    break; // Exit the loop once a match is found
                }
            }
        }
        return color;
    };
    const isColorRed = checkIfInIds(ids, ele.id);

        // State to manage the color of the icon
        const [isRed, setIsRed] = useState(false);

        // Function to toggle the color state
        const handleClick = () => {
            setIsRed(true);
        };


        const [isAnimating, setIsAnimating] = useState(false);
        const handleClick2 = () => {
            // Trigger the animation by adding the 'jump' class
            setIsAnimating(true);
    
            // Remove the 'jump' class after the animation completes
            setTimeout(() => {
                setIsAnimating(false);
            }, 700); // 300ms matches the animation duration in CSS
        };
  return (
    <>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card py-3">
                        <div className="container">
                        <Link to={`/product-details/${ele._id}`}>
                                <img src={ele?.imageCover} alt="" />
                                <div className='name'>{ele?.category?.name}</div>
                                <div className='title'>{ele?.title}</div>
                                <div className="d-flex justify-content-between">
                                    <div className="price">
                                        {ele?.price} EGP
                                    </div>
                                    <div className="rate">
                                        <i class="fa-solid fa-star" style={{ color: '#DAA520' }}></i>{ele?.ratingsAverage}
                                    </div>
                                </div>
                        </Link>
                                <div className="d-flex justify-content-between my-3">
                                    <div>
                                        <button className='button1' onClick={() => {mutatecart(ele._id)}}>+ Add </button>
                                    </div>
                                    <div>
                                    {isColorRed?
                                    <i key={ele._id} onClick={() => {handleClick2()}} className={`fa-solid fa-heart heart ${isAnimating? 'jump' : ''}`} style={{color:`red`}}></i>:
                                    <i key={ele._id} onClick={() => {mutatewishlist(ele._id);handleClick();handleClick2()}} className={`fa-solid fa-heart heart ${isAnimating? 'jump' : ''}`} style={{color:`${isRed?"red":"black"}`}}></i>}
                                    </div>
                            </div>
                        </div>
                    </div>
            </div>
            {isLoading?<Skelaton></Skelaton>:''}
            {pendingcart || pendingwish ?<Loading></Loading>:''}
    </>
  )
}
