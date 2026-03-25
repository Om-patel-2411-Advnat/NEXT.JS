// this is the way where we can send request without converting this component into client component and make it work like a server component 

import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage (){

    const news = await getAllNews();

    // here we don't need this fetch function anymore because we are getting the data directly from the function created in lib/news.js this file will give us the data directly without any promise so we don't have to await for the data 
    // const Response = await fetch('http://localhost:8080/news');

    // if(!Response.ok){
    //     throw new Error("Failed to fetch news")
    // }

    // const news = await Response.json();

    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news} />
        </>
    )
}


// this is  how we can send the request from the client component 

// 'use client'

// import NewsList from "@/components/news-list";
// import { useEffect, useState } from "react";

// export default function NewsPage (){
//     const [isLoading , setIsLoading] = useState(false);
//     const [error , setError] = useState();
//     const [news , setNews] = useState();

//     useEffect(()=>{
//         async function FetchNews(){
//             setIsLoading(true);
//             const Response = await fetch('http://localhost:8080/news');

//             if(!Response.ok){
//                 setError('Failed to fetch News');
//                 setIsLoading(false);
//             }
//             const news = await Response.json();

//             setIsLoading(false);
//             setNews(news);
//         }

//         FetchNews();
//     },[]);

//     if(isLoading){
//         return <p>Loading.....</p>
//     }
//     if(error){
//         return <p>{error}</p>
//     }
//     let NewsContent ;

//     if(news){
//         NewsContent = <NewsList news={news} />
//     }


//     return (
//         <>
//             <h1>News Page</h1>
//             {NewsContent}
//         </>
//     )
// }