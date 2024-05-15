import React, { useState } from 'react'
import data from "../MainData/data"
const Home = () => {
  const [filters, setFilters] = useState({});
  const [nameFilter, setNameFilter] = useState('');
  let keys = [];
  data.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    })
  });
  const handleCheckboxChange = (key, value) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [key]: {
          ...prevFilters[key],
          [value]: !prevFilters[key]?.[value]
        }
      };
      if (!updatedFilters[key][value]) {
        delete updatedFilters[key][value];
        if (Object.keys(updatedFilters[key]).length === 0) {
          delete updatedFilters[key];
        }
      }
      return updatedFilters;
    });
  };
  const filterData = () => {
    return data.filter(item => {
      for (const key in filters) {
        if (key && filters[key] && !filters[key][item[key]]) {
          return false;
        }
      }
      if (nameFilter && !item.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
  };
  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center'>
        {keys.map(key => (
          key !== 'id' && key !== 'name' && (
            <div className="col d-flex" key={key}>
              <h3 className='d-flex me-3'>{key} :</h3>
              <div className='mt-2'>
              {Array.from(new Set(data.map(item => item[key]))).map(value => (
                <div key={value}>
                  {value &&
                    <div class="form-switch d-flex mb-1">
                      <input class="form-check-input me-2"
                        type="checkbox"
                        role="switch"
                        checked={filters[key]?.[value]}
                        onChange={() => handleCheckboxChange(key, value)}
                      />
                      <label>{value}</label>
                    </div>
                  }
                </div>

              ))}
              </div>
            </div>
          )
        ))}
        {keys.includes('name') && (
        <div className="col-lg-2 col-md-4 col-sm-6">
          <h3 className='d-flex'>Name :</h3>
          <input
            type="text"
            placeholder="Enter a Name"
            className='border-bottom border-dark'
            style={{border:"none",outline:"none"}}
            value={nameFilter}
            onChange={(event) => setNameFilter(event.target.value)}
          />
        </div>
        )}
      </div>
      <div className='mt-5 pt-5'>
        <table class="table w-100 mt-5">
          <thead>
            <tr>
              {keys.map((header, index) => (
                <th key={index} scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterData().map((row, rowIndex) => (
              <tr key={rowIndex}>
                {keys.map((header, headerIndex) => (
                  <td key={headerIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home