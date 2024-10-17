import React, { useEffect, useState } from 'react';
import { ApiClient } from '../networking';
import { useSearchParams } from 'react-router-dom';

const CategorySelect: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState<string[]>([]);

    const [params, setParams] = useSearchParams();

    useEffect(() => {
        ApiClient.get<string[]>('/settings/offer-categories')
            .then((res) => {
                setCategory(res);
                const categories = params.get('categories');
                if (categories) {
                    setSelectedCategories(categories.split(',').filter(pred => res.includes(pred) && pred !== ''));
                }
            })
            .catch(console.error);
    }, [params]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSelectedCategories((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((category) => category !== value)
                : [...prevSelected, value]
        );

        let cats = params.get('categories')?.split(',') ?? [];
        if (cats.includes(value)) {
            cats = cats.filter(pred => pred !== value);
        } else {
            cats.push(value);
        }
        
        params.set('categories', cats.join(','));
        setParams(params);
    };


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-full min-w-36">
            <button
                className="bg-main-bg shadow-md rounded-md p-1"
                onClick={toggleDropdown}
            >
                <p className='p-1 w-full text-center text-xxs'>
                    {selectedCategories.length > 0
                        ? selectedCategories.length > 2 ? `selected: ${selectedCategories.length}` : selectedCategories.join(', ')
                        : 'set category'}
                </p>

            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto no-scrollbar">
                    {category.map((categoryItem: string, index) => (
                        <label
                            key={index}
                            className="block p-2 cursor-pointer
                            hover:scale-105 hover:text-highlight-cl hover:bg-primary-bg
                            bg-secondary-bg text-secondary-cl"
                        >
                            <input
                                type="checkbox"
                                value={categoryItem}
                                checked={selectedCategories.includes(categoryItem)}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            {categoryItem}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategorySelect;
