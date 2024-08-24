import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading';

export default function ItemsCategories({ele}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true); // Show the loading indicator
  

      setTimeout(() => {
        setIsLoading(false); // Hide the loading indicator after 3 seconds
        // Here you can add any logic you want to execute after loading
      }, 2000);
    };
  return (
    <>
        <div className="col-lg-4 col-md-6 col-sm-12 my-3" onClick={handleClick}>
              <div className="card"><img src={ele?.image} key={ele?._id} className='img'/>
              <h1 className='name'>{ele?.name}</h1></div>
        </div>
        {isLoading?<Loading></Loading>:''}
    </>
  )
}
