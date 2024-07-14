import './App.css'
import { useState } from 'react'
import Table from './components/Table'
import Filters from './components/Filters'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-table/dist/bootstrap-table.min.css';

function App() {
  const [filters, setFilters] = useState("");
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4 mt-2'>
          <Filters setFilters={setFilters} />
        </div>
        <div className='col-8 mt-2'>
          <Table filters={filters} />
        </div>
      </div>
    </div>
  )
}

export default App
