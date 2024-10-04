import React from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/upload/header.component";
import ImagesComponent from "../components/upload/images.component";

const UploadImagesPage: React.FC = () => {

    const { folderId } = useParams();

    return (

        <div className="
        bg-secondary-bg-75 p-2
        w-full h-full flex flex-col justify-start items-start">
            {/* header */}
            <HeaderComponent folderId={folderId} />
            {/* content */}
            <ImagesComponent folderId={folderId} />
        </ div>
    );
};

export default UploadImagesPage;