import ExploreBtn from "@/components/ExploreBtn";
import {events} from "@/lib/constants";
import EventCard from "@/components/EventCard";

const HomePage = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-center">
        The Hub for <span className="text-primary">Every Dev</span> <br />Event You Can&#39;t Miss
      </h1>
      <p className="mt-5 text-center text-muted-foreground">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomePage