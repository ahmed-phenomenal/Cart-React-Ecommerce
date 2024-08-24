import React, { useState , useEffect} from 'react'
import img from '../../IMG/Error/404-status-code.png'
import icon from '../../IMG/Error/error-404.png'

export default function () {
            //title change
            const [title, setTitle] = useState('Error 404 --- Not Found'); 
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
  return (
    <>
        <img className='ErrorImage' src={img}/>
    </>
  )
}
