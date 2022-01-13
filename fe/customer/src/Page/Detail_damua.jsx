import '../css/Detail.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';

import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');
export default function Detail_damua(props) {
    const {id}=props.match.params;
    const {ma}=props.match.params;
    const [Detail,setDetail]=useState('');
    const [DiaChi,setDiaChi]=useState([]);
    const [DieuKien,setDieuKien]=useState([])
    useEffect(()=>{
        Axios.post("https://oka2-hv.herokuapp.com/customer/details_kh",{ma:id}).then((respone)=>{
            setDetail(respone.data) 
            console.log(respone.data.MaVoucher)
            
        })
        Axios.post("https://oka2-hv.herokuapp.com/customer/details_dc",{ma:ma}).then((respone)=>{
                setDiaChi(respone.data) 
            })  
        Axios.post("https://oka2-hv.herokuapp.com/customer/details_dk",{ma:ma}).then((respone)=>{
                
            if(!respone.data.length)
            {
                setDieuKien([...DieuKien,"Không có điều kiện cho Voucher này "])
            }
            else
            {
                setDieuKien(respone.data)
            }
            })
    },[])    

    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${id}`)
      }
    console.log(DieuKien)

    return (
        
        <div style={{marginTop:'30px'}} className="detail">
            <div className="container"style={{width:'1000px'}}> 
                <div className="row detail-all">
                    <div className="col-lg-3 detail-img">
                        <div class="col--detail--1">
                        <img src={Detail.Hinh} width="240px" height="105px"/>    
                        </div>
                    </div>
                    <div className="col-lg-9">
                        
                        <p className="detail-ten">{Detail.TenVoucher} giảm {Detail.GiaTriSuDung}%</p>
                        <p className="detail-tloai">{Detail.MaLoaiVoucher}</p>
                        <p className="detail-dieukien">Hạn sử dụng:        {dateFormat(Detail.NgayCoHieuLuc, 'dd/mm/yyyy')} - {dateFormat(Detail.NgayHetHieuLuc, 'dd/mm/yyyy')}</p>
                        <p className="detail-gia">Số lượng: {Detail.SoLuong}</p>
                        <Form.Item
                            className="form__row"
                            label="Điều kiện:"
                        >
                            {DieuKien.map((val)=>{
                                if(DieuKien[0]=="Không có điều kiện cho Voucher này ")
                                {
                                    return <p>Không tồn tại điều kiện cho vouhcer này</p>
                                }
                                else
                                {
                                    if(val.LoaiDieuKien=='A ')
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Giá tối thiểu cần đạt khi đặt phòng: <CurrencyFormat value={val.GiaTri} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                                    }
                                    else
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Số đêm tối thiểu cần đặt: {val.GiaTri} đêm </p>
                                    }
                                }                               
                            })}
                        </Form.Item>
                        <Form.Item
                            className="form__row"
                            label="Địa điểm áp dụng:"
                        >
                            {DiaChi.map((val)=>{
                                return <p  style={{font:'14px'},{marginTop:'5px'}} >Số {val.So}, Đường {val.TenDuong} Quận {val.TenQuan} Thành phố {val.TenTP}</p>
                            })}
                        </Form.Item>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
