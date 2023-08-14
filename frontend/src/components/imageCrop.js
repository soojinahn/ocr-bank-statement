import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCrop(props) {
    const cropperRef = useRef(null); 
    const [inputImage, setInputImage] = useState(null); //user-selected image
    const [selectedCrop, setSelectedCrop] = useState(null); //selected crop image

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setSelectedCrop(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} />
            <Cropper 
                src={inputImage} 
                crop={onCrop} 
                ref={cropperRef} 
                style={{height: 400, width:"80%"}}
                zoomTo={0.5}
                responsive={true}
                background={false}
                autoCrop={true}
            />
            <button onClick={(e) => props.handleCropUpload(selectedCrop)}>Crop</button>
        </div>
    );
}

export default ImageCrop;