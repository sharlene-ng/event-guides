export type CheckItem = { id: string; label: string };
export type CheckSection = { title: string; items: CheckItem[] };
export type CheckTab = { id: string; label: string; data: CheckSection[] };

export const confirmedSections: CheckSection[] = [
  {
    title: "Approval & Calendar",
    items: [
      { id: "ap1", label: "Approval received from Sharlene" },
      { id: "ap2", label: "Logged relevant in Google Calendar (e.g. FD Calendar, AIA GE etc)" },
      { id: "ap3", label: "Invite relevant PICs via email" },
    ],
  },
  {
    title: "Email to Building Management",
    items: [
      { id: "em1", label: "Email to mercumkpmoffice@gmail.com (≥1 week before)" },
      { id: "em2", label: "Event name included" },
      { id: "em3", label: "Event date & time included" },
      { id: "em4", label: "Estimated pax included" },
      { id: "em5", label: "Guest list PDF attached" },
      { id: "em6", label: "Reserved parking requested (if applicable)" },
      { id: "em7", label: "Use of Bomba / Service lift (if applicable)" },
      { id: "em8", label: "Aircond requested (if applicable)" },
    ],
  },
  {
    title: "Other Prep",
    items: [
      { id: "op1", label: "Guest list printed and passed to security" },
      { id: "op2", label: "Parking confirmed (if applicable)" },
      { id: "op3", label: "Aircond confirmed (if applicable)" },
      { id: "op4", label: "Bomba lift booking confirmed" },
    ],
  },
];

export const preEventSections: CheckSection[] = [
  {
    title: "Setup & Display",
    items: [
      { id: "sd1", label: "Prepare lanyard sleeve" },
      { id: "sd2", label: "Prepare lanyard strap" },
      { id: "sd3", label: "Print lanyard nametag" },
      { id: "sd4", label: "Bunting placement" },
      { id: "sd5", label: "Lobby TV display" },
      { id: "sd6", label: "Event hall layout arrangement" },
      { id: "sd7", label: "Extension" },
      { id: "sd8", label: "Mic batteries" },
      { id: "sd9", label: "Testimonial Room" },
    ],
  },
  {
    title: "Comms",
    items: [
      { id: "co1", label: "Event reminders" },
      { id: "co2", label: "Announcement to FD Official Group Chat with Agenda" },
    ],
  },
  {
    title: "People (PICs)",
    items: [
      { id: "pe1", label: "Registration PIC assigned" },
      { id: "pe2", label: "AV PIC assigned" },
      { id: "pe3", label: "Testimonial PIC" },
      { id: "pe4", label: "Cleaner (if applicable)" },
    ],
  },
  {
    title: "Refreshments & Catering",
    items: [
      { id: "rc1", label: "Food / Catering" },
      { id: "rc2", label: "Coffee / Tea" },
      { id: "rc3", label: "Candies, snacks" },
      { id: "rc4", label: "Crew food" },
    ],
  },
  {
    title: "Others",
    items: [
      { id: "ot1", label: "Standby credit card machines (company & internal events)" },
      { id: "ot2", label: "Any special arrangements" },
    ],
  },
];

export const eventDaySections: CheckSection[] = [
  {
    title: "Morning Setup",
    items: [
      { id: "ms1", label: "Event PIC and Project PIC arrive at least 1 hour before (1.5 hours for larger call times)" },
      { id: "ms2", label: "Set up registration desk with nametags and attendance list; assigned personnel on standby" },
      { id: "ms3", label: "Switch on all lights and aircond (if weekend)" },
      { id: "ms4", label: "Both TVs at entrance turned on with holding slides or assigned video" },
    ],
  },
  {
    title: "AV & Technical Check",
    items: [
      { id: "av1", label: "All microphones tested and working" },
      { id: "av2", label: "Screen tested" },
      { id: "av3", label: "Slides / presentation loaded and tested" },
      { id: "av4", label: "Speaker / PA system tested" },
      { id: "av5", label: "Recording / live stream setup (if applicable) — send Zoom link in the group" },
    ],
  },
];

export const postEventSections: CheckSection[] = [
  {
    title: "Wrap Up",
    items: [
      { id: "pv1", label: "Ensure all rubbish is cleared and tied up" },
      { id: "pv2", label: "Switch off all lights" },
      { id: "pv3", label: "Ensure the Big Hall back door is locked" },
      { id: "pv4", label: "Walk through the entire office premises to confirm everyone has left" },
      { id: "pv5", label: "Before heading home, make sure the entrance door is closed and all lights are off" },
    ],
  },
];

export const checklistTabs: CheckTab[] = [
  { id: "confirmed", label: "When Date Is Confirmed", data: confirmedSections },
  { id: "pre",       label: "Pre-Event",               data: preEventSections },
  { id: "event",     label: "On Event Date",            data: eventDaySections },
  { id: "post",      label: "Post-Event",               data: postEventSections },
];

export const allChecklistSections: CheckSection[] = checklistTabs.flatMap((t) => t.data);
