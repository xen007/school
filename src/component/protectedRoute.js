import React, {useState} from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Registration from './registration';

let isLoggedIn = true;
export default function ProtectedRoute(value){
        isLoggedIn = value;
        return isLoggedIn
    }

