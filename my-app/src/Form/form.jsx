import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { TextArea } from "../Controllers/textArea.jsx";
import notesStored from '../notes.json';
import { DisplayNotes } from "./displayNotes.jsx";



export const CreateForm = () => {

    const [textArea, setTextArea] = useState('');

    const [notes, setNotes] = useState([]);
    const [isDisplayNote, setIsDisplayNote] = useState(false);
    const [ selectedNote, setSelectedNote ] = useState({});
    // const renderCounter = useRef(0);
    // renderCounter.current = renderCounter.current + 1;

    useEffect(() => {
        console.log('notes memo', notes)
        notes && notesStored.push(notes)
    }, [notes]);

    const handleTextarea = useCallback((value) => {
        console.log(value, 'value');
        setTextArea(value)


    },[]);

    const validateJSON = (data) => {
        console.log('validateJSON')
        try {
            // Try to parse the data as JSON
            const parsed = JSON.parse(data);
            // If no errors are thrown, return true
            return parsed ? true : false;
        } catch (error) {
            // If an error is thrown, return false
            return false;
        }
    };

    // const handleOnSubmit = useCallback((event) => {
    //     event.preventDefault();
    //     console.log('called', textArea);

    //     const validationResult = validateJSON(textArea);

    //     if (validationResult) {
    //         const newNote = JSON.parse(textArea)

    //         let notesExist = []
    //         notesExist = notes && notes.filter(note => {
    //             return note.contentTitle.toLowerCase() === newNote.contentTitle.toLowerCase();
    //         });
    //         notesExist.length === 0 ? setNotes(prevState => [...prevState, newNote]) : console.log('null');

    //     }
    //     setTextArea('');

    // })
    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        const validationResult = validateJSON(textArea);

        if (validationResult) {
            const newNote = JSON.parse(textArea);

            if (!notes.some(note => note.contentTitle.toLowerCase() === newNote.contentTitle.toLowerCase())) {
                setNotes(prevNotes => [...prevNotes, newNote]);
                setTextArea('');
            } else {
                console.log('A note with the same title already exists.');
            }
        } else {
            console.log('Invalid JSON syntax.');
        }
        setTextArea('');

    };

    const handleDisplay = (note) => {
        console.log('notes', note)
        setIsDisplayNote(prevState => !prevState);
        setSelectedNote(note);

    }

    return (
        <div>
            <h3>Create Note Structure</h3>
            <form onSubmit={handleOnSubmit}>
                <TextArea label="noteSyntax" placeholder="Please enter required note structure" isNeeded={true}  handleTextareaChange={handleTextarea} />
                <button> Submit </button>
            </form>

            {/* <button onClick={handleDisplay}> Display Notes </button> */}
            <h4>Notes List</h4>
            <ul>
            {
                 notes.length > 0 && notes.map(note => <li onClick={() => handleDisplay(note)}> {note.contentTitle} </li>)
            }
            </ul>
            { isDisplayNote === true ? <DisplayNotes notesStored={selectedNote} /> : null }
             {/* <h1>Renders: {renderCounter.current}</h1>; */}


        </div>
    );
}