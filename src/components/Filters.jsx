import { useEffect, useState } from "react";
// import LocationFilter from "./LocationFilter";
import GenderFilter from "./GenderFilter"
import StatusFilter from "./StatusFilter";
// import NumberFilters from "./NumberFilters";
import StringFilters from "./StringFilters";
function Filters({ setFilters }) {
    const [error, setError] = useState(null);
    const [genderParent, setGenderParent] = useState([]);
    // const [locationsParent, setLocationsParent] = useState([]);
    // const [ageParent, setAgeParent] = useState(0);
    // const [episodesParent, setEpisodesParent] = useState(0);
    const [statusParent, setStatusParent] = useState("");
    const [nameParent, setNameParent] = useState("");
    // const [originParent, setOriginParent] = useState("");
    const [speciesParent, setSpeciesParent] = useState("");
    const [typeParent, setTypeParent] = useState("");
    var filters = "";
    useEffect(() => {
        setError(null);
    }, []);
    const handleSendFilters = () => {
        console.log(filters)
        filters += nameParent != "" ? `&name=${nameParent}` : "";
        filters += statusParent != "" ? `&status=${statusParent}` : "";
        filters += speciesParent != "" ? `&species=${speciesParent}` : "";
        filters += typeParent != "" ? `&type=${typeParent}` : "";
        filters += genderParent != "" ? `&gender=${genderParent}` : "";
        setFilters(filters)
    }
    return (
        <>
            {!error ? (
                <div className="border p-2">
                    <StringFilters setNameSend={setNameParent} setSpeciesSend={setSpeciesParent} setTypeSend={setTypeParent} />
                    <GenderFilter setGenderSend={setGenderParent} />
                    <StatusFilter setStatusSend={setStatusParent} />
                    <hr />
                    <button className="btn btn-primary" onClick={handleSendFilters}>
                        Send Filters
                    </button>
                </div>
            ) : (
                <p className="error-message">{error}</p>
            )}
        </>
    )
}

export default Filters;
