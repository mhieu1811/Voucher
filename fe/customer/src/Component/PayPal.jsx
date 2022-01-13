import React, { useEffect, useState,useRef } from 'react';
import '../css/Header.css';
import {useHistory} from 'react-router'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { Form, Input, Button, notification } from 'antd';

export default function Paypal() {
    const history=useHistory();
  var sl=history.location.state.sl;
  var Tong=history.location.state.gia;
  var makhachhang=history.location.state.makhachhang;
  var id=history.location.state.id
  const onCancel=()=>{
    history.push(`/detail/${id}`)
  }
  const paypal=useRef()
    console.log(history.location.state.gia)
    var a= Math.round(history.location.state.gia/ 23) 
    useEffect(()=>{
        window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: a
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(id+" "+Tong+" "+makhachhang)
                Axios.post("https://oka2-hv.herokuapp.com/customer/payment",{ma:id,tong:Tong,sl:sl,maKh:makhachhang})
                  notification['success']({
                      message: 'Thanh toán thành công',
                    });
                    history.push("/");  
        },
        onError: (err) => {
          console.log(err);
          notification['error']({
            message: 'Đã xảy ra lỗi trong quá trình thanh toán',  
          });
        },
      })
      .render(paypal.current);
    },[])
    return(
      <div>
          <div ref={paypal}></div>
          <button onClick={onCancel}>Hủy thanh toán</button>
      </div>
        
        
    )
}
