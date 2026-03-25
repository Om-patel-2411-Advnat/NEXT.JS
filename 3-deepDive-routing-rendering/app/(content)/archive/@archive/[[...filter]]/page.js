// here we want to make this route to be more dynamic like we can go to the month after going into specific month we can do this by creating two dynamic routes but we can do this by just replacing '[year]'  with '[[...filter]]' this will give us an array of all matched segments 

import { Suspense } from "react";

import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth, getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";


async function FilterHeader({year , month}) {
    
    const availableYears = await getAvailableNewsYears();

    // here we are getting data directly from the database so all the data will be in a string format soe we don't have to convert the year and month in a number anymore
    if ((year && !availableYears.includes(year)) ||
        (month && !getAvailableNewsMonths(year).includes(month))
    ) {
        throw new Error("Invalid filter....");
    }
    let links = availableYears;
    if (year && !month) {
        links = getAvailableNewsMonths(year);
    }
    if (year && month) {
        links = [];
    }

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {links.map(link => {
                        const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

                        return (<li key={link}>
                            <Link href={href}> {link} </Link>
                        </li>)
                    })}
                </ul>
            </nav>
        </header>
    )
}

async function FilterNews({Year , month}){
    let news ;

    if(Year && !month){
        news = await getNewsForYear(Year);
    }else if(Year && month){
        news = await getNewsForYearAndMonth(Year , month);
    }
    let newsContent = <p>No news found for this selected period</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    return newsContent;
}

export default async function FilteredNewsPage({params}){

    const filter = params.filter;
    
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    // we add + in-front of the selectedYear because we have to convert it to the number 
    // if((selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    //     (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
    // ){
    //     throw new Error("Invalid filter....");
    // }


    return (
        <>
            <Suspense fallback={<p>Loading Filter Header.....</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading details....</p>}>
                <FilterNews Year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    )
}