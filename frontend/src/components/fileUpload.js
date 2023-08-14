import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCrop from './imageCrop';

function FileUpload() {
    const [croppedImage, setCroppedImage] = useState(null);

    // helper function: generate a new file from base64 String
    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const arr = b64Data.split(',');
        const byteCharacters = atob(arr[1]);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    const handleCropUpload = obj => { //takes obj from ImageCrop as parameter
        setCroppedImage(img => (obj));
    };

    useEffect(() => {
        if(croppedImage) {
            const formData = new FormData();
            const img = b64toBlob(croppedImage, "image/png"); //convert base64 to BLOB
            formData.append("image", img);
        
            axios({
                method: "post",
                url: "/image",
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }, [croppedImage]);

    return (
        <div>
            <ImageCrop handleCropUpload={handleCropUpload}/>
            <div className="idk">
                {croppedImage ? (
                    <img src={croppedImage}/>
                ): null}
            </div>
        </div>
    );
}

export default FileUpload;
