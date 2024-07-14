import { useState } from "react";

function GenderFilter({ setGenderSend }) {
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const [genderPlaceHolder, setGenderPlaceHolder] = useState('Select gender'); // State to manage placeholder text
    const genders = ["Male", "Female", "Unknown", "Genderless"];
    const handleSelectItem = (input) => {
        setGenderSend(input); // Send selected to Filters component
        setGenderPlaceHolder(input); // Update placeholder text
        setShowDropdown(false); // Hide dropdown after selecting an item
    }
    return (
        <div>
            {
                <div className="dropdown mt-2">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)} // use arrow function (()=>) to avoid too many re-renders error
                        aria-haspopup="true" aria-expanded="false">
                        {genderPlaceHolder}
                    </a>
                    <div className={`dropdown-menu ${showDropdown ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                        {
                            genders.map((gender, index) => (
                                <a className="dropdown-item" href="#" onClick={() => handleSelectItem(gender)} key={index}>{gender}</a>
                            ))
                        }
                    </div>
                </div>
            }

        </div >
    )
}
export default GenderFilter