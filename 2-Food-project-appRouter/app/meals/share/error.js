// every error component is a client component keep in mind
'use client';

export default function Error(){
    return (
        <main className="error">
            <h1>An Error occurred!! </h1>    
            <p>Failed to create Meal...</p>
        </main>
    )
}