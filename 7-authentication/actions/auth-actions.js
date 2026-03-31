'use server';

const { hashUserPassword } = require("@/lib/hash");
const { createUser } = require("@/lib/user");
const { redirect } = require("next/navigation");

export async function SingUp(prev , formData){
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
        await createUser(email, hashedPassword);
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

    redirect('/training');
}