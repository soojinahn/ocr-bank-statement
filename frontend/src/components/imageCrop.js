import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import Table from './table';
import "cropperjs/dist/cropper.css";
import axios from 'axios';

function ImageCrop(props) {
    const cropperRef = useRef(null); 
    const [inputImage, setInputImage] = useState(null); //user-uploaded image
    const [tableData, setTableData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
 
    function handleCropUpload(e) {
        e.preventDefault();
        
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        cropper.getCroppedCanvas().toBlob((blob) => {
            const image_file = new File([blob], "image_01.png", {type:"image/png"});
            const formData = new FormData();
            formData.append("image", image_file);

            axios({
                method: "post",
                url: "/image",
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            })
                .then(function (response) {
                    console.log(response)
                    axios({
                        method: "get",
                        url: "/table"
                    })
                        .then(function (response) {
                            console.log(response)
                            setTableHeaders(response.data["headers"]);
                            setTableData(response.data["body"]);
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                })
                .catch(function (error) {
                    console.log(error)
                });
        });
    };

    function handleFileUpload(file) {

        setInputImage(URL.createObjectURL(file));
        // const validImage = new RegExp('image/.*');
        // image_url = URL.createObjectURL(e.target.files[0]);

        // if(file.type == "application/pdf") {
        //     PDFConverter
        // }
        // else if (validImage.test(file.type)) {
        //     setInputImage(image_url)
        // }
    }

    return (
        <div>
            <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e.target.files[0])} />
            <Cropper 
                src={inputImage}
                ref={cropperRef}
                style={{height: 400, width:"80%"}}
                zoomTo={0.5}
                responsive={true}
                background={false}
                autoCrop={true}
            />
            <button onClick={(e) => handleCropUpload(e)}>Crop</button>
            <Table items={tableData} headers={tableHeaders}/>
        </div>
    );
}

export default ImageCrop;