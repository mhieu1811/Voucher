import React ,{useState,useEffect}from 'react';
import '../css/ChiTiet.css'
import '../css/Add.css'
import { Form, Input, Button,Select, DatePicker,Checkbox, InputNumber, Space, Skeleton } from 'antd';
import CurrencyInput from 'react-currency-input-field';
import Axios from 'axios'
import { Redirect } from 'react-router';
import {useHistory} from 'react-router-dom'
import AWS from 'aws-sdk'
import moment from 'moment';
const {RangePicker}=DatePicker

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

export default function Add() {

    const date = Date.now();
    let today= new Date(date);
    

    const [form] = Form.useForm();   
    const[maVoucher,setmaVoucher]=useState('')
    const[tenVoucher,settenVoucher]=useState('')
    const[soLuong,setsoLuong]=useState(0)
    const [dieukien,setDieukien]=useState([{check:false,input:''},{check:false,input:''}])
    const[diaDiem,setdiaDiem]=useState([])
    const[gia,setGia]=useState(0)
    const[ptram,setpTram]=useState(0)
    const[ngayban,setNgayBan]=useState('')
    const[ngayhl,setNgayhl]=useState('')
    const [image,setImage]=useState('/image/default.jpg')
    
    const[dsDiaChi,setdsDiaChi]=useState([])
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    var maP = sessionStorage.getItem('maUser');

    
    console.log(maP)
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

    useEffect(async()=>{
        
        
        // const dk = await Axios.get("http://localhost:9000/partner/list_dk").then((respone)=>{return respone.data})
        //     setdsDieuKien(dk)
        
        // const dc_1 = await Axios.get(`https://deploy-hotel-api.herokuapp.com/hotel/getbypartner/${maP}`).then((respone)=>{return respone.data})
        const listAddress = await getAddress();
        const mavoucher = await Axios.get("https://oka2-hv.herokuapp.com/partner/ma").then((respone)=>{return "MaVC"+respone.data[0].Dem})
            setmaVoucher(mavoucher)
            setdsDiaChi(listAddress)
    },[])
    
    const handleFileInput = (e) => {
        
        var image = new File([e.target.files[0]],maVoucher+".jpg")
        setSelectedFile(image);
        setImage(URL.createObjectURL(e.target.files[0]))   
        // setImage("https://oka2-hv.s3-ap-southeast-1.amazonaws.com/"+maVoucher+".jpg")
    }
    async function getAddress(){
        const dc= await Axios.post("https://rental-apartment-huflit.herokuapp.com/api/intergration/getPartnerHouseAddress",{idPartner:maP})
        return dc.data
    }

    var partner
    const onChangeDiaDiem=(checkedValues)=> {
        setdiaDiem(checkedValues)
      }

    const onChangeGia = (e) =>{
        const value = Number(e.target.value);
        if(!isNaN(value))
        {
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



    const onChangeBan=(value)=>{
        var date_temp = [...value]
        setNgayBan(date_temp)
        console.log(date_temp)
        
    }
    
    const onChangeHl=(value)=>{
        var date_temp = [...value]
        setNgayhl(date_temp)
        console.log(ngayhl)
        // console.log(ngayhl[0].format("DD/MM/YYYY"))
    }
    
      const onFinishFailed = (errorInfo) => {
          
        console.log('Failed:', errorInfo);
      };
    
    

    

    const onChangeSL=(event)=>{
        
          if(!isNaN(Number(event.target.value)))
          {
        
            setsoLuong((event.target.value))
          }
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

    const history=useHistory();


    const {RangePicker} = DatePicker;
    const onFinish = (values) => {
        
        if(selectedFile!=null)
        {
            Axios.post("https://oka2-hv.herokuapp.com/partner/add",{ma:maVoucher,ten:tenVoucher,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:moment(moment(ngayban[0]).add(1, 'd').format('YYYY/MM/DD')),kt:moment(moment(ngayban[1]).add(1, 'd').format('YYYY/MM/DD')),hl:moment(moment(ngayhl[0]).add(1, 'd').format('YYYY/MM/DD')),hh:moment(moment(ngayhl[1]).add(1, 'd').format('YYYY/MM/DD')),hinh:"https://oka2-hv.s3-ap-southeast-1.amazonaws.com/"+maVoucher+".jpg",partner:maP})
            uploadFile(selectedFile)
        }
        else{
            Axios.post("https://oka2-hv.herokuapp.com/partner/add",{ma:maVoucher,ten:tenVoucher,sl:soLuong,dk:dieukien,dd:diaDiem,gia:gia,ptram:ptram,bd:moment(moment(ngayban[0]).add(1, 'd').format('YYYY/MM/DD')),kt:moment(moment(ngayban[1]).add(1, 'd').format('YYYY/MM/DD')),hl:moment(moment(ngayhl[0]).add(1, 'd').format('YYYY/MM/DD')),hh:moment(moment(ngayhl[1]).add(1, 'd').format('YYYY/MM/DD')),hinh:"https://oka2-hv.s3-ap-southeast-1.amazonaws.com/default.jpg",partner:maP})
        }
        history.push("/")
      };
    return (
        <div style={{marginTop:'30px'}}>
            <h1 style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase'}}>Th??m Voucher</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="col--detail--1">
                        <img src='/image/default.jpg'  />
                        {/* <h1>Select Image</h1> */}
                        <input type="file" name="myImage" onChange={handleFileInput} style={{marginTop:'10px',cursor: 'pointer'}} />
                        <p>N???u kh??ng th??m h??nh, th?? s??? l???y ???nh default</p>
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
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng t??n voucher' },
                    ]}
                    label="T??n Voucher"
                    className="form__row"
                >
                    <Input  placeholder="Nh???p T??n Voucher ..." onChange={onChangeTen} />
                </Form.Item>
                
                
                <Form.Item
                    name="soLuong"
                    rules={[
                        {  validator(value){
                            if(soLuong<=0||soLuong=="")
                            {
                                return Promise.reject(new Error('Kh??ng ???????c ????? tr???ng v?? ph???i ?????t gi?? tr??? t???i thi???u'));
                            }
                            else
                            
                                return Promise.resolve()
                            
                        }},
                    ]}  
                    label="S??? l?????ng"
                    className="form__row"
                >
                    <Input type="number"  className="form__input" placeholder="S??? L?????ng...."  onChange={onChangeSL}/>

                </Form.Item>
                <Form.Item
                name="dieukien"
                    label="??i???u Ki???n:"
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
                                    
                                        <Checkbox value="A" onClick={(e)=>onChangeDk("check",0,e)}>S??? ????m t???i thi???u</Checkbox>  
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",0,e)} disabled={!dieukien[0]['check']} />
                                    
                                </Space>
                                <Space>
                                    
                                        <Checkbox  value="A" onClick={(e)=>onChangeDk("check",1,e)}>Gi?? tr??? ????n ?????t t???i thi???u</Checkbox>  
                                    
                                        <input type="number" id="id_input_1" className="form__input"  style={{width:100},{justifySelf:'center'}}  onChange={(e)=>onChangeDk("input",1,e)} disabled={!dieukien[1]['check']} />

                                        
                                   
                                </Space>
                            </Space>
                </Form.Item>
                 
                        <Form.Item
                        name="diadiem"
                            rules={[
                                { required: true, message: 'Ch???n ??t nh???t 1 ?????a ??i???m ??p d???ng' },
                            ]}
                        label="?????a ??i???m:"
                        className="form__row"
                        valuePropName={["DC00001   ","DC00002   "]}
                    >
                           {dsDiaChi.length===0?<Skeleton/>:
                        <Checkbox.Group onChange={onChangeDiaDiem} >
                            <Space direction="vertical">
                                
                                {dsDiaChi.map((val)=>{
                                    return <Checkbox key={val.ID_NHA} value={val.ID_NHA} >{val.DIACHI_1}</Checkbox>
                                })}
                            </Space>
                        </Checkbox.Group>
                        }
                       
                    </Form.Item>
                    

                
                <Form.Item
                    name="gia"
                    rules={[
                        ({ getFieldValue })=>(
                            { validator(_,value=''){
                                if(value===0||value===null||value==='')
                                {
                                    return Promise.reject(new Error('Kh??ng ???????c b??? tr???ng Tr??? Gi??'));
                                }
                                else
                                    return Promise.resolve();
                                
                            }}
                        ),
                        
                        
                        
                    ]}
                    label="Gi?? (VN??)"
                    className="form__row"
             
                    
                >
                   <Input  type="number" className="form__input"   onChange={onChangeGia}/>
                </Form.Item>
                <Form.Item
                    name="trigia"
                    label="Ph???n Tr??m Gi?? (%)"
                    className="form__row"

                    
                    rules={[
                        
                        { validator(_,value){
                            if(ptram===0||ptram=='')
                            {
                                return Promise.reject(new Error('Kh??ng ???????c b??? tr???ng gi?? tr??? %'))
                            }
                            else if(ptram<10)
                            {
                                return Promise.reject(new Error('Ch??a ?????t ???????c m???c t???i thi???u'))
                            }
                            else if(ptram>90)
                            {
                                return Promise.reject(new Error('V?????t qu?? h???n m???c c?? th???'))
                            }
                            else
                                return Promise.resolve();
                        }},
                        
                    ]}
                >
                    
                    <Input type="number" className="form__input"  onChange={onChangeTriGia}/>
                </Form.Item>
               
                <Form.Item
                    name="thoigianban"
                    
                    rules={[
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng kho???ng th???i gian hi???u l???c' },
                        {validator(_,value){
                            if(ngayhl[0]<ngayban[0])
                            {
                                return Promise.reject(new Error('Ng??y hi???u l???c c???a voucher kh??ng h???p l???'))
                            }
                            else if(ngayhl[1]<ngayban[1])
                            {
                                return Promise.reject(new Error('Ng??y hi???u l???c c???a voucher kh??ng h???p l???'))
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }},                       
                    ]}
                    label="T/G B??n "
                    className="form__row"
                >
                   
                    <RangePicker className="form__input" onChange={onChangeBan}/>
                </Form.Item>
                <Form.Item
                    name="hieuluc"
                    rules={[
                        { required: true, message: 'Kh??ng ???????c b??? tr???ng ng??y k???t th??c' },
                        {validator(_,value){
                            
                            if(ngayhl[0]<ngayban[0])
                            {
                                return Promise.reject(new Error('Ng??y hi???u l???c c???a voucher kh??ng h???p l???'))
                            }
                            else if(ngayhl[1]<ngayban[1])
                            {
                                return Promise.reject(new Error('Ng??y hi???u l???c c???a voucher kh??ng h???p l???'))
                            }
                            else
                            {
                                return Promise.resolve()
                            }
                        }},
                    ]}
                    label="T/G Hi???u l???c"
                    className="form__row"
                >
                   <RangePicker className="form__input" onChange={onChangeHl}/>
                </Form.Item>
                
                <Form.Item className="form-btn-login">
                <Button type="primary" htmlType="submit" className="btn--them text-right btn btn-primary" >
                Th??m
                </Button>
                </Form.Item>
            </Form>
     
                    </div>
                </div>
            </div>
        </div>
    )
}
