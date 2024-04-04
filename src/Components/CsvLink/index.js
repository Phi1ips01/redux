import { CSVDownload } from 'react-csv';
import React from 'react';
import { format } from 'date-fns';

const CsvLink = ({ data, name, columns }) => {
  const now = new Date();
  const formattedDate = format(now, 'yyyyMMddHHmm');
  const csvData = Array.isArray(data) ? data : [];
  const slicedColumns = columns.slice(0, -2);
  console.log("csv", csvData)

  const headers = slicedColumns.map(column => ({
    label: column.Header, // Convert underscore to space and capitalize
    key: column.accessor,
  }));

  return (
    <>
      {csvData.length > 0 && (
        <CSVDownload
          target="_blank"
          headers={headers}
          asyncOnClick={true}
          filename={`${formattedDate}_${name}`}
          data={csvData.map(({ createdAt, updatedAt, ...rest }) => rest)}
        >
          {console.log("csvData.mpap",csvData)}
          Download CSV
        </CSVDownload>
      )}
    </>
  );
};

export default CsvLink;
