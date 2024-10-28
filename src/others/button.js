import React from 'react';
import {Button} from '@mui/material';

export default function Buton(props) {


const {text, size, color, variant, onClick, ...other} = props

  return (
    <Button variant = {variant || 'outlined'} size = {size || "small"} color = {color || "primary"} onClick={onClick} {...other}  style={{backgroundColor:'tomato', color:"white"}}>{text}</Button>
  )
}
