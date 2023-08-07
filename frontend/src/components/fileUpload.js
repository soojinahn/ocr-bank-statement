import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const handleFileChange = e => {
        if(e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    function handleUpload(){
        const formData = new FormData();
        formData.append("document", selectedFile);
    
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

    return (
        <div>
            <form>
            <input type="file" accept=".pdf, image/*" onChange={handleFileChange} />
            <div>{selectedFile && `${selectedFile.name}`}</div>
            <button onClick={handleUpload}>Upload</button>
            </form>
        </div>

    );
}


export default FileUpload;
