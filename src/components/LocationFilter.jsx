import { useEffect, useState } from "react";
import axios from "axios";

function LocationFilter({ setLocationsSend }) {
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const [locationPlaceHolder, setLocationPlaceHolder] = useState('Search locations...'); // State to manage placeholder text

    useEffect(() => {
        getAllLocations();
    }, []);

    const getAllLocations = async () => {
        try {
            const requestIntArray = [...Array(127).keys()].slice(1).toString(); // All locations
            const response = await axios.get(`https://rickandmortyapi.com/api/location/${requestIntArray}`);
            setLocations(response.data);
            setFilteredLocations(response.data); // Initialize filtered locations
            setError(null);
        } catch (error) {
            console.error('Error fetching API data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }

    useEffect(() => {
        // Show dropdown when search input is not empty
        setShowDropdown(searchInput.trim() !== '');
    }, [searchInput]);

    const handleFilter = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchInput(keyword); // Update search input state
        const filtered = locations.filter(location =>
            location.name.toLowerCase().includes(keyword)
        );
        setFilteredLocations(filtered);
    }

    const handleSelectItem = (location) => {
        setLocationPlaceHolder(location.name); // Update placeholder text with selected location
        setLocationsSend(location.name); // Send selected location
        setSearchInput(''); // Clear search input
        setShowDropdown(false); // Hide dropdown after selecting an item
    }
    return (
        <div>
            {!error ? (
                <div className="dropdown mt-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder={locationPlaceHolder}
                        value={searchInput}
                        onChange={handleFilter}
                    />
                    <div className={`dropdown-menu${showDropdown ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                        {filteredLocations.map((location, index) => (
                            <a
                                className="dropdown-item"
                                href="#"
                                key={index}
                                onClick={() => handleSelectItem(location)}
                            >
                                {location.name}
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="error-message">{error}</p>
            )}

        </div>
    )
}

export default LocationFilter


