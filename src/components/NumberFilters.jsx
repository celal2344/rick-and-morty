import { useEffect, useState } from "react";

function NumberFilters({ setAgeSend, setEpisodesSend }) {
    const [age, setAge] = useState(0);
    const [episodes, setEpisodes] = useState(0);

    useEffect(() => {
        setAgeSend(age);

    }, [age]);

    useEffect(() => {
        setEpisodesSend(episodes);
    }, [episodes])
    return (
        <div>
            {
                <div data-mdb-input-init className="form-outline row">
                    <input type="number" id="typeNumber" className="form-control m-2 col" placeholder="Age" onChange={(event) => setAge(event.target.value)} />

                    <input type="number" id="typeNumber" className="form-control m-2 col" placeholder="Number of Episodes" onChange={(event) => setEpisodes(event.target.value)} />
                </div>
            }
        </div >
    )
}

export default NumberFilters