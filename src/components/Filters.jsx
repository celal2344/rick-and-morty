import { useState } from "react";
import GenderFilter from "./GenderFilter"
import StatusFilter from "./StatusFilter";
import StringFilters from "./StringFilters";
function Filters({ setFilters }) {
    const [genderParent, setGenderParent] = useState([]);
    const [statusParent, setStatusParent] = useState("");
    const [nameParent, setNameParent] = useState("");
    const [speciesParent, setSpeciesParent] = useState("");
    const [typeParent, setTypeParent] = useState("");
    var filters = "";
    //Receive filters from the child components and combine them into a single string for the API call
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
            {
                <div className="border p-2">
                    <StringFilters setNameSend={setNameParent} setSpeciesSend={setSpeciesParent} setTypeSend={setTypeParent} />
                    <GenderFilter setGenderSend={setGenderParent} />
                    <StatusFilter setStatusSend={setStatusParent} />
                    <hr />
                    <button className="btn btn-primary" onClick={handleSendFilters}>
                        Send Filters
                    </button>
                </div>
            }
        </>
    )
}

export default Filters;
