'use server';

import { createAuthSession, destroySession } from "@/lib/auth";

const { hashUserPassword, verifyPassword } = require("@/lib/hash");
const { createUser, getUserByEmail } = require("@/lib/user");
const { redirect } = require("next/navigation");

export async function SingUp(prevState , formData){
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};

    if(!email.includes('@')){
        errors.email = 'Please enter Valid email';
    }
    if(password.trim().length < 8){
        errors.password = "password should be 8 character long";
    }

    if(Object.keys(errors).length > 0){
        return{
            errors
        }
    }

    const hashedPassword = await hashUserPassword(password);
    try {
        const id =await createUser(email, hashedPassword);
        await createAuthSession(id);
        redirect('/training');
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE"){
            return {
                errors : {
                    email : 'this email is already used'
                }
            }
        }
        throw error  ;
    }
}

export async function login(prevState , formData){
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = getUserByEmail(email);

    if(!existingUser){
        return {
            errors : {
                email : "Credentials are wrong "
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password , password);

    if(!isValidPassword){
        return {
            errors: {
                password: "wrong password "
            }
        }
    }

    await createAuthSession(existingUser.id);
    redirect('/training');    
}

export async function auth(mode , prevState , formData){
    if(mode === 'login'){
        return login(prevState , formData);
    }

    return SingUp(prevState , formData);
}

export async function logout(){
    await destroySession ();
    redirect('/');
}