/**
 * Components - Events - Calendar - EventsCalendar
 */

// UI
import { Calendar, Details2 } from '@drykiss/industry-ui'
import { useEvents } from '../hooks'
import { prepareCalendarEvents } from './helpers'

export const EventsCalendar = () => {
  const { eventList } = useEvents({})

  const events = prepareCalendarEvents(eventList)

  return (
    <Details2 fitParentHeight title="Events" open>
      <Calendar
        // dateClick={dateClick}
        // eventClick={eventClick}
        // initialView={initialView}
        // height={height}
        // eventContent={'eventContent'}
        events={events}
        hasLoading
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
      />
    </Details2>
  )
}
