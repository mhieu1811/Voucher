import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import dateFormat from 'dateformat';
import {DeleteOutlined } from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');

export default function Part(props){

    // const [maVoucher,setMaV]=useState('');
    // const a= ()=>{
    //     return;
    // }
    const styleDelete={
        borderRadius:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48px',
        height: '38px',
        marginLeft:'10px'
    }
    var bool=false
    var bool_1=false
    if(props.tt=='A')
    {
        bool=true
    }
    else if(props.tt=='P')
    {
       bool_1=true
    }

    const history=useHistory();
    const redirect = () => {
        history.push(`/edit/${props.ma}`)
      }
    return(
        <tr>
        <td>{props.ma}</td>
        <td style={{ wordBreak: "break-word" }}>{props.ten}</td>
        <td>{props.slbd}</td>
        <td>{props.sl}</td>
        <td>{props.giatri}</td>
        <td><CurrencyFormat value={props.gia} displayType={'text'} thousandSeparator={true} /> VNĐ</td>
        <td>{props.ban}</td>
        <td>{props.hl}</td>
        <td style={{ maxWidth: "60px" }}>
          
            <button
              className="btn btn-primary"
              hidden={!bool_1}
              onClick={redirect}
              style={{ marginRight: "10px", textTransform: "uppercase" }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger "
              hidden={!bool_1}
              style={{ textTransform: "uppercase" }}
              onClick={async() => {
                const del = await Axios.post("https://oka2-hv.herokuapp.com/partner/delete", {
                  ma: props.ma,  
                });
              }}
            >
              Xóa
            </button>
            
          
          <button 
              className="btn btn-danger"
              hidden={!bool}
              style={{ textTransform: "uppercase" }}
              onClick={async() => {
                console.log(props.ma)
                 const end= await Axios.post("https://oka2-hv.herokuapp.com/partner/end", {
                  ma: props.ma,
                });
                history.go(0)
              }}
              >
                Kết thúc sớm
              </button>
        </td>
      </tr>
        
    )
}