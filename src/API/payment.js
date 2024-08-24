import axios from "axios";

let token = localStorage.getItem('userToken')

const currentUrl = window.location.href;

export function onlinepayment({cartId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c64bd8ed0dc0016ceb5d79?url=${currentUrl}`,{shippingAddress},{headers:{token}})
}

export function Cash({cartId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/66c64bd8ed0dc0016ceb5d79`,{shippingAddress},{headers:{token}})
}