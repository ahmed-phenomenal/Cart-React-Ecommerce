import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Sign-in/Navbar'
import icon from '../../IMG/Icon/grocery-store.png'
import { getSpecificProduct } from '../../API/getSpecificProduct';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useMutation } from '@tanstack/react-query';
import { addToCartApi } from '../../API/CartApi';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import { addToWishListApi, getWishListApi } from '../../API/wishListApi';
import useQueryWishList from '../../Hooks/useQueryWishList';

export default function ProductDetails() {
        //title change
        const [title, setTitle] = useState('Product Details'); 
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



    //API get id
    let [productsArr,setproductsArr] = useState([])
    let [loading,setloading] = useState(false)
    let [msg ,setmsg] = useState('')
    let {id} = useParams()

    async function getSpecificProductApi(){
        setloading(true)
        let data = await getSpecificProduct(id)
        if(data?.data){
          setproductsArr(data?.data)
          setmsg('')
        setloading(false)
        }
        else{
          setmsg(data)
        setloading(false)
        }
    }

    useEffect(() => {
        getSpecificProductApi()
    },[])

    useEffect(() => {
    },[productsArr])

let {status,mutate,isPending} = useMutation({mutationFn:addToCartApi})
    if(status == 'success'){
        toast.success("It has Been Successefully added 🚅", {
            theme: "colored",
        })
    }

        let {status:statuswishlist,mutate:mutatewishlist , isPending:pendingwish} = useMutation({mutationFn:addToWishListApi})
        if(statuswishlist === 'success'){
            toast.success("It has Been Successefully added ❤️", {
                theme: "colored",
            })
        }
        
  const sliderRef = useRef(null);

  const settings = {
    dots: false, // Disable default dots
    arrows: false, // Disable default arrows
    focusOnSelect: true, // Focus on selected slide
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    speed: 800, // Slide speed
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

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
    const isColorRed = checkIfInIds(ids, productsArr._id);

    
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
        <Navbar></Navbar>
        <div className="card1">
            <div className="row py-3">
                <div className="col-lg-4">
                    <Slider ref={sliderRef} {...settings}>
                        <img src={productsArr?.images?.[0]}/>
                        <img src={productsArr?.images?.[1]}/>
                        <img src={productsArr?.images?.[2]}/>
                        <img src={productsArr?.images?.[3]}/>
                    </Slider>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button className='dot' onClick={goToPrev} style={{ marginRight: '10px' }}></button>
                        <button className='dot' onClick={goToNext}></button>
                    </div>
                </div>
                <div className="col-lg-7 py-5">
                    <div className="title">
                        {productsArr?.title}
                    </div>
                    <div className='py-2'>{productsArr?.description}</div>
                    <div className="d-flex justify-content-between">
                        <div className="price">
                            {productsArr?.price} EGP
                        </div>
                        <div className="rate">
                            <i class="fa-solid fa-star" style={{ color: '#DAA520' }}></i>{productsArr?.ratingsAverage}
                        </div>
                    </div>
                    <div className="d-flex position-relative justify-content-between my-3">
                        <div>
                            <button className='position-absolute btn1' onClick={() => {mutate(productsArr._id)}}>+ Add </button>
                        </div>
                        <div>
                            {isColorRed?<i onClick={() => {handleClick2()}} className={`fa-solid fa-heart heart ${isAnimating? 'jump' : ''}`} style={{ color: 'red',cursor:"default" }}></i>
                            :
                            <i className={`fa-solid fa-heart heart ${isAnimating? 'jump' : ''}`} onClick={() => {mutatewishlist(productsArr._id);handleClick();handleClick2()}} style={{ color: `${isRed?"red":"black"}`,cursor:"pointer" }}></i>}
                        </div>
                    </div>
                </div>
            </div>
            {loading || pendingwish || isPending?<Loading></Loading>:''}  
        </div>  
    </>
  )
}
