import React from 'react';
import { Calendar, MapPin, Users, Ticket, ExternalLink } from 'lucide-react';

const EventsHub = () => {
    const events = [
        { id: 1, title: 'Global Tech Hackathon 2026', org: 'Major League Hacking', date: 'Oct 15-17', format: 'Online', attendees: 1200 },
        { id: 2, title: 'Microsoft Campus Connect', org: 'Microsoft HR', date: 'Oct 22', format: 'Hybrid', attendees: 450 },
        { id: 3, title: 'Open Source Contribution Workshop', org: 'GitHub', date: 'Nov 05', format: 'Online', attendees: 800 },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-8">
                <h2 className="text-2xl font-medium text-blue-900 mb-2 flex items-center">
                     Events & Hackathons
                </h2>
                <p className="text-gray-600 text-sm">Discover and register for upcoming coding competitions, campus drives, and tech webinars.</p>
            </div>

            <div className="space-y-4">
                {events.map(event => (
                    <div key={event.id} className="bg-white border border-blue-100 rounded-md p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                        <div className="flex-1 mb-4 md:mb-0">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">{event.title}</h3>
                            <p className="text-sm font-medium text-blue-600 mb-3">By {event.org}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center"> {event.date}</span>
                                <span className="flex items-center"> {event.format}</span>
                                <span className="flex items-center"> {event.attendees} going</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex justify-center items-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                                 Details
                            </button>
                            <button className="flex-1 md:flex-none flex justify-center items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                                 RSVP
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsHub;
