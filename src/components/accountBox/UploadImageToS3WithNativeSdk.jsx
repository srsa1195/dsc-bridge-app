import React ,{useState} from 'react';
import AWS from 'aws-sdk';

import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
  } from "./common";
  import { Marginer } from "../marginer";
  import { AccountContext } from "./accountContext";

// import ViewImage from './ViewImage';

const S3_BUCKET ='dcscprojectbucket';
const REGION ='us-west-1';
const contentType="image/jpeg"


AWS.config.update({
    accessKeyId: 'AKIAUK5RL5GRGWKYYHIA',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = ({handleS3Url}) => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            ContentType: contentType, 
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
               
            })
            .send((err) => {
                if (err) console.log(err)
            })

       
            var s3url = "https://dcscprojectbucket.s3.us-west-1.amazonaws.com/" + encodeURIComponent(file.name.replace(/ /g,''))
            handleS3Url(s3url)
    }


    return <div>
        <Input type="file" onChange={handleFileInput}/>
        <SubmitButton type="submit"  style={{width: "30%", height:"41%",  padding: "10px 10px", margin:"-5%  34% 2%" }} onClick={() => uploadFile(selectedFile)}>Upload</SubmitButton>
       
    </div>
}

export default UploadImageToS3WithNativeSdk;