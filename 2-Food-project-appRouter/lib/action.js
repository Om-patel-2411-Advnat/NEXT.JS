'use server';

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";


export async function shareMeal(prevState , formData){

    function InvalidCheck(text) {
        return !text || text.trim() === '';
    }

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (
        InvalidCheck(meal.title) ||
        InvalidCheck(meal.summary) ||
        InvalidCheck(meal.instructions) ||
        InvalidCheck(meal.creator) ||
        InvalidCheck(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid Input'
        };
    }

    await saveMeal(meal);

    revalidatePath('/meals', 'layout');

    redirect('/meals');
}
