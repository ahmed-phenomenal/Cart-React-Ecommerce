import React from 'react'

export default function ItemsHome({ele}) {
  return (
    <>
        <div className="change">
            <img src={ele?.image} key={ele?._id} className='img1'/>
            <h1 className='name1'>{ele?.name}</h1>
        </div>
    </>
  )
}
