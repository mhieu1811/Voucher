import '../css/ListVoucher_kh.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import Voucher from '../Component/Voucher';
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
export default function ListV(props) {

    const [Detail,setDetail]=useState([]);
    
    const ma = sessionStorage.getItem('maUser');
    useEffect(()=>{
        Axios.post("https://oka2-hv.herokuapp.com/customer/list_kh",{ma:ma}).then((respone)=>{
            setDetail(respone.data) 
            console.log(Detail)
        })
    },[])    
    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${ma}`)
      }
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-4">
                <div className="trai_kh">
                    <h3 className="text-center" style={{marginTop:'16px'}}>Thông Tin Cá Nhân</h3>
                    <p className="kh_font"><b>Mã Khách Hàng:</b> {ma}</p>
                </div>
            </div>
            <div className="col-lg-8">
                <ul>
                {Detail.map((val)=>{
                return <Voucher key={val.MaVoucher} ma={val.MaVoucher} mamua={val.MaMua}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayCoHieuLuc} edate={val.NgayHetHieuLuc} ngay={val.ngay}sl={val.SoLuong} ></Voucher>
            })} 
                </ul>
            
            </div>
        </div>
    </div>
    )
}