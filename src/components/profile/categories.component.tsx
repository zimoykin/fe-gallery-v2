import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../networking';

interface Props {
    selectedCategories: string[];
    selectedCategoriesChanged: (categories: string[]) => void;
}
const CategoriesComponent: React.FC<Props> = ({
    selectedCategories: preSelectedCategories,
    selectedCategoriesChanged
}) => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>(preSelectedCategories ?? []);
    const [categories, setCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        ApiClient.get<string[]>('/settings/offer-categories')
            .then((res) => {
                setCategories(res);
            })
            .catch(console.error);
    }, []);


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const selected = selectedCategories.includes(value)
            ? selectedCategories.filter((category) => category !== value)
            : [...selectedCategories, value];

        setSelectedCategories(selected);
        selectedCategoriesChanged(selected);
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
                    {categories.map((categoryItem: string, index) => (
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

export default CategoriesComponent;