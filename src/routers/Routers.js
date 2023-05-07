import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../admin/Dashboard'
import AllProducts from './../admin/AllProducts';
import AddProducts from './../admin/AddProducts';
import Users from './../admin/Users';
import PrivacyPolicy from '../pages/PrivacyPolicy'

const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="shop/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />



            <Route path="/*" element={<ProtectedRoute />}>
                <Route path='checkout' element={<Checkout />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='dashboard/all-products' element={<AllProducts />} />
                <Route path='dashboard/add-product' element={<AddProducts />} />
                <Route path='dashboard/users' element={<Users />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Routes>
    )
}

export default Router