import { useState } from "react";

function StatusFilter({ setStatusSend }) {
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const [statusPlaceHolder, setStatusPlaceHolder] = useState('Select status'); // State to manage placeholder text

    const statuses = ["Alive", "Dead", "Unknown"];

    const handleSelectItem = (input) => {
        setStatusSend(input);// Send selected to Filters component
        setStatusPlaceHolder(input); // Update placeholder text
        setShowDropdown(false); // Hide dropdown after selecting an item
    }
    return (
        <>
            {
                <div className="dropdown mt-2">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)} // use arrow function (()=>) to avoid too many re-renders error
                        aria-haspopup="true" aria-expanded="false">
                        {statusPlaceHolder}
                    </a>
                    <div className={`dropdown-menu ${showDropdown ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                        {
                            statuses.map((status, index) => (
                                <a className="dropdown-item" href="#" onClick={() => handleSelectItem(status)} key={index}>{status}</a>
                            ))
                        }
                    </div>
                </div>

            }
        </>
    )
}

export default StatusFilter