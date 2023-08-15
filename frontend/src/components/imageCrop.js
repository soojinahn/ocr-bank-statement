import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from 'axios';

function ImageCrop(props) {
    const cropperRef = useRef(null); 
    const [inputImage, setInputImage] = useState(null); //user-uploaded image

    function handleCropUpload() {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        cropper.getCroppedCanvas().toBlob((blob) => {
            const formData = new FormData();
            formData.append("image", blob);
        
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
        );
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} />
            <Cropper 
                src={inputImage}
                ref={cropperRef}
                style={{height: 400, width:"80%"}}
                zoomTo={0.5}
                responsive={true}
                background={false}
                autoCrop={true}
            />
            <button onClick={handleCropUpload}>Crop</button>
        </div>
    );
}

export default ImageCrop;