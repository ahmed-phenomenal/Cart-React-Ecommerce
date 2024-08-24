import React, { useEffect, useState } from 'react'
import Item from '../Item/Item';
import Navbar from '../Sign-in/Navbar'
import icon from '../../IMG/Icon/grocery-store.png'
import { getProduct } from '../../API/getProducts';
import Loading from '../Loading/Loading';
import { getCategories } from '../../API/getCategories';
import Slider from "react-slick";
import ItemsHome from '../Categories/ItemsHome';
import Skelaton from '../Skelaton';

export default function Products() {
      //title change
      const [title, setTitle] = useState('Products'); 
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


    //get API products
    let [productsArr,setproductsArr] = useState([])
    let [loading,setloading] = useState(false)
    let [msg ,setmsg] = useState('')

    async function getAPIProducts(){
      setloading(true)
      let data = await getProduct()
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
      getAPIProducts()
    },[])
    useEffect(() => {
    },[productsArr])

    let [CategoriesArr,setCategoriesArr] = useState([])
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

      var settings = {
        dots:true,
        infinite: true,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 6, // Scroll only 1 image at a time
      };

      //search
      const [search , setsearch] = useState('')
  return (
    <>
      <Navbar></Navbar>
      
      {loading?<Skelaton></Skelaton>:''}
      <div className="container my-5">
        <div className="input-group input flex-nowrap">
          <span className="input-group-text" id="addon-wrapping"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" onChange={(e) => setsearch(e.target.value)} className="form-control form10" placeholder="Search..." aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div className="row g-5">
          {productsArr.filter(product => {
            return search.toLowerCase() === ''? product : product?.title.toLowerCase().includes(search)
          }).map(product => <Item key={product?._id} ele={product}></Item>)}
        </div>
        {/* <div className="card py-3">
          <div className="container">
            <img src={icon} alt="" />
            <div className='title'>fashion</div>
            <div className='name'>shawel</div>
            <div className="d-flex justify-content-between">
              <div className="price">
                170 EGp
              </div>
              <div className="rate">
                <i class="fa-solid fa-star" style={{ color: '#DAA520' }}></i>4.8
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>
                <button>+ Add </button>
              </div>
              <div>
                <i class="fa-solid fa-heart heart" style={{ color: 'black' }}></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {loading?<Loading></Loading>:''}
    </>
  )
}

