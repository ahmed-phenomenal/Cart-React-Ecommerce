import React, { useEffect, useState } from 'react'
import Navbar from '../Sign-in/Navbar'
import  axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import icon from '../../IMG/Icon/badge.png'
import Loading from '../Loading/Loading';
import Skelaton from '../Skelaton'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Brands() {
        //title change
        const [title, setTitle] = useState('Brands'); 
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

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {isError,error,isLoading,data} = useQuery({queryKey:'getBrands',queryFn:getBrands})

  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const handleImageClick = (src,name) => {
    setSelectedImage(src);
    setSelectedName(name);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <>
        <Navbar></Navbar>
        {isLoading?<Skelaton></Skelaton>:''}
        <div className="brands">
          <h1>All Brands</h1>
          <div className="container">
            <div className="row g-5">
              {data?.data?.data.map(ele => <div key={ele?._id} className='col-xl-3 col-lg-4 col-md-6 col-sm-12' >
                <div className="card">
                  <img src={ele?.image} onClick={() => { handleShow(); handleImageClick(ele?.image,ele?.name); }} alt={ele?.name}/>
                  <p>{ele?.name}</p>
                </div>
              </div>)}
            </div>

          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="d-flex justify-content-between">
                        <div className='d-flex flex-column justify-content-center'>
                          <h2 style={{color:"#4fa74f"}}>{selectedName}</h2>
                          <p>{selectedName}</p>
                        </div>
                        <div>
                          <img src={selectedImage}/>
                        </div>
                      </div>
 
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
        {isLoading?<Loading></Loading>:''}
    </>
  )
}
