import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Sign-in/Navbar'
import icon from '../../IMG/Icon/grocery-store.png'
import { getProduct } from '../../API/getProducts';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import { getCategories } from '../../API/getCategories';
import Slider from "react-slick";
import ItemsHome from '../Categories/ItemsHome';
import Skelaton from '../Skelaton';
import bagsimg from '../../IMG/home component/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.png'
import musicimg from '../../IMG/home component/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import bgImg from '../../IMG/home component/41nN4nvKaAL._AC_SY200_.jpg'
import chairImg from '../../IMG/home component/61cSNgtEISL._AC_SY200_.jpg'
import goldImg from '../../IMG/home component/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import ProductDetails from '../ProductDetails/ProductDetails';


export default function Home() {

  // return (
  //   <div style={{ width: '50%', margin: 'auto' }}>
  //     <Slider ref={sliderRef} {...settings}>
  //       <div><h3>Slide 1</h3></div>
  //       <div><h3>Slide 2</h3></div>
  //       <div><h3>Slide 3</h3></div>
  //       <div><h3>Slide 4</h3></div>
  //       <div><h3>Slide 5</h3></div>
  //       <div><h3>Slide 6</h3></div>
  //     </Slider>
  //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
  //       <button onClick={goToPrev} style={{ marginRight: '10px' }}>Previous</button>
  //       <button onClick={goToNext}>Next</button>
  //     </div>
  //   </div>
  // );


      //title change
      const [title, setTitle] = useState('Home'); 
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

  const sliderRef = useRef(null);

  const settings = {
    dots: false, // Disable default dots
    arrows: false, // Disable default arrows
    focusOnSelect: true, // Focus on selected slide
    slidesToShow: 6, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    speed: 800, // Slide speed
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const settingImg = {
    dots: false, // Disable default dots
    arrows: false, // Disable default arrows
    focusOnSelect: true, // Focus on selected slide
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    speed: 800, // Slide speed
  }

  const ImgRef = useRef(null);

  const goToImgNext = () => {
    ImgRef.current.slickNext();
  };

  const goToImgPrev = () => {
    ImgRef.current.slickPrev();
  };
      //search
      const [search , setsearch] = useState('')
  return (
    <>
      <Navbar></Navbar>
      
      {loading?<Skelaton></Skelaton>:''}
      <div className="home">
        <div className="image-container">
            <div className="image-row">
              <Slider ref={ImgRef} {...settingImg}>
                <img src={bgImg} alt="Image 3" className="image customeImg"/>
                <img src={chairImg} alt="Image 4" className="image customeImg"/>
                <img src={goldImg} alt="Image 3" className="image customeImg2"/>
              </Slider>
                <div className='d-flex justify-content-center'>
                <button className='dot' onClick={goToImgPrev} style={{ marginRight: '10px' }}></button>
                <button className='dot' onClick={goToImgNext}></button>
                </div>
              {/* <img src={bagsimg} alt="Image 3" className="image"/>
              <img src={musicimg} alt="Image 4" className="image"/> */}
            </div>
            <div className="image-row">
              <img src={bagsimg} alt="Image 3" className="image"/>
              <img src={musicimg} alt="Image 4" className="image"/>
            </div>
          </div>
        <Slider ref={sliderRef} {...settings}>
          {CategoriesArr.map(categories => <ItemsHome key={categories?._id} ele={categories}></ItemsHome>)}
        </Slider>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button className='dot' onClick={goToPrev} style={{ marginRight: '10px' }}></button>
              <button className='dot' onClick={goToNext}></button>
            </div>
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
        </div>
        {loading?<Loading></Loading>:''}
      </div>

    </>
  )
}
