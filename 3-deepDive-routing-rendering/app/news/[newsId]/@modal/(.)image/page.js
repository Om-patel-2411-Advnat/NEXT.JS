import { DUMMY_NEWS } from "@/dummy-news";

export default function InterceptedImagePage({ params }) {

    const newsId = params.newsId;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsId);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <div className="modal-backdrop" />
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem.image}`} />
                </div>
            </dialog>
        </>
    )
}