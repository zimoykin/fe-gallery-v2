import React, { useRef, useState } from 'react';
import { IOffer } from '../../interfaces/commercial.interface';
import { ApiClient } from '../../networking';

interface Props {
    offer: IOffer;
    categoryOptions: string[];
    onDelete: () => void;
}

const OfferComponent: React.FC<Props> = ({ offer, onDelete, categoryOptions }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [id, setId] = useState<string>(offer.id);
    const [url, setUrl] = useState<string>(offer.previewUrl ?? '');
    const [location, setLocation] = useState<string>(offer.location ?? '');
    const [file, setFile] = useState<File | null>(null);
    const [price, setPrice] = useState<number>(offer.price ?? 0);
    const [title, setTitle] = useState<string>(offer.title ?? '');
    const [description, setDescription] = useState<string>(offer.text ?? '');
    const [category, setCategory] = useState<string>(offer.category ?? '');


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setUrl(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);
            if (id && !id.startsWith('new-') && event.target.files[0]) {
                const formData = new FormData();
                formData.append('file', event.target.files[0]);
                ApiClient.postUpload(`/offers/${id}/image`, formData)
                    .catch(console.error);
            }
        }
    };

    const onClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const createOrUpdateOffer = () => {
        //new offer
        if (id.startsWith('new-') && file) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', `${price}`);
            formData.append('text', description);
            formData.append('category', category);
            formData.append('location', location);

            formData.append('file', file);

            ApiClient.postUpload<string>(`/offers`, formData)
                .then((id) => setId(id))
                .catch(console.error)
                .finally(() => setEditMode(false));

        }
        //update existing offer
        else if (!id.startsWith('new-')) {
            ApiClient.put<IOffer>(`/offers/${id}`, {
                title,
                price,
                text: description,
                category,
                location
            }).then(() => {
                setEditMode(false);
            }).catch(console.error);
        }
    };

    return (<>
        <div
            className='bg-secondary-bg p-2 gap-1 flex flex-col justify-start items-center'
        >
            <div className='flex w-full flex-col relative'>
                <div
                    onClick={onClick}
                    className='aspect-square w-full h-44  bg-no-repeat bg-cover rounded-sm'
                    style={{ backgroundImage: `url(${url})` }}
                />
                {/* panel */}
                <div className='absolute top-0 flex flex-col w-full justify-center items-end'>
                    <div className='p-2 flex justify-end items-end'>
                        {editMode
                            ?
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <div
                                    onClick={createOrUpdateOffer}
                                    className='
                                    hover:scale-110 hover:cursor-pointer hover:bg-main-bg-75
                                    transition-all ease-in-out delay-75
                                 '>
                                    <i className='p-1 fa-solid fa-check  border' />
                                </ div>
                                {id && id.startsWith('new-') && <div
                                    onClick={createOrUpdateOffer}
                                    className='
                                    hover:scale-110 hover:cursor-pointer hover:bg-main-bg-75
                                    transition-all ease-in-out delay-75
                                 '>
                                    <i className='p-1 fa-solid fa-upload  border' />
                                </ div>}

                                <div
                                    onClick={onDelete}
                                    className='
                                    hover:scale-110 hover:cursor-pointer hover:bg-main-bg-75
                                    transition-all ease-in-out delay-75
                                 '>
                                    <i className='p-1 fa-solid fa-trash  border' />
                                </div>

                            </div>
                            :
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <div className='
                                    hover:scale-110 hover:cursor-pointer hover:bg-main-bg-75
                                    transition-all ease-in-out delay-75
                                 '>
                                    <i className='p-1 fa-solid fa-pen border'
                                        onClick={() => setEditMode(!editMode)}
                                    />
                                </ div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='flex w-full bg-main-bg rounded-sm'>
                {editMode ?
                    <input
                        placeholder='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        className='text-sm p-2 w-full bg-transparent' />

                    :
                    <span
                        onClick={() => setEditMode(true)}
                        className='text-sm p-2'>
                        {title || 'no title set'}
                    </span>
                }
            </div>

            <div className='flex w-full bg-main-bg rounded-sm'>
                {editMode ?
                    <input
                        placeholder='location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type='text'
                        className='text-sm p-2 w-full bg-transparent' />

                    :
                    <span
                        onClick={() => setEditMode(true)}
                        className='text-sm p-2'>
                        {location || 'no location set'}
                    </span>
                }
            </div>

            <div className='flex w-full bg-main-bg rounded-sm border' >
                {
                    editMode ?

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm bg-transparent w-1/2'>
                            {categoryOptions.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        : <span
                            onClick={() => setEditMode(true)}
                            className='text-sm w-1/2 text-left p-2'>
                            {category}
                        </span>
                }
                {
                    editMode ?
                        <input
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            type='number'
                            className='bg-transparent text-sm text-center p-2 w-1/2' />
                        : <p className='text-sm text-right p-2 w-1/2'>
                            {`${price.toFixed(2)}`}
                        </p>
                }
                <i className='fa-solid fa-euro-sign text-sm text-left p-2' />

            </div>

            {/* description */}
            <div className='bg-secondary-bg w-full p-1 min-h-28'>
                {
                    editMode ?
                        <form
                            className='w-full' onSubmit={() => setEditMode(false)}>
                            <textarea
                                placeholder='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='text-sm w-full min-h-28 rounded-md bg-transparent' />
                        </form>
                        :
                        <div
                            onClick={() => setEditMode(true)}
                            className='w-full text-start text-sm overflow-scroll no-scrollbar'
                            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
                        />
                }
            </div>


        </div>

        <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            style={{ display: 'none' }}
            id="avatar-input"
            accept="image/*"
        />
    </>);
};

export default OfferComponent;





// {/* title */}
// <div className='h-full w-1/3 flex'>
//     <div className='h-full flex justify-start items-start'>

//     </div>

// </div>
// {/* location */}
// <div className='h-full w-1/3 flex'>
//     <div className='h-full flex justify-start items-start'>

//     </div>

// </div>
// {/* category */}
// <div className='h-full flex'>
//     {/* price */}
//     <div className='h-full flex justify-center items-center p-2 border'>
//     </div>
// </div>
// <div className='h-full flex justify-end items-end'>
//     {/* price */}
//     <div className='h-full flex justify-center items-center p-2 border'>

//     </div>
// </div>
