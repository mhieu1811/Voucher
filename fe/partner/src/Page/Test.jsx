import AWS from 'aws-sdk'
import React ,{useState,useEffect}from 'react';

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

export default function Test() {
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [image,setImage]=useState('https://oka2-hv.s3-ap-southeast-1.amazonaws.com/20210520_083604.jpg')

    const handleFileInput = (e) => {
        
        console.log(e.target.files[0].name)
        var image = new File([e.target.files[0]],"ma")
        console.log(image)
        setSelectedFile(image);
        setImage(URL.createObjectURL(e.target.files[0]))   
         
    }


    var deleteParam = {
        Bucket: 'oka2-hv',
        Delete: {
            Objects: [
                {Key: 'ma'},
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
    return(
        <div>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>
    )
}