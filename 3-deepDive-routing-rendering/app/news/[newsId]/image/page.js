import { DUMMY_NEWS } from "@/dummy-news";

export default function ImagePage({params}){

    const newsId = params.newsId ;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsId);

    if (!newsItem) {
        notFound();
    }

    return(
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`}/>
        </div>
    )
}