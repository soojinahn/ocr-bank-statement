import React from 'react';
import { ChangeEvent, useState } from 'react';

function fileUpload() {
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState(null);

    const handleFileChange = e => {
        if(e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if(!file) return;
    }

    return (
        <div>
            <input type="file" accept="pdf" onChange={handleFileChange} />
            <div>{file && `${file.name}`}</div>
            <button onClick={handleUploadClick}>Upload</button>
        </div>

    );
}

export default fileUpload;
