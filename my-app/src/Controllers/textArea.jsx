import React, { memo } from "react";
// import Form from "react-bootstrap/Form";

export const TextArea = memo(({isNeeded,placeholder,handleTextareaChange, title}) => {
console.log('text area', )
    return (
        <>
            <label> {title} </label>
            <textarea  placeholder={placeholder} required={isNeeded} onChange={(e) => handleTextareaChange(e.target.value)}  defaultValue= ''/>
        </>
        

    )
});