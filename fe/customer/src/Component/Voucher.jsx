import React,{Component, useState} from 'react';
import '../css/Voucher_1.css';
import dateFormat from 'dateformat'
import { EnvironmentOutlined } from '@ant-design/icons';
import Axios from "axios";
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');

export default function Voucher(state){ 
    const history=useHistory()
    const[MaV,setMaV]=useState('')
    const onClick=()=>{ 
      
            history.push(`/detail_mua/${state.mamua}/${state.ma}`)
         
    }
    return (
        <li>
            <a onClick={onClick}>
                <div className="voucher">
                    <a>
                        <img className="vc-img" src={state.hinh} alt="ảnh voucher" />
                    </a>
                    <div className="vc-name">
                        <a>{state.title}</a>
                    </div>
                    
                    <div className="vc-ngaybd">{dateFormat(state.sdate,"dd/mm/yyyy")} - {dateFormat(state.edate,"dd/mm/yyyy")}</div>
                    <div className="vc-ngaybd">Ngày mua: {dateFormat(state.ngay,"dd/mm/yyyy")} </div>
                    <div className="vc-gia">
                        <span>Số lượng: {state.sl}</span>
                    </div>
                </div>
            </a>
        </li>
    )
    
}
