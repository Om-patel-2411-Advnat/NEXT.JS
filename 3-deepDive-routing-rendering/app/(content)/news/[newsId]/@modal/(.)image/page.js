import ModalBackDrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({ params }) {

    const newsId = params.newsId;
    const newsItem = await getNewsItem(newsId);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <ModalBackDrop />
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem.image}`} />
                </div>
            </dialog>
        </>
    )
}