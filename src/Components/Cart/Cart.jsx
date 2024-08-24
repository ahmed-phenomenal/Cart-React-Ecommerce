import React, { useEffect, useState } from 'react'
import icon from '../../IMG/Icon/grocery-store.png'
import Navbar from '../Sign-in/Navbar';
import useQueryCart from '../../Hooks/useQueryCart';
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../../API/CartApi';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useMutationCart from '../../Hooks/useMutationCart';
import Skelaton from '../Skelaton';

export default function Cart() {
        //title change
        const [title, setTitle] = useState('Cart'); 
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

      let {iserror , error , data , isLoading} = useQueryCart('getcart' , getCartApi)

      let {mutate:delmutate,status:del , isPending:delpending} = useMutationCart(deleteCartApi)
      let {mutate:updmutate,status:update , isPending:updpending} = useMutationCart(updateCartApi)
      let {mutate:clearmutate,status:clear , isPending:clearpending} = useMutationCart(clearCartApi)
      if(del === 'success')
        console.log("done");
      if(del === 'error')
        console.log("error");
      if(update === 'success')
        console.log("updated");
      if(clear === 'success')
        console.log("done");
  return (
    <>

      <Navbar></Navbar>
      <div className="cart">
        <div className="container">
          <div className="elements p-5">
            <table>
              <tr style={{ borderBottom: '5px solid transparent' }}>
                  <td className='textleft'><h1>Cart Shop</h1></td>
                  {data?.data?.numOfCartItems?<td className='textright'><Link to={"/pay"}><button className='btn btn-primary btn1'>Check out</button></Link></td>:''}
              </tr>
              <tr style={{ borderBottom: '5px solid transparent' }}>
                {data?.data?.numOfCartItems?<><td className='textleft py-3'><p>total price : <span style={{ color: '#22DB14' }}>{data?.data?.data?.totalCartPrice}</span></p></td>
                  <td className='textright py-3'><p>total number of items: <span style={{ color: '#22DB14' }}>{data?.data?.numOfCartItems}</span></p></td></>
                  :
                  <><td className='textleft py-3'><h1>Your Cart Is Empty</h1></td>
                  </>}
              </tr>
            <tbody>
              {data?.data?.data?.products.map((ele) =>  <tr key={ele?.product?._id} className='position-relative'>
                <td className='textleft py-3'>
                  <img src={ele?.product?.imageCover} className='d-inline-block'/>
                  <div className='td'>
                    <p style={{margin:"0 0"}}>{ele?.product?.title}</p>
                    <p style={{fontSize:" 16px"}}>{ele?.price} EGP</p>
                    <p className='red' onClick={() => {delmutate(ele?.product?._id)}}><i class="fa-solid fa-trash mx-1"></i>Remove</p>
                  </div>
                </td>

                <td className='textright py-3'>
                  <button onClick={() => {updmutate({id:ele?.product?._id , count:ele?.count +1})}} className='mx-3 btn2'>+</button>
                  {ele?.count}
                  <button onClick={() => {
                    {ele?.count==1?delmutate(ele?.product?._id):updmutate({id:ele?.product?._id , count:ele?.count?ele?.count-1:ele?.count})}
                    }} className='mx-3 btn2'>-</button>
                </td>
              </tr>)}

              {data?.data?.numOfCartItems?<>
              <tr className='position-relative tr' style={{ borderBottom: '5px solid transparent' }}>
                <td><button onClick={() => {clearmutate()}} className='btn3 my-4'>Clear Your Cart</button></td>
              </tr>
              
              </>:''}
            </tbody>
        </table>

          </div>
        </div>
      </div>
      {isLoading?<Skelaton></Skelaton>:''}
      {isLoading || delpending || updpending || clearpending?<Loading></Loading>:''}
    </>
  )
}
