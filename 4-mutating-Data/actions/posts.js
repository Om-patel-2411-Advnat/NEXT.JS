"use server"

import { redirect } from "next/navigation";
import {revalidatePath} from 'next/cache';

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";

// this is a server action part of handling form so you have to use " use server " inside this function 
export async function createPost(prevState, formData) {

    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let error = [];

    if (!title || title.trim().length === 0) {
        error.push("Tittle is required")
    }
    if (!content || content.trim().length === 0) {
        error.push("content is required")
    }
    if (!image || image.size === 0) {
        error.push("Image is required");
    }

    if (error.length > 0) {
        return { error };
    }
    let imageUrl

    try {
        console.log(image);
        imageUrl = await uploadImage(image);        
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }

    await storePost({
        imageUrl ,
        title,
        content,
        userId: 1,
    })

    revalidatePath('/' , "layout");
    redirect('/feed');
}

export async function TogglePostLikeStatus(postId){
    await updatePostLikeStatus( postId , 2 );
    revalidatePath('/' , "layout");
}