
import './App.css'
import Signin from './Components/Sign-in/Sign-in'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Home from './Components/Home/Home'
import Error from './Components/Error/Error'
import Forget from './Components/ForgetPassword/Forget'
import ResetCode from './Components/ForgetPassword/ResetCode'
import ResetPassword from './Components/ForgetPassword/ResetPassword'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import WishList from './Components/WishList/WishList'
import Products from './Components/Products/Products'

function App() {

let routes = createBrowserRouter([
  {path:'/' , element:<Layout></Layout> , children:[
    {index:true , element:<Signin></Signin>},
    {path:'/register' , element:<Register></Register>},
    {path:'/sign-in' , element:<Signin></Signin>},
    {path:'/forget' , element:<Forget></Forget>},
    {path:'/reset-code' , element:<ResetCode></ResetCode>},
    {path:'/reset-password' , element:<ResetPassword></ResetPassword>},
    {path:'/home' , element:<ProtectedRoute><Home></Home></ProtectedRoute>},
    {path:'/categories' , element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
    {path:'/brands' , element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
    {path:'/cart' , element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
    {path:'/wish-list' , element:<ProtectedRoute><WishList></WishList></ProtectedRoute>},
    {path:'/products' , element:<ProtectedRoute><Products></Products></ProtectedRoute>},
    {path:'/pay' , element:<ProtectedRoute><Pay></Pay></ProtectedRoute>},
    {path:'/product-details/:id' , element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
    {path:'*' , element:<Error></Error>},
  ]}
])

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
