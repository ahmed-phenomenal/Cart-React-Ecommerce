import axios from 'axios'
export async function getProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    return data
}