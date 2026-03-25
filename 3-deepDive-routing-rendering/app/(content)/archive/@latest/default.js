// this is a reserved file name which is used whenever we are dealing with parallel routes because this file will allow us to define a default fallback content that should be displayed if that route doesn't have a specific content for the path that's currently loaded here in the

import { getLatestNews } from "@/lib/news";
import NewsList from "@/components/news-list";

// if you have the same file content as the default page and page.js than you cna remove the page.js file that will work as a same as before and route will also keep working 

export default async function LatestPage() {

    const latestNews = await getLatestNews();

    return (
        <>
            <h2>Latest News Page</h2>
            <NewsList news={latestNews} />
        </>
    )
}