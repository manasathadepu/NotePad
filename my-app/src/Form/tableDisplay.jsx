import React, { useCallback, useEffect, useMemo, useState } from 'react';
import expensesJson from '../expenses.json'

export const TableDisplay = ({ data }) => {
    const { contentTitle, content } = data;
    const [loadData, setLoadData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [addColumn, setAddColumn] = useState(false);
    const [newRow, setNewRow] = useState({})

    useEffect(() => {
        const { content } = data;
        console.log('contentTitle', contentTitle)
        setLoadData([...expensesJson.expenses]);
        console.log('contnet', content)
        const fieldTitles = content.map((item) => item.fieldTitle.toLowerCase());
        setHeaders(fieldTitles);
    }, [contentTitle]);

    const tableHeaderRow = useCallback(() => {
        console.log('headers', headers, loadData)
        return headers && headers.map((header, index) => {
            const capitalizedFieldTitles = header.charAt(0).toUpperCase() + header.slice(1);


            return <th key={index}> {capitalizedFieldTitles} </th>
        })
    }, [headers])

    const handleNewRowDetails = (e) => {
        console.log('select', e.target.name, e.target.value);
        setNewRow(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }

    const AddColumnFields = (details) => {
        const { fieldType, placeholder, required, fieldTitle, options } = details;

        switch (fieldType.toLowerCase()) {
            case "number": {
                return <input type="number" name={fieldTitle.toLowerCase()} placeholder={placeholder} required min="0" onChange={(e) => handleNewRowDetails(e)} />
            }
            case "date": {
                return <input type="date" name={fieldTitle.toLowerCase()} placeholder={placeholder} required={required} onChange={(e) => handleNewRowDetails(e)} />
            }

            case "dropdown": {
                return <select name={fieldTitle.toLowerCase()}  defaultValue="select the option"  onChange={(e) => handleNewRowDetails(e)} >
                    {
                        options.map(option => <option value={option}>{option}</option>)
                    }

                </select>
            }

           case 'input': default: {
                return <input type="text" name={fieldTitle.toLowerCase()} placeholder={placeholder} required maxLength='100'  onChange={(e) => handleNewRowDetails(e)}  />
            }
        }

    }

    const addRowDetails = () => {
        setLoadData(prevState => [...prevState, newRow]);
        setNewRow({})
        setAddColumn(false);

    }
    const addRow = () => {
        setAddColumn(true)
    }

    const addButtonTitle = () => {
        const btnName = contentTitle.charAt(0).toUpperCase() + contentTitle.slice(1).toLowerCase();
        return `Add ${btnName}`;
    }

    const removeAddRow = () => {
        setNewRow({})
        setAddColumn(false);
    }
    return (
        <>
            <button onClick={addRow}> {addButtonTitle()}</button>
            {
                loadData.length > 0 ?
                    <>
                        <table>
                            <thead>
                                <tr>
                                    {tableHeaderRow()}
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    loadData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {headers.map((header, colIndex) => (
                                                <td key={colIndex}>{row[header]}</td>
                                            ))}
                                            <td><button>Edit</button> <button> Delete </button></td>
                                        </tr>
                                    ))
                                }

                                {
                                    addColumn ? <tr>
                                        {
                                            content.map((item, index) => (
                                                <td key={index}> {AddColumnFields(item)}</td>
                                            ))
                                        }
                                        <td><button onClick={addRowDetails}>Add Row</button><button onClick={removeAddRow}>Cancel</button></td>
                                    </tr> : null

                                }

                            </tbody>



                        </table>
                    </> : null

            }

        </>
    )

}