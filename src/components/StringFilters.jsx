import { useEffect, useState } from "react";

function StringFilters({ setNameSend, setSpeciesSend, setTypeSend }) {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setNameSend(name);
        setSpeciesSend(species);
        setTypeSend(type);
    }, [name, species, type]);

    return (
        <div>
            {!error ? (
                <>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="name-input" aria-describedby="nameHelp" placeholder="Enter name" onChange={(event) => setName(event.target.value)}></input>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="species-input" aria-describedby="speciesHelp" placeholder="Enter species" onChange={(event) => setSpecies(event.target.value)}></input>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="type-input" aria-describedby="typeHelp" placeholder="Enter type" onChange={(event) => setType(event.target.value)}></input>
                        </div>
                    </form>
                </>
            ) : (
                <p className="error-message">{error}</p>
            )
            }
        </div >
    )
}

export default StringFilters