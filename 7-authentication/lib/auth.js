import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import db from './db';  
import { cookies } from 'next/headers';

const adapter = new BetterSqlite3Adapter(db , {
    user : 'users',
    session : 'sessions'
});
// lucia needs an adapter to store the user and session data in the database
// the adapter is a function that takes the database and returns a lucia adapter
// the adapter is used to create a lucia instance
// the lucia instance is used to create a session
// the session is used to create a session cookie
// the session cookie is used to authenticate the user
// the session cookie is stored in the browser
const lucia = new Lucia(adapter , {
    sessionCookie : {
        expires : false ,
        attributes : {
            // this is how we can set the session cookie to be secure in the production environment
            // if the environment is production, the session cookie will be secure
            // if the environment is development, the session cookie will not be secure
            // this is to prevent the session cookie from being stolen by a malicious user
            secure : process.env.NODE_ENV === 'production'
        }
    }
});

// this function creates a new session for the user and store them into the session table
// here we use the id of the user whome the session is created for
export async function createAuthSession(userId){
    // here we can also use email to identify the user and create a session for them but we are using id to identify the user
    const session = await lucia.createSession(userId , {});

    // here we can get the data that should be set on a session cookie by lucia and we can get them by calling lucia.createSessionCookie function
    // and this function need and session id 
    const sessionCookie = lucia.createSessionCookie(session.id);

    // this function sets the session cookie in the browser
    (await cookies()).set(sessionCookie.name , sessionCookie.value , sessionCookie.attributes);
}


// this function will be used to only allow authenticated user to be access the routes and other thing
export async function verifyAuth(){
    // if the incoming request is coming from the authenticated user than we will have this sessionCookie
    const sessionCookie = (await cookies()).get("auth_session");


    // if we don't have any sessionCookie than we will return an object that set the user and session to null so it says that the user is not verified 
    // we can also do this by just returning false 
    if(!sessionCookie){
        // return false ; 
        return {
            user : null ,
            session : null
        };
    }

    // if we get the sessionCookie tha we can find the sessionId
    const sessionId = sessionCookie.value;

    // if we don't get the sessionId we can return this same object that says unverified user
    if(!sessionId){
        return {
            user: null,
            session: null
        };
    }

    // now after getting the session id we have to verify it that it ios true or not 
    // if we got the session id in the database we will get the object with userid and sessionid and if not tha we will get user and session as a null
    const result = await lucia.validateSession(sessionId);

    try {
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(sessionCookie.name , sessionCookie.value , sessionCookie.attributes);
        }

        // if we not finc the session in the result wee can clear the cookie 
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {} 


    return result;
}

export async function destroySession (){
    const {session} = await verifyAuth(); 

    if(!session){
        return{
            error : 'unauthorized'
        }
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);    
}