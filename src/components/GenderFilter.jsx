import { useState } from "react";

function GenderFilter({ setGenderSend }) {
    const [error, setError] = useState(null);
    // const [gender, setGender] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const [genderPlaceHolder, setGenderPlaceHolder] = useState('Select gender'); // State to manage placeholder text

    const genders = ["Male", "Female", "Unknown", "Genderless"];

    const handleSelectItem = (input) => {
        // setGender(input);
        setGenderSend(input); // Send selected
        setGenderPlaceHolder(input); // Update placeholder text
        setShowDropdown(false); // Hide dropdown after selecting an item
    }
    return (
        <div>
            {!error ? (
                <div className="dropdown mt-2">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)} // ()=> to avoid too many re-renders error
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
            ) : (
                <p className="error-message">{error}</p>
            )
            }

        </div >
    )
}

export default GenderFilter