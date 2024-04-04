  import React, { useMemo, useState } from 'react';
  import { useTable, useSortBy } from 'react-table';
  import Search from '../Search';
  import ModifyTableButton from '../ModifyTableButton';
  import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';


  const DynamicTable = ({
    columns,
    data,
    searchColumns, 
    deleteAction,
    showOneRow,
    handleColumnChange,
    handleKeywordChange,
    showOneRowData,
    count,
    showAll,    
  }) => {
    const tableData = useMemo(() => data, [data]);
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data: tableData,
        initialState: {
          hiddenColumns: columns
            .filter(column => column.showByDefault)
            .map(column => column.accessor),
        },
      },
      useSortBy
    );
    const pageSize=10
      const dispatch = useDispatch()
      const [currentPage,setCurrentPage] = useState(1)
    const handlePageChange = (pageNumber,pageSize) => {
      setCurrentPage(pageNumber);
      dispatch(showAll(pageNumber, pageSize)); 
    };
    const handleClear = () => {
      document.getElementById('searchKey').value = '';
      document.getElementById('searchCol').value = '';
      dispatch(showAll({page:0,size:10}))
      };

    return (
      <div className="grid grid-cols-1">
        <div className="grid-item">
          {console.log("table component search function columns",searchColumns)}
          <Search handleColumnChange={handleColumnChange} handleKeywordChange={handleKeywordChange} columns={searchColumns} onClear={handleClear}/>

          <div className="table-container">
            <table {...getTableProps()} className="table table-striped  ">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={
                          index === 0 || index === columns.length - 1 || index === columns.length - 2
                            ? 'hidden'
                            : 'trip-table-th'
                        }
                      >
                        {column.render('Header')}
                        {column.isSorted && <span>{column.isSortedDesc ? '🔽' : '🔼'}</span>}
                      </th>
                    ))}
                    <th>Edit/Delete</th>
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                      {row.cells.map((cell, index) => (
                        <td
                          key={index}
                          {...cell.getCellProps()}
                          style={{
                            padding: '1px',
                            display:
                              index === 0 || index === columns.length - 1 || index === columns.length - 2
                                ? 'none'
                                : 'table-cell',
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                      <td>
                        {row.original?.id && (
                          <ModifyTableButton
                            rowID={row.original.id}
                            deleteAction={deleteAction}
                            showOneRow={showOneRow}
                            showOneRowData={showOneRowData}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
                <div className='pagination-container'>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1),pageSize)}
              disabled={currentPage <= 1}
              className='pagination-item'

            />
            {Array.from({ length: Math.ceil(count / pageSize) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1,pageSize)}
                className='pagination-item'
              >
                {index + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next
            onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(count / pageSize)),pageSize)}
            disabled={currentPage === Math.ceil(count / pageSize)}
            className='pagination-item'

          />
          </Pagination>
          </div>
        </div>
      </div>
    );
  };

  export default DynamicTable;
