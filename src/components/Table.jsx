import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.js';
import { usePopper } from 'react-popper';

function Table({ filters }) {
    const tableRef = useRef(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(<li className="page-item disabled"><a className="page-link" href="#">0</a></li>);
    const [pageSize, setPageSize] = useState(20);
    const BASE_URL = "https://rickandmortyapi.com/api/character";
    // Fetch data from the API when the page loads for the first time
    const fetchData = async () => {
        console.log(filters);
        try {
            console.log(`${BASE_URL}/?page=${page}${filters}&count=5`);
            await axios.get(`${BASE_URL}/?page=${page}${filters}&count=5`)
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
    useEffect(() => {
        fetchData();
    }, [filters, page]);
    function detailFormatter(index, row) {
        var html = []
        $.each(row, function (key, value) {
            console.log(value)
            if (key == "episode" || key == "image" || key == "url") {
                html.push('')
            } else if (key == "origin") {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + key + ':</b> ' + value.name + '</p>')
            } else if (key == "location") {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + key + ':</b> ' + value.name + '</p>')
            }
            else {
                html.push('<p style="max-width: 800px; white-space: normal; word-wrap: break-word;"><b>' + key + ':</b> ' + value + '</p>')
            }

        })
        return html.join('')
    }
    // When the data changes, create the table
    useEffect(() => {
        if (data != null) {
            setPagination(<li className="page-item disabled" > <a className="page-link" href="#">{page}/{data.info.pages}</a></li>)
            console.log($(tableRef.current))
            if (data.results.length > 0) {
                $(tableRef.current).bootstrapTable("destroy");
                $(tableRef.current).bootstrapTable({
                    data: data.results,
                    detailView: true,
                    detailViewByClick: true,
                    pagination: true,

                    pageSize: pageSize,
                    pageList: [5, 10, 15, 20],
                    detailFormatter: detailFormatter,
                    columns: [
                        { field: 'image', title: 'Images', formatter: imageFormatter },
                        { field: 'name', title: 'Name' },
                        { field: 'status', title: 'Status' },
                        { field: 'species', title: 'Species' },
                        { field: 'type', title: "Type" },
                        { field: 'gender', title: 'Gender' },
                    ],
                });
            } else {
                setError('No data found');
            }
        }
    }, [data]);

    // Format the image column to display images on bootstrap-table
    const imageFormatter = (value, row) => {
        return `<img class="center" src="${value}" alt="${row.name}" style="max-width: 100px; max-height: 100px;" />`;
    };

    //If there is no error, display the table, otherwise display the error message
    return (
        <div>
            {!error ?
                <div>
                    <table ref={tableRef} id="data-table" className="table mt-2"></table>
                    <div className='pagination d-flex justify-content-center'>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(page - 1)}>Previous</a></li>
                                {pagination}
                                <li className="page-item"><a className="page-link" href="#" onClick={() => setPage(page + 1)}>Next</a></li>
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
