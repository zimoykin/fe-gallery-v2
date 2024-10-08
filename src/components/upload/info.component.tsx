import React, { useState } from "react";
import { IUserFolder } from "../../interfaces/folder.interface";

interface Props {
    folder?: IUserFolder;
}

const InfoFolderComponent: React.FC<Props> = ({ folder }) => {

    const [title, setTitle] = useState<string>(folder?.title ?? '');
    const [description, setDescription] = useState<string>(folder?.description ?? '');
    
    return (
        <div className="h-full w-full md:w-1/5 flex flex-col justify-start items-center gap-2">
            <h1 className="text-highlight-cl text-shadow-md uppercase bg-highlight-bg w-full text-center text-md">info</h1>
            <hr className="w-full border-secondary-col border-1" />

            {/* title */}
            <div className="w-full pt-2 h-full md:h-auto relative
        flex flex-col justify-start items-center
        ">

                <label htmlFor="title" className="block mb-2 font-thin text-shadow-sm text-xs">
                    Title
                </label>
                <input
                    id="title"
                    className="flex w-4/5 rounded-md p-2 bg-main-bg shadow-md text-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {/* Description */}
            <div className="w-full pt-2 h-full md:h-auto relative
        flex flex-col justify-start items-center
        ">

                <label htmlFor="descr" className="block mb-2 font-thin text-shadow-sm text-xs">
                    Description
                </label>
                <textarea
                    id="descr"
                    className="flex w-4/5 rounded-md p-2 bg-main-bg shadow-md text-xs"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* date */}
            <div className="w-full pt-2 h-full md:h-auto relative
        flex flex-col justify-start items-center ">

                <label htmlFor="date" className="block mb-2 font-b text-shadow-sm text-xs">
                    Date
                </label>
                <input
                    id="date"
                    type="date"
                    className="flex w-4/5 rounded-md p-2 bg-secondary-bg text-black shadow-md text-xs"
                />
            </div>
            <hr className="w-full border-secondary-col border-1" />
            {/* save */}
            <div className="w-3/5 pt-2 h-full md:h-auto flex justify-center items-center">
                <button className="flex md:w-full w-4/5 rounded-md p-2 bg-primary-bg shadow-md text-xs
                hover:scale-105 hover:shadow-lg active:scale-95
                transition-all duration-150 ease-in-out delay-75
                ">
                    <i className="p-1 fas fa-save text-yellow-500 text-shadow-sm" />
                    <span className="w-full text-center uppercase text-primary-cl text-shadow-sm">update</span>
                </button>
            </div>

        </ div>);
};


export default InfoFolderComponent;;