import React, { useState, useEffect} from 'react';
import '../css/Header.css';
import '../css/Search.css';
import { DatePicker,Button ,Select, Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import Header from '../Component/Header';
import Slider from '../Component/Slider';
import Footer from '../Component/Footer';
import Voucher from '../Component/Voucher';
import Voucher_1 from '../Component/Voucher_1';
import Axios from 'axios'
const { Option } = Select;  

export default function Home() {
    const [listtt,setlistt]=useState([]);
    const [list_s,setlist_s]=useState([]);
    const [search,setSearch]=useState(false);
    const [input, setInput]=useState('')
    const [date, setDate] =useState('');
    const { RangePicker } = DatePicker;
    useEffect(async()=>{
      const ds = await Axios.get("https://oka2-hv.herokuapp.com/customer/list").then((respone)=>{ return respone.data})
      
      setlistt(ds)

    },[listtt])   
    const test =()=>{
      Axios.post("http://localhost:9000/api/payment",{mamua:"MM4"})
    }
    const onClick=async ()=>{
      const search = await Axios.post("https://oka2-hv.herokuapp.com/customer/search",{date:date,text:input}).then((respone)=>{ return respone.data})
      setSearch(true)
      setlist_s(search)      
    console.log(search)}
      const onChange=(value)=>{
            var temp=[...value]
            setDate(temp)
          }
      const onChange_1=(e)=>{
        setInput(e.target.value)
      }
      const onRefresh=()=>{
        setSearch(false)
      }
    return(
        <div>
            
            <Slider/>
            <div className="search">
              <div className="form-control">
                <div className="form-left">
                  <ul className="select-items">
                    <li><a href="1">Voucher</a></li>
              
                  </ul>
                </div>
              <div className="form-right">
              <div className="form-item">
                <div className="form-item-label"> 
                <a href="1">Tìm kiếm voucher</a></div>
                <div className="form-item-input"></div>
              </div>
              <div className="form-item">
                
                <div className="form-item-input">
                  {/* <Select
                      // dropdownClassName="certain-category-search-dropdown"
                      // dropdownMatchSelectWidth={500}
                      style={{
                          width: '100%',
                      }}
                      
                      onChange={(value) => {
                          setSearch(value)
                          
                        }} 
                      // value={}
                  >
                      <Option value="Hồ Chí Minh">TP.Hồ Chí Minh</Option>
                      <Option value="Hà Nội">Hà Nội</Option>
                  </Select> */}
                  <div className="form-item-label"><p>Tên Voucher:</p></div>
                <div className="form-item-input"><Input onChange={onChange_1}/></div>
                </div>
              </div>
              <div className="form-item">
                <div className="form-item-label"><p>Hạn Sử Dụng:</p></div>
                <div className="form-item-input"><RangePicker onChange={onChange}/></div>
              </div>
              <Button onClick={onRefresh}></Button>
              <Button style={{backgroundColor:'#f96d01',color:'#fff',width:'218px',height:'38px',marginTop:'16px'}} onClick={onClick} className="search-btn">Tìm Voucher</Button>               
          </div>
        </div>
    </div>
    <button onClick={test}></button>
    <ul className="vouchers">
      {search? (list_s.map((val)=>{
               return <Voucher_1 key={val.MaVoucher} ma={val.MaVoucher}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayCoHieuLuc} edate={val.NgayHetHieuLuc} price={val.GiaTien} ></Voucher_1> 
             })):(listtt.map((val)=>{
              return <Voucher_1 key={val.MaVoucher} ma={val.MaVoucher}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayCoHieuLuc} edate={val.NgayHetHieuLuc} price={val.GiaTien} ></Voucher_1> 
            }))}
    </ul>
             
      <div>

      </div>
      </div>

    )
}