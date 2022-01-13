import React,{useEffect,useState} from 'react';
import '../css/Manage.css';
import Axios from 'axios'
import Part from "../Component/Part"
import dateFormat from 'dateformat';
import {SearchOutlined,PlusOutlined   } from '@ant-design/icons'

export default function Manage() {

    const [list,setlist]=useState([]);
    const [search, setSearch]=useState('');
    var maP = sessionStorage.getItem('maUser');
    console.log(maP)
    useEffect(async()=>{
            const ds = await Axios.post("https://oka2-hv.herokuapp.com/admin/list").then((respone)=>{return respone.data})
                setlist(ds)
    },[list])
    const onChange=(e)=>{
        setSearch(e.target.value)
    }

    async function onClick(){
        const ds_search = await Axios.post("https://oka2-hv.herokuapp.com/admin/search",{ma:search}).then((respone)=>{return respone.data})
        console.log(ds_search)
        setlist(ds_search)
    }

    return (
        <div className="manage">
            <div style={{margin:'0 50px '}}>
            <table className="table  table-manage " style={{border:'0px',display:'inline-block',width:'100%'}}>
                    <div className="input-group" style={{marginTop:'20px'}}>
                        <input type="text" placeholder="Nhập từ khóa ..." className="input--search" value={search} onChange={onChange}/>
                        <button type='button' className="btn btn-primary btn--search" onClick={onClick}><SearchOutlined style={{fontSize:'20px'}}/></button>
                        {/* <button type='button' className="btn btn-primary btn--arrange">Sắp Xếp</button> */}
                        <form action="/add">
                            <button type='submit' className="btn btn-primary btn--add"  ><PlusOutlined style={{fontSize:'20px'}} /></button>
                        </form>
                        
                    </div>
                <thead className="table-primary">
                    <tr>
                    <th  scope="col" style={{width:'10%'}}>Mã Voucher</th>
                    <th  scope="col"style={{width:'20%'}}>Tên Voucher</th>  
                    <th  scope="col"style={{width:'10%'}}>Số Lượng</th>
                    <th  scope="col"style={{width:'10%'}}>Số Lượng Còn Lại</th>
                    <th  scope="col"style={{width:'10%'}}>Giá Trị (%)</th>
                    <th  scope="col"style={{width:'10%'}}>Giá bán (Vnđ) </th>
                    <th  scope="col"style={{width:'15%'}}>Khoảng thời gian mở bán</th>
                    <th  scope="col"style={{width:'15%'}}>Khoảng thời gian hiệu lực</th>
                    <th  scope="col"style={{width:'15%',border:'0px',color:'#ccccc'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((val)=>{
                        return <Part key={val.MaVoucher} ma={val.MaVoucher} hinh={val.Hinh} ten={val.TenVoucher} sl={val.SoLuong} slbd={val.SoLuongBanDau}  giatri={val.GiaTriSuDung} ban={dateFormat(val.NgayBatDau,"dd/mm/yyyy")+" - "+dateFormat(val.NgayKetThuc,"dd/mm/yyyy")}  hl={dateFormat(val.NgayCoHieuLuc,"dd/mm/yyyy")+" - "+dateFormat(val.NgayHetHieuLuc,"dd/mm/yyyy")}  gia={val.GiaTien} tt={val.TrangThai}></Part>
                    })}
                    
                  
                </tbody>
            </table>
            </div>
        </div>
    )
}
