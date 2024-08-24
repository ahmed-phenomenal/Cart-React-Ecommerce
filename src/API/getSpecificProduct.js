import axios from 'axios'
export async function getSpecificProduct(productId){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    return data
}