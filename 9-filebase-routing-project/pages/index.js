import { useRouter } from "next/router";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { getFeaturedEvents } from "../dummy-data"

export default function HomePage() {
    const events = getFeaturedEvents();
    const router = useRouter();

    function findEventsHandler(year,month){
        const fullPath = `/events/${year}/${month}`;
        
        router.push(fullPath);
    }
    return (
        <div>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList items={events}/>
        </div>
    )
    
}