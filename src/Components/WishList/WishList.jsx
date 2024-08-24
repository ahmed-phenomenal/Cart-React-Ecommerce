import React, { useEffect, useState } from 'react'
import Navbar from '../Sign-in/Navbar'
import icon from '../../IMG/Icon/star1.png'
import { deleteWishListApi, getWishListApi } from '../../API/wishListApi';
import useQueryWishList from '../../Hooks/useQueryWishList';
import Loading from '../Loading/Loading';
import Skelaton from '../Skelaton';
import useMutationWishList from '../../Hooks/useMutationWishList';
import { useMutation } from '@tanstack/react-query';
import { addToCartApi } from '../../API/CartApi';
import { toast } from 'react-toastify';
export default function WishList() {
          //title change
          const [title, setTitle] = useState('Wish List'); 
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

        let {status:statuscart,mutate:mutatecart,isPending:pendingcart} = useMutation({mutationFn:addToCartApi})
        if(statuscart == 'success'){
            toast.success("It has Been Successefully added 🚅", {
                theme: "colored",
            })
        }

      let {iserror , error , data , isLoading} = useQueryWishList('getwishlist' , getWishListApi)

        let {mutate:delmutate,status:del,isPending:remowewish} = useMutationWishList(deleteWishListApi)
  return (
    <>
        <Navbar></Navbar>
        {isLoading?<Skelaton></Skelaton>:''}
        <div className="cart">
            <div className="container">
                <div className="elements p-5">
                    <table>
                        <tr style={{ borderBottom: '5px solid transparent' }}>
                            <td className='textleft'><h1>Wish List</h1></td>
                        </tr>
                        <tbody>
                        {data?.data?.data.map((ele) =>  <tr key={ele?.id} className='position-relative'>
                            <td className='textleft py-3'>
                            <img src={ele?.imageCover} className='d-inline-block'/>
                            <div className='td'>
                                <p style={{margin:"0 0"}}>{ele?.title}</p>
                                <p style={{fontSize:" 16px" , color:"#198754"}}>{ele?.price} EGP</p>
                                <p className='red' style={{fontSize:" 14px"}} onClick={() => {delmutate(ele?._id);}}><i class="fa-solid fa-trash mx-1"></i>Remove</p>
                            </div>
                            </td>
                            <td className='textright py-3'>
                                <button onClick={() => {mutatecart(ele?._id)}} className='btn4'>add to cart</button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        {isLoading || pendingcart || remowewish?<Loading></Loading>:''}
    </>
  )
}
