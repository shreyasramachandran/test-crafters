import React from 'react';
import { useTable, Column } from 'react-table';

interface QuestionData {
    question_number: number;
    user_answer: string;
    correct_answer: string;
    result_status: string;
}

interface PerformanceTableProps {
    data: QuestionData[];
}

function PerformanceTable({ data }: PerformanceTableProps) {
    const columns: Column<QuestionData>[] = React.useMemo(() => [
        {
            Header: 'Question Number',
            accessor: 'question_number',
        },
        {
            Header: 'Your Answer',
            accessor: 'user_answer',
            Cell: ({ value, row }: { value: string; row: { original: QuestionData } }) => (
                <div style={{
                    color: row.original.result_status === 'Incorrect' ? '#FF6384' : (row.original.result_status === 'Correct' ? '#4CAF50' : undefined),
                    padding: '10px'
                }}>
                    {value}
                </div>
            )
        },
        {
            Header: 'Correct Answer',
            accessor: 'correct_answer',
        },
        {
            Header: 'Result',
            accessor: 'result_status',
            Cell: ({ value }: { value: string }) => (
                <div style={{
                    color: value === 'Incorrect' ? '#FF6384' : (value === 'Correct' ? '#4CAF50' : undefined),
                    padding: '10px'
                }}>
                    {value}
                </div>
            )
        }
    ], []);

    const styles = {
        table: {
            width: '100%', // Full width
            borderCollapse: 'collapse' as const, // Ensures borders between cells are merged; using 'as const' for literal type
        },
        cell: {
            padding: '10px', // Adds space within cells
            border: '1px solid #ccc', // Adds borders around cells
        },
        header: {
            padding: '10px',
            border: '1px solid #bbdefb', // Typically, headers have a slightly different style
            backgroundColor: '#36A2EB', // Background color for headers
            color: '#ffffff',
        }
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<QuestionData>({ columns, data });

    return (
        <table {...getTableProps()} style={styles.table}>
            <thead>
                {headerGroups.map(headerGroup => {
                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={key} {...restHeaderGroupProps}>
                            {headerGroup.headers.map(column => {
                                const { key, ...restColumn } = column.getHeaderProps();
                                return (
                                    <th key={key} {...restColumn} style={styles.header}>
                                        {column.render("Header")}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                        <tr key={key} {...restRowProps}>
                            {row.cells.map(cell => {
                                const { key, ...restCellProps } = cell.getCellProps();
                                return (
                                    <td key={key} {...restCellProps} style={styles.cell}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default PerformanceTable;
