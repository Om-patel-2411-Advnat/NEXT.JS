import { NextResponse } from "next/server";

export function middleware(request){

    console.log(request);

    // this will pass the request to it's destination and before that we can add some security layers for the request 
    return NextResponse.next();
}