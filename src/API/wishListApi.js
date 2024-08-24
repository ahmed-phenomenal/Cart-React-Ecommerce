import axios from "axios";

let token = localStorage.getItem('userToken')

export function addToWishListApi(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
        headers:{
            token
        }
    })

}

//get cart
export function getWishListApi(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers:{
        token
    }
})
}

//delete
export function deleteWishListApi(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    headers:{
        token
    }
})
}