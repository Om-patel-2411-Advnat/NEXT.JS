'use client';

// this useFormState hook is now no longer in user in latest versions of the react and next so instead we can use useActionState hook to do the same and this is imported from react not from react-dom
import { useFormState } from "react-dom";

import FormSubmit from "@/components/form-submit";

export default function PostForm({action}){
    const [state, formAction] = useFormState(action, {});

    return (
        <>
            <h1>Create a new post</h1>
            <form action={formAction}>
                <p className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </p>
                <p className="form-control">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                </p>
                <p className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows="5" />
                </p>
                <p className="form-actions">
                    <FormSubmit />
                </p>
                {state.error && 
                    <ul className="form-errors">
                        {state.error.map(error => <li key={error}>{error}</li>)}
                    </ul>
                }
            </form>
        </>
    );
}