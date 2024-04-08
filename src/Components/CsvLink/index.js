import { CSVLink } from 'react-csv';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CSV = ({ showAll, data, name, columns }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAll());
  }, [dispatch,showAll]);

  const csvData = Array.isArray(data) ? data : [];
  const slicedColumns = columns.slice(0, -2);
  console.log("csv", csvData)

  const headers = slicedColumns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filename = `${name}_${getCurrentDate()}.csv`;

  return (
    <>
    <div className='csv-link'>
      <CSVLink
        target="_blank"
        filename={filename}
        headers={headers}
        asyncOnClick={true}
        data={csvData.map(({ createdAt, updatedAt, ...rest }) => rest)}
        >
        {console.log("csvData.mpap", csvData)}
        Download CSV
      </CSVLink>
        </div>
    </>
  );
};

export default CSV;
