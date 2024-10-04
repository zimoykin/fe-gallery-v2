import React, { useRef } from 'react';


interface Props {
    pickedImages: (imgs: File[]) => void;
}

/**
 * @description
 * This component is used to upload files to the server. It includes a hidden input element
 * of type "file" which allows the user to select one or more files to be uploaded.
 * When the user selects one or more files, the component will call the `pickedImages` function
 * with an array of the selected files.
 * The component also accepts an `onClick` function which is called when the user clicks
 * on the component. This is useful for visually hiding the file input element and instead
 * providing a button or other element which the user can click to trigger the file selection
 * dialog.
 * @param {{ onClick: () => void; pickedImages: (imgs: File[]) => void; }} props
 * @returns {React.ReactElement}
 */
const FilesUploadComponent: React.FC<Props> = ({ pickedImages }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            pickedImages(
                Array.from(event.target.files).map((file) => {
                    return file;
                })
            );
        }
    };

    const onClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                style={{ display: 'none' }}
                id="images"
                accept="image/*"
                multiple
            />
            <i className="p-1 fa-solid fa-plus hover:bg-main-bg hover:scale-125 border transition ease-in-out delay-75"
                onClick={onClick}
            />
        </>

    );

};

export default FilesUploadComponent;