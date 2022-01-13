import React ,{useState,useEffect}from 'react';
import '../css/ChiTiet.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber, Space,Skeleton} from 'antd';
import CurrencyInput from 'react-currency-input-field';
import Axios from 'axios'
import { Redirect } from 'react-router';
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import AWS from 'aws-sdk'

const S3_BUCKET ='oka2-hv';
const REGION ='ap-southeast-1';

AWS.config.update({
    accessKeyId: 'AKIAURIQ2VFGVW335GYB',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})
export default function Edit(props) {
    const date = Date.now();
    const {id}=props.match.params;
    const dateFormat = 'YYYY-MM-DD';

    const [form] = Form.useForm(); 
    const[voucher,setVoucher]=useState([])  
    const[maVoucher,setmaVoucher]=useState('')
    const[tenVoucher,settenVoucher]=useState('')
    const[loaiVoucher,setloaiVoucher]=useState('')
    const[soLuong,setsoLuong]=useState(0)
    const [dieukien,setDieukien]=useState([{check:false,input:''},{check:false,input:''}])
    
    const[gia,setGia]=useState(0)
    const[ptram,setpTram]=useState(0)

    const[diaDiem_1,setdiaDiem_1]=useState([])
    
    const[dsloaiVoucher,setdsloaiVoucher]=useState([])
    const[dsDieuKien,setdsDieuKien]=useState([])
    const[dsDiaChi,setdsDiaChi]=useState([])
    const [diaDiem,setdiaDiem]=useState([])
    const[ngayBD,setNgayBD]=useState('')
    const[ngayKT,setNgayKT]=useState('')
    const[ngayHL,setNgayHL]=useState('')
    const[ngayHH,setNgayHH]=useState('')
    const [image,setImage]=useState('')
    const [image_1,setImage_1]=useState('')
    const [progress , setProgress] = useState(0);
    const [ selectedFile, setSelectedFile] = useState(null);
    const[ngayBan,setNgayBan]=useState()
    const[ngayHLuc,setNgayHLuc]=useState()
    var maP = sessionStorage.getItem('maUser');

    var key=[]
    var bd,kt,pt, partner;
    var temp=[]
    useEffect(async()=>{
        const detail = await Axios.post("https://oka2-hv.herokuapp.com/partner/pre_edit",{id:id}).then((respone)=>{
            return respone.data})
            settenVoucher(detail[0].TenVoucher)
            setsoLuong(detail[0].SoLuong)
            setGia(detail[0].GiaTien)
            setpTram(detail[0].GiaTriSuDung)
            setImage(detail[0].Hinh)
            setImage_1(detail[0].Hinh)
            // console.log(moment(respone.data[0].NgayBatDau))
            setNgayBD(detail[0].NgayBatDau)
            setNgayKT(detail[0].NgayKetThuc)
            setNgayHL(detail[0].NgayCoHieuLuc)
            setNgayHH(detail[0].NgayHetHieuLuc)
        Axios.post("https://oka2-hv.herokuapp.com/partner/pre_editdc",{id:id}).then((respone)=>{
            respone.data.forEach(element => {
                key.push(element.MaDiaChi)
            });
            
            setdiaDiem(key)
        })  

        Axios.post("https://oka2-hv.herokuapp.com/partner/pre_editdk",{id:id}).then((respone)=>{
            
            var con=[{check:false,input:''},{check:false,input:''}]
            respone.data.forEach(element => {
                if(element.LoaiDieuKien=="A")
                {
                    con[0]={
                        check: true,
                        input: element.GiaTri.toString()
                    }
                }
                else if(element.LoaiDieuKien=="B")
                {
                    con[1]={
                        check: true,
                        input: element.GiaTri.toString()
                    }
                }
            });
            temp=[...con]
            setDieukien(temp)
            console.log(dieukien)
            
            
        })  
        Axios.post("https://rental-apartment-huflit.herokuapp.com/api/intergration/getPartnerHouseAddress",{idPartner:maP}).then((respone)=>{
            setdsDiaChi(respone.data)
        })
          
        
        
        
    },[])
    const CheckboxGroup = Checkbox.Group
    
   
    const onChangeBan=(value)=>{
        var date_temp = [...value]
        setNgayBD(date_temp[0])
        setNgayKT(date_temp[1])
        setNgayBan(date_temp)
    }
    
    const onChangeHl=(value)=>{
        var date_temp = [...value]
        setNgayHL(date_temp[0])
        setNgayHH(date_temp[1])
        // console.log(ngayHL)
        // console.log(ngayHH)
        // setNgayHLuc(date_temp)
        // console.log(date_temp)
    }


    const onChangeDiaDiem=(list)=> {
    
        setdiaDiem(list)
      }
      
    const onChangeGia = (e) =>{
        const value = Number(e.target.value);
        if(!isNaN(value))
        {
            console.log(gia)
            setGia(value);
        }
        
        
    };
    

    const [textTriGIa,setTextTriGia]=useState(0);
    const onChangeTriGia =(e)=>{
        if(!isNaN(Number(e.target.value)))
          {
              setpTram(e.target.value)      
            }
        }



    
    
      const onFinishFailed = (errorInfo) => {
          
        console.log('Failed:', errorInfo);
      };
    
    const onImageChange=(e)=>{
        if(e.target.files && e.target.files[0]){    
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
            
        }
    }

    
    
  
    const onChangeSL=(event)=>{
        
          
        
            setsoLuong((event.target.value))
            console.log(soLuong)
          
    }
    const onChangeDk = (name,index,e)=>{
		let tempArray = [...dieukien];
		if(name==='check')
        {
			tempArray[index] = {...tempArray[index],check:!tempArray[index]['check']}
        }
		else
        {
            tempArray[index] = {...tempArray[index],input:e.target.value}
        }
		return setDieukien(tempArray)
	}

    const onChangeTen=(e)=>{
        settenVoucher(e.target.value)
    }

    const handleFileInput = (e) => {
        var image = new File([e.target.files[0]],id+".jpg")
        setSelectedFile(image);
        setImage(URL.createObjectURL(e.target.files[0]))   
         
    }


    var deleteParam = {
        Bucket: 'oka2-hv',
        Delete: {
            Objects: [
                {Key: id+'.jpg'},
            ]
        }
    }; 
    const deleteitem = ()=>{
        myBucket.deleteObjects(deleteParam, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('delete', data);
        });
    }
    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                console.log(selectedFile)
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
    

    const history=useHistory();

    const {RangePicker} = DatePicker;
    const onFinish = (values) => {
        var link="https://oka2-hv.s3-ap-southeast-1.amazonaws.com/"+id+".jpg"
        if(selectedFile!=null)
        {
            // myBucket.deleteObjects(deleteParam, function(err, data) {
            //     if (err) console.log(err, err.stack);
            //     else console.log('delete', data);
            // });
            Axios.post("https://oka2-hv.herokuapp.com/partner/edit",{ma:id,ten:tenVoucher,loai:values.select,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:moment(moment(ngayBD).add(1, 'd').format('YYYY/MM/DD')),kt:moment(moment(ngayKT).add(1, 'd').format('YYYY/MM/DD')),hl:moment(moment(ngayHL).add(1, 'd').format('YYYY/MM/DD')),hh:moment(moment(ngayHH).add(1, 'd').format('YYYY/MM/DD')),hinh:link,partner:partner})
            uploadFile(selectedFile)
        }
        else
        {
            Axios.post("https://oka2-hv.herokuapp.com/partner/edit",{ma:id,ten:tenVoucher,loai:values.select,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:moment(moment(ngayBD).add(1, 'd').format('YYYY/MM/DD')),kt:moment(moment(ngayKT).add(1, 'd').format('YYYY/MM/DD')),hl:moment(moment(ngayHL).add(1, 'd').format('YYYY/MM/DD')),hh:moment(moment(ngayHH).add(1, 'd').format('YYYY/MM/DD')),hinh:image_1,partner:partner})
        }
       
    
        history.push("/")

    
      };
      
    return (
        <div style={{marginTop:'30px'}}>
            <h1 style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase'}}>Sửa Voucher</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div class="col--detail--1">
                        <img src={image}  />
                        {/* <h1>Select Image</h1> */}
                        <input type="file" name="myImage" onChange={handleFileInput} style={{marginTop:'10px',cursor: 'pointer'}} />
                        </div>
                    </div>
                    <div className="col-lg-8 ">
                    <Form 
                        form={form}
                        name="normal_login"
                            onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="col-lg-8-detalis"
                        
            >
        
                <Form.Item
                    name="tenVoucher"
                    rules={[
                        
                        {  validator(value){
                            if(tenVoucher=="")
                            {
                                return Promise.reject(new Error('Không được để trống'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}
                    label="Tên Voucher"
                    className="form__row"
                    valuePropName={0}
                >
                    <Input  placeholder="Nhập Tên Voucher ..." value={tenVoucher} onChange={onChangeTen} />
                </Form.Item>
                
                
                <Form.Item
                    name="soLuong"
                    rules={[
                        {  validator(value){
                            if(soLuong<=0||soLuong=="")
                            {
                                return Promise.reject(new Error('Không được để trống và phải đạt giá trị tối thiểu'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}  
                    label="Số lượng"
                    className="form__row"
                    valuePropName={0}
                >
                    <Input type="number" value={soLuong} className="form__input" placeholder="Số Lượng...."  onChange={onChangeSL}/>

                </Form.Item>
                <Form.Item
                name="dieukien"
                    label="Điều Kiện:"
                    rules={[
                         
                        {
                            validator(_,value) {
                              if ((dieukien[0]['check']===true&&dieukien[0]['input']==='')||(dieukien[1]['check']===true&&dieukien[1]['input']===''))
                              {
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              }
                              else
                              return Promise.resolve();
                            },
                        }
                                    
                    ]}
                    className="form__row"
                    // style={{width:'120px'}}
                >
                            <Space direction="vertical">
                                <Space>
                                    
                                        <Checkbox value="A" checked={dieukien[0].check} onClick={(e)=>onChangeDk("check",0,e)}>Số đêm tối thiểu</Checkbox>  
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}} value={dieukien[0].input}  onChange={(e)=>onChangeDk("input",0,e)} disabled={!dieukien[0]['check']} />
                                    
                                </Space>
                                <Space>
                                    
                                        <Checkbox  value="A" checked={dieukien[1].check} onClick={(e)=>onChangeDk("check",1,e)}>Giá trị đơn đặt tối thiểu</Checkbox>  
                                    
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}} value={dieukien[1].input} onChange={(e)=>onChangeDk("input",1,e)} disabled={!dieukien[1]['check']} />

                                        
                                   
                                </Space>
                            </Space>
                </Form.Item>


                <Form.Item
                    name="diadiem"
                    rules={[
                        { validator(){
                            if(diaDiem=='')
                            {
                                return Promise.reject(new Error('Vui lòng chọn ít nhất 1 đơn vị áp dụng voucher'));
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }}
                    ]}
                    label="Địa Điểm:"
                    className="form__row"
                    valuePropName=""
                >
                    
                    
                    {dsDiaChi.length===0?<Skeleton/>:
                        <Checkbox.Group onChange={onChangeDiaDiem} value={diaDiem} >
                            <Space direction="vertical">
                                
                                {dsDiaChi.map((val)=>{
                                    return <Checkbox key={val.ID_NHA} value={val.ID_NHA} >{val.DIACHI_1}</Checkbox>
                                })}
                            </Space>
                        </Checkbox.Group>}
                
                </Form.Item>
                
                

                <Form.Item
                    name="gia"
                    rules={[
                        ({ getFieldValue })=>(
                            { validator(_,value=''){
                                if(gia===0||gia===null||gia==='')
                                {
                                    return Promise.reject(new Error('Không được bỏ trống Trị Giá'));
                                }
                                else
                                    return Promise.resolve();
                                
                            }}
                        ),
                        
                        
                        
                    ]}
                    label="Giá (VNĐ)"
                    className="form__row"
                    valuePropName={0}
                    
                >
                   <Input  type="number" className="form__input"   onChange={onChangeGia} value={gia}/>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    label="Phần Trăm Giá (%)"
                    className="form__row"

                    
                    rules={[
                        
                        { validator(_,value){
                            if(ptram===0||ptram=='')
                            {
                                return Promise.reject(new Error('Không được bỏ trống giá trị %'))
                            }
                            else if(ptram<10)
                            {
                                return Promise.reject(new Error('Chưa đạt được mức tối thiểu'))
                            }
                            else if(ptram>90)
                            {
                                return Promise.reject(new Error('Vượt quá hạn mức có thể'))
                            }
                            else
                                return Promise.resolve();
                        }},
                        
                    ]}
                    valuePropName={0}
                >
                    
                    <Input type="number" className="form__input"  onChange={onChangeTriGia} value={ptram}/>
                </Form.Item>
                <Form.Item
                    name="thoigianban"
                    
                    rules={[
                        {validator(_,value){
                            
                            if(ngayHL<ngayBD)
                            {
                                return Promise.reject(new Error('Ngày hiệu lực của voucher không hợp lệ'))
                            }
                            else if(ngayHH<ngayKT)
                            {
                                return Promise.reject(new Error('Ngày hiệu lực của voucher không hợp lệ'))
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }},                      
                    ]}
                    label="T/G Bán "
                    className="form__row"
                    valuePropName=""
                >
                   
                    <RangePicker className="form__input" value={[moment(ngayBD, dateFormat), moment(ngayKT, dateFormat)]} onChange={onChangeBan} />
                </Form.Item>
                <Form.Item
                    name="hieuluc"
                    rules={[
                        {validator(_,value){
                            
                            if(ngayHL<ngayBD)
                            {
                                return Promise.reject(new Error('Ngày hiệu lực của voucher không hợp lệ'))
                            }
                            else if(ngayHH<ngayKT)
                            {
                                return Promise.reject(new Error('Ngày hiệu lực của voucher không hợp lệ'))
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }},
                    ]}
                    label="T/G Hiệu lực"
                    className="form__row"
                    valuePropName=""
                >
                   <RangePicker className="form__input" value={[moment(ngayHL, dateFormat), moment(ngayHH, dateFormat)]} onChange={onChangeHl}/>
                </Form.Item>
                
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Sửa
                </Button>
                </Form.Item>
            </Form>
     
                    </div>
                </div>
            </div>
        </div>
    )
}
