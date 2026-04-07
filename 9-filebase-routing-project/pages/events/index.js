import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data"

export default function AllEventsPage() {
    const events = getAllEvents();
    return (
        <div>
        <h1>All Events page </h1>
        <EventList items={events}/>
        </div>
    )
    
}