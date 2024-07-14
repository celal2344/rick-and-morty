function StringFilters({ setNameSend, setSpeciesSend, setTypeSend }) {
    //This component receives the functions to send the values of the inputs to the Filters component
    return (
        <div>
            {
                <>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="name-input" aria-describedby="nameHelp" placeholder="Enter name" onChange={(event) => setNameSend(event.target.value)}></input>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="species-input" aria-describedby="speciesHelp" placeholder="Enter species" onChange={(event) => setSpeciesSend(event.target.value)}></input>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="type-input" aria-describedby="typeHelp" placeholder="Enter type" onChange={(event) => setTypeSend(event.target.value)}></input>
                        </div>
                    </form>
                </>
            }
        </div >
    )
}
export default StringFilters