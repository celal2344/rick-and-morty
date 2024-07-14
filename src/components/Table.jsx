import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.js';

function Table({ filters }) {
    const tableRef = useRef(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState(<li className="page-item disabled"><a className="page-link" href="#">0</a></li>);
    const BASE_URL = "https://rickandmortyapi.com/api/character";
    // Fetch data from the API when the page loads for the first time
    const fetchData = async () => {
        try {
            console.log(`${BASE_URL}/?page=${page}${filters}`);
            await axios.get(`${BASE_URL}/?page=${page}${filters}`)
                .then(result => {
                    setData(result.data);
                    console.log(result.data);
                    setError(null);
                });

        } catch (error) {
            console.error('Error fetching API data:', error);
            setError('Error fetching data. Please try again later.');
        }
    };
    // Fetch data from the API when the filters or the page changes
    useEffect(() => {
        fetchData();
        //Save pagesize when the page changes so that it doesn't reset to default after the table is refreshed with new data from api
        setPageSize($(tableRef.current).bootstrapTable("getOptions").pageSize)
    }, [filters, page]);
    // Create the table when the data is fetched
    useEffect(() => {
        if (data != null) {
            console.log($(tableRef.current).bootstrapTable("getOptions").pageSize);
            if (data.results.length > 0) {
                $(tableRef.current).bootstrapTable("destroy");//Destroy the table to avoid duplication
                $(tableRef.current).bootstrapTable({
                    data: data.results,
                    pagination: true,
                    pageSize: pageSize,
                    pageList: [5, 10, 15, 20],
                    detailView: true,
                    detailViewIcon: false,
                    detailViewByClick: true,
                    detailFormatter: detailFormatter,
                    columns: [
                        { field: 'image', title: 'Images', formatter: imageFormatter },
                        { field: 'name', title: 'Name', sortable: true },
                        { field: 'status', title: 'Status', sortable: true },
                        { field: 'species', title: 'Species', sortable: true },
                        { field: 'type', title: "Type", sortable: true },
                        { field: 'gender', title: 'Gender', sortable: true },
                    ],
                });
                setPagination(<li className="page-item disabled" > <a className="page-link" href="#">{page}/{data.info.pages}</a></li>)
            } else {
                setError('No data found');
            }
        }
    }, [data]);
    // Format the image column to display images on bootstrap-table
    const imageFormatter = (value, row) => {
        return `<img className="center" src="${value}" alt="${row.name}" style="max-width: 100px; max-height: 100px;" />`;
    };
    // Format the detail view to display the data in a more readable way
    function detailFormatter(index, row) {
        var html = []
        html.push('<div class="container border">')
        $.each(row, function (key, value) {
            console.log(value)
            if (key == "episode" || key == "image" || key == "url") {
                html.push('')
            } else if (key == "origin") {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + capitalizeFirstLetter(key) + ':</b> ' + value.name + '</p>')
            } else if (key == "location") {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + capitalizeFirstLetter(key) + ':</b> ' + value.name + '</p>')
            }
            else {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + capitalizeFirstLetter(key) + ':</b> ' + value + '</p>')
            }
        })
        html.push('</div>')
        return html.join('')
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //If there is no error, display the table, otherwise display the error message
    return (
        <div>
            {!error ?
                <div>
                    <table ref={tableRef} id="data-table" className="table"></table>
                    <div className='pagination d-flex justify-content-center'>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#" onClick={() => page > 1 ? setPage(page - 1) : null}>Previous</a></li>
                                {pagination}
                                <li className="page-item"><a className="page-link" href="#" onClick={() => page < data.info.pages ? setPage(page + 1) : null}>Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                :
                <p className="error-message">{error}</p>
            }
        </div>
    );
}

export default Table;