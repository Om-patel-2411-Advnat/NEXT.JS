
// here this layout is used for parallel routes is here it doesn't just get the only one children prop instead they get the both 
// you can access the content of both the parallel routes here next js provides functionality that you can access the content of the parallel pages by directly using there name as you set after '@' any name you set is used to get the content of the page as we can see here we can access the "archive" & "latest" by just using there name
export default function ArchiveLayout ({archive , latest}){
    return (
        <div >
            <h1>News Archive</h1>
            <section id="archive-filter">{archive}</section>
            <section id="archive-latest">{latest}</section>
        </div>
    )
}