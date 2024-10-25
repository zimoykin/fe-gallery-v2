import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IOffer } from '../../interfaces/commercial.interface';
import { ApiClient } from '../../networking';
import { IProfile } from '../../interfaces/profile.interface';
import { ILocation } from '../../interfaces/location.interface';
import { AdvancedMarker, Map, MapMouseEvent, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Circle } from '../../maps/circle.component';
import CategorySelect from '../../maps/category-select.component';
import { useLocale } from '../../contexts/locale';
import { getAddressTitleByCoords, getCoordsByAddress } from '../../helpers/geo-resolver.helper';

interface Props {
    offer: IOffer;
    profile: IProfile;
    categoryOptions: string[];
    onDelete: () => void;
}

const OfferComponent: React.FC<Props> = ({ profile, offer, onDelete }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { locale } = useLocale();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [id, setId] = useState<string>(offer.id);
    const [url, setUrl] = useState<string>(offer.previewUrl ?? '');
    const [locationTitle, setLocationTitle] = useState<string>(offer.location?.title ?? profile.location?.title ?? '');
    const [latitude, setLatitude] = useState<number | null>();
    const [longitude, setLongitude] = useState<number | null>();
    const [distance, setDistance] = useState<number>();

    const [file, setFile] = useState<File | null>(null);
    const [price, setPrice] = useState<number>(offer.price ?? 0);
    const [discount, setDiscount] = useState<number>(offer.discount ?? 0);
    const [title, setTitle] = useState<string>(offer.title ?? '');
    const [description, setDescription] = useState<string>(offer.text ?? '');
    const [category, setCategory] = useState<string[]>(offer.categories ?? []);

    const [center, setCenter] = useState<{ lat: number; lng: number; } | null>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setUrl(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0]);

            if (id && !id.startsWith('new-') && event.target.files[0]) {
                const formData = new FormData();
                formData.append('file', event.target.files[0]);
                ApiClient.postUpload(`/com/offers/${id}/image`, formData)
                    .catch(console.error);
            }
        }
    };

    const geocodingLib = useMapsLibrary('geocoding');
    const geocoder = useMemo(
        () => geocodingLib && new geocodingLib.Geocoder(),
        [geocodingLib]
    );


    const handleClickMap = (e: MapMouseEvent) => {
        if (e.detail.latLng?.lat && e.detail.latLng?.lng && geocoder) {
            setCenter(e.detail.latLng);
            getAddressTitleByCoords(geocoder, e.detail?.latLng.lat, e.detail?.latLng.lng, locale, (title) => {
                setLocationTitle(title);
                setLatitude(e.detail.latLng?.lat);
                setLongitude(e.detail.latLng?.lng);
            });
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationTitle(event.target.value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (event.target.value && geocoder) {
                getCoordsByAddress(geocoder, event.target.value, locale, (lat, lng, title) => {
                    setLocationTitle(title);
                    setLatitude(lat);
                    setLongitude(lng);
                    setCenter({ lat, lng });
                });
            }
        }, 500);
    };

    useEffect(() => {
        if (!latitude || !longitude) {
            if (offer?.location?.lat && offer?.location?.long) {
                setLatitude(offer?.location?.lat);
                setLongitude(offer?.location?.long);
                setDistance(offer?.location?.distance ?? 0);
            } else if (profile?.location?.lat && profile?.location?.long) {
                setLatitude(profile?.location?.lat);
                setLongitude(profile?.location?.long);
                setDistance(profile?.location?.distance ?? 0);
            } else {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    setLatitude(coords.latitude);
                    setLongitude(coords.longitude);
                    setDistance(25);
                }, console.error);
            }
        }
    }, [
        latitude, longitude,
        offer.location?.lat, offer.location?.long, offer.location?.distance,
        profile.location?.lat, profile.location?.long, profile.location?.distance
    ]);

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
            formData.append('categories', JSON.stringify(category));
            formData.append('location', JSON.stringify({
                distance: distance,
                lat: latitude,
                long: longitude,
                title: locationTitle
            } as ILocation));

            formData.append('file', file);

            ApiClient.postUpload<string>(`/com/offers`, formData)
                .then((id) => setId(id))
                .catch(console.error)
                .finally(() => setEditMode(false));

        }
        //update existing offer
        else if (!id.startsWith('new-')) {
            ApiClient.put<IOffer>(`/com/offers/${id}`, {
                title,
                price,
                description,
                categories: category,
                discount,
                location: {
                    distance: distance,
                    lat: latitude,
                    long: longitude,
                    title: locationTitle
                } as ILocation
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
                    className='aspect-square w-full h-full  bg-no-repeat bg-cover rounded-sm'
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

                    <div className='flex w-full items-center gap-2 flex-col'>
                        <input
                            id='location'
                            placeholder='location'
                            value={locationTitle}
                            onChange={(e) => handleLocationChange(e)}
                            type='text'
                            className='text-sm p-2 w-full bg-transparent' />
                        <div className='flex w-full items-center gap-2'>
                            <span className='text-sm p-1 border-2 rounded-sm bg-secondary-bg'>distance</span>
                            <input
                                id='distance'
                                placeholder='distance'
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                type='range'
                                min={1}
                                max={100}
                                className='text-sm p-2 w-full bg-transparent' />
                            <span className='text-sm p-1 border-2 rounded-sm bg-secondary-bg'>{distance}</span>
                        </div>

                    </div>
                    :
                    <span
                        onClick={() => setEditMode(true)}
                        className='text-sm p-2'>
                        {`${locationTitle ?? 'no location set'} (${distance ?? 0})km`}
                    </span>
                }
            </div>

            {(editMode && latitude && longitude) &&
                <div className='w-full aspect-square bg-main-bg rounded-sm'>
                    <Map
                        defaultZoom={9}
                        id='offer-map'
                        cameraControl={false}
                        zoomControl={false}
                        streetViewControl={false}
                        mapTypeControl={false}
                        fullscreenControl={false}
                        mapId={'offer-map'}
                        defaultCenter={{ lat: latitude, lng: longitude }}
                        center={center ? center : null}
                        onClick={handleClickMap}
                        onZoomChanged={() => setCenter(null)}
                        onDragstart={() => setCenter(null)}
                    >
                        <Circle
                            fillColor={'#FF0000'}
                            strokeColor={'#FF0000'}
                            strokeWeight={0}
                            clickable={false}
                            radius={(distance ?? 25) * 1000}
                            center={{ lat: latitude, lng: longitude }}>
                        </Circle>

                        <AdvancedMarker
                            position={{ lat: latitude, lng: longitude }}
                        >

                        </AdvancedMarker>
                    </Map>
                </div>
            }

            {/* price */}
            <div className='flex flex-row justify-end w-full bg-main-bg rounded-sm border'>
                <div className='w-1/4 flex flex-row justify-start items-center p-2'>
                    <span className="fa-stack fa-lg">
                        <i className="fas fa-certificate fa-stack-2x text-gray-700" />
                        <i className="fas fa-euro-sign text-white fa-stack-1x" />
                    </span>
                </div>
                <div className='w-3/4 flex flex-row justify-end items-center border-l'>
                    <>
                        {editMode
                            ?
                            <input
                                value={`${price}.00`}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                type='number'
                                className='bg-transparent text-sm text-center p-1'
                            />
                            :
                            <span
                                onClick={() => setEditMode(true)}
                                className='text-nowrap'>
                                {price}
                            </span>
                        }
                        <i className='fa-solid fa-euro text-sm text-left p-2' />
                    </>
                </div>
            </div>



            {/* discount */}
            <div className='flex flex-row justify-start w-full bg-main-bg rounded-sm border'>
                <div className='w-1/4 flex flex-row justify-start items-center p-2'>
                    <span className="fa-stack fa-lg">
                        <i className="fas fa-certificate fa-stack-2x text-gray-700" />
                        <i className="fas fa-tag fa-inverse fa-stack-1x text-white" />
                    </span>
                </div>
                <div className='w-3/4 flex flex-row justify-start items-center'>
                    <>
                        <div className='flex w-1/2 p-2 justify-center items-center border-r border-l'>
                            {editMode
                                ?
                                <input
                                    value={`${discount}`}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    type='number'
                                    max={100}
                                    min={0}
                                    className='bg-transparent text-sm text-right p-2'
                                />
                                :
                                <div className='flex bg-main-bg rounded-sm p-2 items-center' >
                                    <span onClick={() => setEditMode(true)}>
                                        {discount}
                                    </span>
                                </div>
                            }
                            <i className='fa-solid fa-percentage text-sm text-left' />
                        </div>
                        <div
                            onClick={() => setEditMode(true)}
                            className='flex w-1/2 justify-center items-center'>
                            <span className='text-sm p-2 font-bold text-right'> TOTAL: {price - Math.floor(100 * price * (discount / 100)) / 100}</span>
                            <i className='fas fa-euro text-sm text-left' />
                        </div>
                    </>

                </div>
            </div>

            <div className='flex w-full bg-main-bg rounded-sm border p-2' >
                <CategorySelect
                    preselectedCategories={category}
                    onSelectCategories={sel => {
                        setCategory(sel);
                    }}
                    setAsParams={false} />
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
