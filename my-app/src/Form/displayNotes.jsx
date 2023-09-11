import React from 'react';
import { TableDisplay } from './tableDisplay.jsx';

export const DisplayNotes = ({notesStored}) => {
    console.log('notes new comp', notesStored);

    const noteDisplayType = () => {
        const {contentType} = notesStored;

        switch(contentType.toLowerCase()) {
            case 'table': {
                return <TableDisplay data={notesStored}/>
            }
            default : {
                return <div> { notesStored.contentTitle }</div>
            }
        }
    }
    return (
        <>
            {noteDisplayType()}
         
        </>
       

    )
}