import React, { useEffect, useState} from 'react'
import '../css/Payment.css'
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
var CurrencyFormat = require('react-currency-format');

export default function Payment(props){
    const {id}=props.match.params;
    const [Detail,setDetail]=useState('');
    const [Tong, setTong]=useState(0);
    const [sl, setSL]=useState(0);
    const [sl_1, setSL_1]=useState(0);
    useEffect(()=>{
        Axios.post("http://localhost:9000/customer/details",{ma:id}).then((respone)=>{
            setDetail(respone.data) 
            setTong(respone.data.GiaTien)
            setSL_1(respone.data.SoLuong)
        })
        setSL(1)
        console.log(Tong)
    },[])
    const history=useHistory();


    
    var int
    var A=Detail.GiaTien;
        const onClickPlus=()=> {
            int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            if(sl_1>int)
            {
                int++;
                A=A*int
                document.getElementById('so').value=int;
                setTong(A)
                setSL(int)
            }
            

        }
    
        const onClickMinus=()=> {
            int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            if(int>1 )
            {
                int--;
                A=A*int
                document.getElementById('so').value=int;
                setTong(A)
                setSL(int)
            }
            

        }
        const onClick=()=>{
            if(sl<sl_1)
            {
                Axios.post("http://localhost:9000/customer/payment",{ma:id,tong:Tong,sl:sl})
                history.push("/")
            }
            

        }
        const [listvoucher,setlistVoucher]=useState()
        return(
            <div className="form-include" >
            <div className="form ">
                <div className="form-img">
                    <img src={Detail.Hinh} width="100px" height="105px" />
                </div>
                <div className="form-desc">
                    <h3 className="form-desc-heading">{Detail.TenVoucher} giảm {Detail.GiaTriSuDung}%</h3>
                    <p className="form-desc-time">Hạn sử dụng:        {dateFormat(Detail.NgayBatDau, 'dd/mm/yyyy')} - {dateFormat(Detail.NgayKetThuc, 'dd/mm/yyyy')}</p>
                    <p className="form-price-text" id="price"  >Đơn giá: <CurrencyFormat value={Detail.GiaTien} displayType={'text'} thousandSeparator={true}/> VNĐ</p>
                    <p className="form-price-quality">Số lượng:</p>
                    <button type="button" className="form-price-btn-tru" onClick={onClickMinus}>-</button>
                    <input type="text" className="form-price-input" id="so" disabled={true} defaultValue={1}/>
                    <button className="form-price-btn-cong"  onClick={onClickPlus}>+</button>
                </div>
                
                
            </div>
            <div className="form-total">
                <h3 className="total-price"><CurrencyFormat value={Tong} displayType={'text'} thousandSeparator={true}/> VNĐ</h3>
                <button type="button" className="btn-buy" onClick={onClick}>Thanh Toán</button>
            </div>
        </div>
        )
    }


