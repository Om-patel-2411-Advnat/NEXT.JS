// here we want to make this route to be more dynamic like we can go to the month after going into specific month we can do this by creating two dynamic routes but we can do this by just replacing '[year]'  with '[[...filter]]' this will give us an array of all matched segments 


import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news"
import Link from "next/link";

export default function FilteredNewsPage({params}){

    const filter = params.filter;
    
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    let news;
    let links = getAvailableNewsYears();

    if(selectedYear && !selectedMonth){
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);   
    }

    if(selectedYear && selectedMonth){
        news = getNewsForYearAndMonth(selectedYear , selectedMonth);
        links = []; 
    }

    let newsContent = <p>No new found for this selected period</p>

    if(news && news.length > 0){
        newsContent = <NewsList news={news}/>
    }

    // we add + in-front of the selectedYear because we have to convert it to the number 
    if((selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
        (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
    ){
        throw new Error("Invalid filter....");
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map(link => {
                        
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;

                            return (<li key={link}>
                                <Link href={href}> {link} </Link>
                            </li>)
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}