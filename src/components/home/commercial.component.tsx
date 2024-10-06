import React, { useEffect, useState } from 'react';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import { Link } from 'react-router-dom';
import { useLocale } from '../../contexts/locale';
import { ApiClient } from '../../networking';
import { IOffer } from '../../interfaces/commercial.interface';

const CommercialComponent: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { locale } = useLocale();

	// states
	const [ads, setAds] = useState<IOffer[]>([]);

	useEffect(() => {
		setIsLoading(true);
		ApiClient.get<IOffer[]>('/public/offers')
			.then((res) => {
				setAds(res);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="w-full">
			{isLoading && (
				<div className="p-2 flex w-full justify-center items-center">
					<CameraSpinner />
				</div>
			)}

			{!isLoading && (
				<>
					{ads.map((item, index) => (
						<div
							className="w-full flex flex-row justify-start items-start
                            hover:bg-secondary-bg-75 transition-colors delay-75 ease-in-out
                            border border-secondary-bg-75
                            "
							key={index}
						>
							<div
								className="bg-gray-600 h-full min-h-40 bg-center aspect-square flex justify-center items-center bg-no-repeat bg-cover"
								style={{ backgroundImage: `url(${item.preview})` }}
							/>
							<div className="w-full flex justify-start items-start flex-col">
								<div className="relative p-4 w-full flex justify-start items-start">
									<div className="p-1 w-5/6 flex justify-start items-start">
										<h1 className="text-3xl text-shadow-md font-bold text-left text-highlight-cl">
											{item.title}
										</h1>
									</div>

									<div className="absolute top-0 right-0">
										<Link className="" to={'/offers/' + item.id}>
											<div
												className="
                                                bg-secondary-bg
                                          hover:text-main-col
                                          hover:cursor-pointer
                                          hover:scale-103
                                          transition-all ease-in-out delay-75
                                          hover:bg-primary-bg
                                          hover:p-4
                                          hover:rounded-full
                                          active:scale-100
                                        p-1 w-full h-full flex justify-end items-end"
											>
												<i
													className="
                                        font-bold text-right text-shadow-sm fa-solid fa-link"
												/>
											</div>
										</Link>
									</div>
								</div>
								<div>
									<i className="p-1 fa-solid fa-location-dot" />
									<span>{item.location}</span>
								</div>

								<span className="text-sm p-1">
									{item.text}
								</span>
                                <hr className='my-1' />
								<div>
									{
										<div>
											<i className="p-1 fa-regular fa-calendar" />
											<span>{new Date().toLocaleDateString(locale)}</span>
											<span> - </span>
											{/* fake offer duration */}
											<span>
												{new Date(
													new Date().setDate(
														new Date().getDate() + 10 * Math.random()
													)
												).toLocaleDateString(locale)}
											</span>
										</div>
									}
								</div>
								<div>
									<i className="p-1 fas fa-coins" />
									{item.category === 'hotel' || item.category === 'trip' ? (
										<span>
											{' '}
											only{' '}
											<span className="font-extrabold text-xl">
												{item.price}
											</span>{' '}
											Eur per person
										</span>
									) : (
										<span>
											{' '}
											<b>{item.price}</b>Eur
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default CommercialComponent;
