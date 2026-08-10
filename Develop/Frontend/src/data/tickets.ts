export interface ITicket {
  id: number;

  ticketType: {
    en: string;
    fa: string;
  };

  href: string;
}

export const tickets: ITicket[] = [
  {
    id: 1,
    ticketType: {
      en: "Museums",
      fa: "موزه ها",
    },
    href: "/",
  },

  {
    id: 2,
    ticketType: {
      en: "Cinema & Theater",
      fa: "سینما و تئاتر",
    },
    href: "/",
  },

  {
    id: 3,
    ticketType: {
      en: "Events & Courses",
      fa: "رویداد ها و دوره ها",
    },
    href: "/",
  },
];