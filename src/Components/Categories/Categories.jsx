import React, { useEffect, useState } from 'react'
import Navbar from '../Sign-in/Navbar'
import icon from '../../IMG/Icon/grocery-store.png'
import Loading from '../Loading/Loading';
import { getCategories } from '../../API/getCategories';
import ItemsCategories from './ItemsCategories';
import Skelaton from '../Skelaton';

export default function Categories() {
          //title change
          const [title, setTitle] = useState('Categories'); 
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
    
        var settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 7,
            slidesToScroll: 6
          };
        //get API products
        let [CategoriesArr,setCategoriesArr] = useState([])
        let [loading,setloading] = useState(false)
        let [msg ,setmsg] = useState('')
    
        async function getAPICategories(){
          setloading(true)
          let data = await getCategories()
          if(data?.data){
            setCategoriesArr(data?.data)
            setmsg('')
          setloading(false)
          }
          else{
            setmsg(data)
          setloading(false)
          }
        }
    
        useEffect(() => {
          getAPICategories()
        },[])
        useEffect(() => {
        },[CategoriesArr])
    
  return (
    <>
    <Navbar></Navbar>
    {loading?<Skelaton></Skelaton>:''}
    <div className="container categories">
        <div className="row g-4">
            {CategoriesArr.map(categories => <ItemsCategories key={categories?._id} ele={categories}></ItemsCategories>)}
        </div>
    </div>
    {loading?<Loading></Loading>:''}

    </>
  )
}
