'use client';

// here we get the error object by default as a prop so we can access the error message 
export default function FilterError({error}){
    return (
        <div id="error">
            <h2>An Error occurred</h2>
            <p>{error.message}</p>
        </div>
    )
}