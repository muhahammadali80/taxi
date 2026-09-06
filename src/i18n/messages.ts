import type { Locale } from "./config";

export type Messages = {
  skip: string;
  langLabel: string;
  nav: { home: string; book: string; services: string; areas: string; about: string; contact: string; bookNow: string; openMenu: string; closeMenu: string };
  hero: { eyebrow: string; title: string; text: string; book: string; call: string; whatsapp: string; imageAlt: string };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rideNow: string;
    scheduleLater: string;
    pickup: string;
    destination: string;
    pickupPlaceholder: string;
    destinationPlaceholder: string;
    date: string;
    time: string;
    returnJourney: string;
    returnDate: string;
    returnTime: string;
    getQuote: string;
    useAddress: string;
    cantFindTitle: string;
    cantFindText: string;
    cantFindCta: string;
    chooseRide: string;
    passengers: string;
    luggage: string;
    passengerOne: string;
    passengerMany: string;
    plusFourPassengers: string;
    requestPrice: string;
    suitcaseOne: string;
    suitcaseMany: string;
    fullName: string;
    phone: string;
    email: string;
    notes: string;
    notesOptional: string;
    notesPlaceholder: string;
    continue: string;
    back: string;
    cancel: string;
    confirm: string;
    confirming: string;
    bookNow: string;
    bookingInProgress: string;
    receivedTitle: string;
    receivedNote: string;
    receivedContact: string;
    confirmedLiveTitle: string;
    confirmedLiveNote: string;
    declinedTitle: string;
    declinedNote: string;
    submitError: string;
    close: string;
    done: string;
    steps: { journey: string; ride: string; details: string; confirm: string };
    summaryIntro: string;
    labels: {
      pickup: string;
      destination: string;
      date: string;
      time: string;
      return: string;
      passengers: string;
      luggage: string;
      vehicle: string;
      name: string;
      phone: string;
      fare: string;
    };
    confirmedTitle: string;
    reference: string;
    confirmedNote: string;
    fareNote: string;
    estFare: string;
    findingDriver: string;
    calculating: string;
    distance: string;
    driveTime: string;
    calculatingRoute: string;
    routeUnavailable: string;
  };
  bookCta: {
    title: string;
    text: string;
    whatsapp: string;
    call: string;
    whatsappMessage: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  errors: {
    pickup: string;
    destination: string;
    samePlace: string;
    date: string;
    datePast: string;
    time: string;
    timeSoon: string;
    returnDate: string;
    returnDateBefore: string;
    returnTime: string;
    passengers: string;
    luggage: string;
    name: string;
    phone: string;
    email: string;
    geoDenied: string;
    geoError: string;
    geoLocate: string;
    searching: string;
    noPlaces: string;
    placesFailed: string;
    retry: string;
  };
  vehicles: {
    sedan: string;
    sedanDetail: string;
    sedanDesc: string;
    prius: string;
    priusDetail: string;
    priusDesc: string;
    van: string;
    vanDetail: string;
    vanDesc: string;
    featured: string;
  };
  why: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: { title: string; alt: string }[];
  };
  airport: {
    eyebrow: string;
    title: string;
    text: string;
    points: { title: string; text: string }[];
    cta: string;
    imageAlt: string;
  };
  vehicle: {
    eyebrow: string;
    title: string;
    text: string;
    imageAlt: string;
    streetAlt: string;
    features: string[];
    sedanAlt: string;
    vanAlt: string;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };
  areas: {
    eyebrow: string;
    title: string;
    text: string;
    extra: string;
    contact: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    items: { name: string; quote: string; rating: number }[];
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    imageAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    book: string;
    call: string;
    whatsapp: string;
    whatsappMessage: string;
  };
  footer: {
    blurb: string;
    contact: string;
    explore: string;
    bookTaxi: string;
    coverage: string;
    coverageText: string;
    coverageNote: string;
    rights: string;
    privacy: string;
    terms: string;
    bookingNote: string;
    hours: string;
  };
  sticky: { call: string; book: string; whatsapp: string };
  bookingStatus: {
    awaiting_confirmation: string;
    confirmed: string;
    in_progress: string;
    completed: string;
    declined: string;
    cancelled: string;
  };
  langSuggest: { title: string; text: string; accept: string; dismiss: string };
  toasts: { routeReady: string; quoteReady: string; confirmed: string; received: string };
  stats: { items: { value: number; suffix: string; label: string }[] };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    updated: string;
    back: string;
    privacy: string[];
    terms: string[];
  };
  notFound: { title: string; text: string; back: string };
  bookPage: { title: string; text: string };
};

export const messages: Record<Locale, Messages> = {
  en: {
    skip: "Skip to content",
    langLabel: "Language",
    nav: { home: "Home", book: "Book a Ride", services: "Services", areas: "Areas We Cover", about: "About", contact: "Contact", bookNow: "Book Now", openMenu: "Open menu", closeMenu: "Close menu" },
    hero: {
      eyebrow: "Barcelona · Taxi",
      title: "Reliable rides. Whenever you need them.",
      text: "Book a comfortable, reliable taxi in moments. Local journeys, airport transfers and pre-booked rides across Barcelona and Catalonia.",
      book: "Book a Ride",
      call: "Call",
      whatsapp: "WhatsApp",
      imageAlt: "Barcelona city at dusk",
    },
    booking: {
      eyebrow: "Quick booking",
      title: "Where are you going?",
      subtitle: "No account needed. Get a quote in seconds.",
      rideNow: "Ride now",
      scheduleLater: "Schedule later",
      pickup: "Pickup location",
      destination: "Destination",
      pickupPlaceholder: "Address, hotel or meeting point",
      destinationPlaceholder: "Where should we take you?",
      date: "Date",
      time: "Pickup time",
      returnJourney: "Return journey",
      returnDate: "Return date",
      returnTime: "Return time",
      getQuote: "Request Price",
      useAddress: "Use this address",
      cantFindTitle: "Can't find your pickup location?",
      cantFindText: "No problem. Give us a call and we'll arrange your booking for you.",
      cantFindCta: "Call to Book",
      chooseRide: "Choose your ride",
      passengers: "Passengers",
      luggage: "Luggage",
      passengerOne: "passenger",
      passengerMany: "passengers",
      plusFourPassengers: "+4 passengers",
      requestPrice: "Request Price",
      suitcaseOne: "suitcase",
      suitcaseMany: "suitcases",
      fullName: "Full name",
      phone: "Phone Number",
      email: "Email (optional)",
      notes: "Notes",
      notesOptional: "(optional)",
      notesPlaceholder: "Flight number, building name or extra instructions",
      continue: "Continue",
      back: "Back",
      cancel: "Cancel",
      confirm: "Confirm Booking",
      confirming: "Confirming…",
      bookNow: "Book Now",
      bookingInProgress: "Booking...",
      receivedTitle: "Booking request received",
      receivedNote: "Your booking request has been sent to the driver. You will receive confirmation once the driver accepts your booking.",
      receivedContact: "For questions, call {phone}.",
      confirmedLiveTitle: "Booking confirmed",
      confirmedLiveNote: "Your driver has confirmed this journey.",
      declinedTitle: "Booking could not be confirmed",
      declinedNote: "Unfortunately, the driver is unable to confirm this journey. You can call the driver if you still need a ride.",
      submitError: "The booking could not be saved. Please try again.",
      close: "Close",
      done: "Done",
      steps: { journey: "Journey", ride: "Ride", details: "Details", confirm: "Confirm" },
      summaryIntro: "Please check your journey details before confirming.",
      labels: { pickup: "Pickup", destination: "Destination", date: "Date", time: "Time", return: "Return", passengers: "Passengers", luggage: "Luggage", vehicle: "Vehicle", name: "Name", phone: "Phone", fare: "Price" },
      confirmedTitle: "Booking request received",
      reference: "Booking Reference:",
      confirmedNote: "You will receive confirmation once the driver accepts. For changes, call {phone}.",
      fareNote: "Your driver will confirm the price. Night and airport pickups may vary.",
      estFare: "Est. fare",
      findingDriver: "Finding your driver…",
      calculating: "Calculating",
      distance: "Distance",
      driveTime: "Drive time",
      calculatingRoute: "Calculating route…",
      routeUnavailable: "Route unavailable — addresses entered above",
    },
    bookCta: {
      title: "Need a taxi?",
      text: "Tell us where you’re going and we’ll arrange the ride for you.",
      whatsapp: "Book on WhatsApp",
      call: "Call Now",
      whatsappMessage: "Hello, I’d like to book a taxi in Barcelona.",
    },
    faq: {
      eyebrow: "Barcelona Taxi FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How much is a taxi from Barcelona Airport to the city centre? Is there a fixed fare?",
          a: "There is no single official fixed fare between Barcelona-El Prat Airport and Barcelona city centre. Taxi fares depend on the applicable regulated tariff, route and relevant supplements. If you contact us for a journey, we can confirm the expected price or fare before your trip.",
        },
        {
          q: "Can I pay by card or contactless?",
          a: "Yes, card payments are available. Contactless payment may also be available depending on the vehicle and payment terminal. If you need a specific payment method, contact us before your journey and we will confirm it.",
        },
        {
          q: "Should I book my taxi in advance?",
          a: "Advance booking is recommended for airport transfers, early-morning journeys, larger groups and trips requiring a specific vehicle. Contact us through WhatsApp or by phone and we can arrange the journey with you.",
        },
        {
          q: "Can I request a child seat or travel with luggage?",
          a: "Yes. When contacting us, tell us the number of passengers, amount of luggage and whether you require a child seat. This allows us to arrange the most suitable vehicle for your journey.",
        },
        {
          q: "Can I change or cancel my booking?",
          a: "Yes. If your plans change, contact us as soon as possible by phone or WhatsApp.",
        },
        {
          q: "What should I do if I leave something in the taxi?",
          a: "Contact us as soon as possible with your journey details, including your pickup location, destination, date and approximate time. We will use the available information to help identify the journey and assist with recovering the item.",
        },
      ],
    },
    errors: {
      pickup: "Enter a pickup location.",
      destination: "Enter a destination.",
      samePlace: "Destination must be different from pickup.",
      date: "Choose a date.",
      datePast: "Date cannot be in the past.",
      time: "Choose a pickup time.",
      timeSoon: "Please choose a time at least 20 minutes from now.",
      returnDate: "Choose a return date.",
      returnDateBefore: "Return date cannot be before pickup.",
      returnTime: "Choose a return time.",
      passengers: "This vehicle seats up to {n} passengers.",
      luggage: "Please choose a luggage amount.",
      name: "Enter your full name.",
      phone: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      geoDenied: "Location permission denied — please enter your address manually.",
      geoError: "Unable to get your location — please enter your address manually.",
      geoLocate: "Use my current location",
      searching: "Searching…",
      noPlaces: "No matching locations. Try a street, hotel, station or landmark.",
      placesFailed: "Couldn't load suggestions. You can still type the address.",
      retry: "Try again",
    },
    vehicles: {
      sedan: "Sedan",
      sedanDetail: "4 passengers · 2 large bags or 3 small",
      sedanDesc: "The everyday option for city journeys with lighter luggage.",
      prius: "Prius Plus and Dacia",
      priusDetail: "4 passengers · 4 large bags or 6–7 small",
      priusDesc: "The main taxi for airport and everyday journeys. Comfortable, practical, and ready for luggage.",
      van: "Caddy and Mercedes V-Class",
      vanDetail: "More than 4 passengers · extra luggage",
      vanDesc: "More space for groups, extra bags, and larger journeys.",
      featured: "Most used",
    },
    why: {
      eyebrow: "Why choose us",
      title: "Quiet confidence, from pickup to drop-off.",
      items: [
        { title: "Reliable pickups", text: "Arrive on time and travel without unnecessary stress." },
        { title: "Comfortable journeys", text: "A clean, well-kept vehicle for local and longer-distance travel." },
        { title: "Airport transfers", text: "Pre-booked airport journeys with dependable pickup times." },
        { title: "Local knowledge", text: "An experienced driver who knows Barcelona and the surrounding area." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Travel that fits the occasion.",
      items: [
        { title: "Local taxi journeys", alt: "Urban street in a Mediterranean city" },
        { title: "Airport transfers", alt: "Aircraft above the clouds" },
        { title: "Long-distance travel", alt: "Coastal road through open landscape" },
        { title: "Business travel", alt: "Modern city buildings" },
        { title: "Station transfers", alt: "Train arriving at a city station" },
        { title: "Pre-booked journeys", alt: "Professional taxi ready for a booked pickup" },
      ],
    },
    airport: {
      eyebrow: "Airport transfers",
      title: "On time for every flight.",
      text: "Pre-booked pickups for arrivals and departures. Meet at the terminal and travel in comfort — without the uncertainty of last-minute queues.",
      points: [
        { title: "Arrivals", text: "Meet at the terminal after you land." },
        { title: "Departures", text: "Leave with time to spare for check-in." },
        { title: "Flight notes", text: "Add your flight number when you book." },
      ],
      cta: "Book Airport Transfer",
      imageAlt: "Airport terminal at dusk",
    },
    vehicle: {
      eyebrow: "The vehicles",
      title: "The Prius Plus is the taxi you can expect.",
      text: "A Barcelona taxi for everyday travel, airport transfers and longer journeys. Choose a sedan for lighter trips, or a larger taxi when you need more space.",
      imageAlt: "Toyota Prius Plus taxi in Barcelona, black with yellow doors",
      streetAlt: "Prius Plus Barcelona taxi parked on a city street",
      features: [
        "Comfortable space for 4 passengers",
        "Luggage for airport and everyday trips",
        "The main car for most journeys",
        "Clean, practical and ready to go",
      ],
      sedanAlt: "Standard sedan taxi driving in Barcelona",
      vanAlt: "Larger Mercedes taxi van in Barcelona colours",
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps. Then you’re on your way.",
      steps: [
        { title: "Tell us where you’re going", text: "Message us on WhatsApp or call with your pickup and destination." },
        { title: "We’ll arrange the ride", text: "We’ll confirm the time, vehicle and expected fare with you." },
        { title: "Enjoy your ride", text: "Your driver arrives at the arranged pickup point." },
      ],
    },
    areas: {
      eyebrow: "Areas we cover",
      title: "Reliable taxi service across Barcelona and surrounding areas.",
      text: "Local journeys, airport transfers and pre-booked rides across Barcelona and Catalonia. If you are staying nearby or travelling a little further, just tell us where you need to go.",
      extra: "Longer-distance travel is available by arrangement.",
      contact: "Not sure if we cover your area? Contact us.",
    },
    reviews: {
      eyebrow: "Customer reviews",
      title: "What passengers say.",
      items: [
        {
          name: "Lucía Navarro",
          rating: 5,
          quote:
            "I booked a very early airport transfer and everything ran on time. The driver arrived a few minutes early, helped with the bags and the ride was calm. I would book again without hesitation.",
        },
        {
          name: "Javier Morales",
          rating: 5,
          quote:
            "There were four of us with plenty of luggage and they assigned a vehicle with room to spare. It was clean and comfortable, and the driver knew the best route perfectly.",
        },
        {
          name: "Marta Ruiz",
          rating: 5,
          quote:
            "I needed a taxi at the last minute and wrote on WhatsApp. They replied quickly, confirmed the price and arranged pickup without any fuss. Very easy to organise.",
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "A professional driver, not a call centre.",
      p1: "TapTaxiBcn is a professional taxi service for everyday journeys, airport transfers and longer-distance travel. You book directly, travel in a clean, comfortable car, and deal with the same trusted driver.",
      p2: "Based in Barcelona, providing convenient local and longer-distance journeys across the city and surrounding areas.",
      imageAlt: "Barcelona taxi with black body and yellow doors",
    },
    contact: {
      eyebrow: "Ready when you are",
      title: "Need a ride? Book in less than a minute.",
      text: "Call, message or book online. No account required.",
      book: "Book Your Taxi",
      call: "Call",
      whatsapp: "WhatsApp",
      whatsappMessage: "Hello, I'd like to book a taxi in Barcelona.",
    },
    footer: {
      blurb: "Reliable taxi service across Barcelona and surrounding areas.",
      contact: "Contact",
      explore: "Explore",
      bookTaxi: "Book a taxi",
      coverage: "Service area",
      coverageText: "Barcelona and surrounding areas of Catalonia.",
      coverageNote: "Longer journeys by arrangement.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms",
      bookingNote: "Bookings are confirmed by the driver.",
      hours: "Available 24 hours, 7 days a week",
    },
    sticky: { call: "Call", book: "Book", whatsapp: "WhatsApp" },
    bookingStatus: {
      awaiting_confirmation: "Awaiting Driver Confirmation",
      confirmed: "Booking Confirmed",
      in_progress: "In Progress",
      completed: "Completed",
      declined: "Declined",
      cancelled: "Cancelled",
    },
    langSuggest: {
      title: "Browse in {lang}?",
      text: "We can show the site in your device language. Your choice is saved on this device.",
      accept: "Use {lang}",
      dismiss: "Keep current language",
    },
    toasts: {
      routeReady: "Pickup and destination set",
      quoteReady: "Fare estimate ready",
      confirmed: "Booking confirmed",
      received: "Booking request sent to the driver",
    },
    stats: {
      items: [
        { value: 24, suffix: "/7", label: "Available" },
        { value: 4, suffix: "", label: "Languages" },
        { value: 3, suffix: "", label: "Ride options" },
      ],
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of booking",
      updated: "Last updated",
      back: "Back to home",
      privacy: [
        "TapTaxiBcn collects only the information needed to provide a taxi booking: your name, phone number, email address, pickup and destination details, and any notes you choose to add.",
        "Booking details are used to confirm your journey, contact you about the ride, and keep a record of the booking. We do not sell your information, and we do not require you to create an account.",
        "If this website is connected to a booking inbox or messaging service, your details are sent only for the purpose of fulfilling the journey you requested.",
        "You can ask us to update or delete your booking information by email or phone.",
        "This page is a starting template and should be reviewed by the operator before public use.",
      ],
      terms: [
        "Bookings made through this website are requests for taxi travel with TapTaxiBcn. A booking is confirmed when you receive a booking reference and the driver accepts the journey.",
        "Quoted prices are estimates based on the details you provide. The final fare may change if the route, waiting time, extra stops or passenger numbers differ from the original booking.",
        "Please be ready at the agreed pickup time. Waiting time and cancellations close to pickup may be charged. Airport pickups should include a flight number in the notes where possible.",
        "Vehicles have limited passenger and luggage space. If you need a larger vehicle, contact us before booking.",
        "These terms are a starting template and should be reviewed by the operator before public use.",
      ],
    },
    notFound: { title: "Page not found", text: "The page you’re looking for doesn’t exist.", back: "Back home" },
    bookPage: { title: "Need a taxi?", text: "Tell us where you’re going and we’ll arrange the ride for you." },
  },
  es: {
    skip: "Saltar al contenido",
    langLabel: "Idioma",
    nav: { home: "Inicio", book: "Reservar", services: "Servicios", areas: "Zonas", about: "Sobre nosotros", contact: "Contacto", bookNow: "Reservar ahora", openMenu: "Abrir menú", closeMenu: "Cerrar menú" },
    hero: {
      eyebrow: "Barcelona · Taxi",
      title: "Viajes fiables. Cuando los necesites.",
      text: "Reserva un taxi cómodo y puntual en unos segundos. Trayectos locales, traslados al aeropuerto y reservas anticipadas en Barcelona y Cataluña.",
      book: "Reservar un taxi",
      call: "Llamar",
      whatsapp: "WhatsApp",
      imageAlt: "Barcelona al atardecer",
    },
    booking: {
      eyebrow: "Reserva rápida",
      title: "¿Adónde vas?",
      subtitle: "Sin cuenta. Presupuesto en segundos.",
      rideNow: "Ahora",
      scheduleLater: "Programar",
      pickup: "Punto de recogida",
      destination: "Destino",
      pickupPlaceholder: "Dirección, hotel o punto de encuentro",
      destinationPlaceholder: "¿Adónde te llevamos?",
      date: "Fecha",
      time: "Hora de recogida",
      returnJourney: "Viaje de vuelta",
      returnDate: "Fecha de vuelta",
      returnTime: "Hora de vuelta",
      getQuote: "Consultar precio",
      useAddress: "Usar esta dirección",
      cantFindTitle: "¿No encuentras el punto de recogida?",
      cantFindText: "Ningún problema. Llámanos y organizamos la reserva por ti.",
      cantFindCta: "Llamar para reservar",
      chooseRide: "Elige tu vehículo",
      passengers: "Pasajeros",
      luggage: "Equipaje",
      passengerOne: "pasajero",
      passengerMany: "pasajeros",
      plusFourPassengers: "+4 pasajeros",
      requestPrice: "Consultar precio",
      suitcaseOne: "maleta",
      suitcaseMany: "maletas",
      fullName: "Nombre completo",
      phone: "Teléfono móvil",
      email: "Correo electrónico (opcional)",
      notes: "Notas",
      notesOptional: "(opcional)",
      notesPlaceholder: "Número de vuelo, edificio o indicaciones",
      continue: "Continuar",
      back: "Atrás",
      cancel: "Cancelar",
      confirm: "Confirmar reserva",
      confirming: "Confirmando…",
      bookNow: "Reservar ahora",
      bookingInProgress: "Reservando...",
      receivedTitle: "Solicitud de reserva recibida",
      receivedNote: "Hemos enviado tu solicitud al conductor. Recibirás la confirmación cuando acepte la reserva.",
      receivedContact: "Para consultas, llama al {phone}.",
      confirmedLiveTitle: "Reserva confirmada",
      confirmedLiveNote: "El conductor ha confirmado este trayecto.",
      declinedTitle: "No se ha podido confirmar la reserva",
      declinedNote: "El conductor no puede confirmar este trayecto. Puedes llamarle si sigues necesitando un taxi.",
      submitError: "No se ha podido guardar la reserva. Inténtalo de nuevo.",
      close: "Cerrar",
      done: "Listo",
      steps: { journey: "Viaje", ride: "Coche", details: "Datos", confirm: "Confirmar" },
      summaryIntro: "Revisa los detalles del viaje antes de confirmar.",
      labels: { pickup: "Recogida", destination: "Destino", date: "Fecha", time: "Hora", return: "Vuelta", passengers: "Pasajeros", luggage: "Equipaje", vehicle: "Vehículo", name: "Nombre", phone: "Teléfono", fare: "Precio" },
      confirmedTitle: "Solicitud de reserva recibida",
      reference: "Referencia de reserva:",
      confirmedNote: "Recibirás la confirmación cuando el conductor acepte. Para cambios, llama al {phone}.",
      fareNote: "El conductor confirmará el precio. Noche y aeropuerto pueden variar.",
      estFare: "Precio est.",
      findingDriver: "Buscando tu conductor…",
      calculating: "Calculando",
      distance: "Distancia",
      driveTime: "Tiempo",
      calculatingRoute: "Calculando la ruta…",
      routeUnavailable: "Ruta no disponible — direcciones indicadas arriba",
    },
    bookCta: {
      title: "¿Necesitas un taxi?",
      text: "Dinos adónde vas y organizamos el viaje por ti.",
      whatsapp: "Reservar por WhatsApp",
      call: "Llamar ahora",
      whatsappMessage: "Hola, me gustaría reservar un taxi en Barcelona.",
    },
    faq: {
      eyebrow: "FAQ taxi Barcelona",
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto cuesta un taxi del aeropuerto de Barcelona al centro? ¿Hay tarifa fija?",
          a: "No hay una tarifa fija oficial única entre el aeropuerto Barcelona-El Prat y el centro de Barcelona. El precio depende de la tarifa regulada vigente, del recorrido y de los suplementos aplicables. Si nos contactas para un trayecto, podemos confirmarte el precio o la tarifa prevista antes del viaje.",
        },
        {
          q: "¿Puedo pagar con tarjeta o contactless?",
          a: "Sí, se acepta el pago con tarjeta. El pago contactless también puede estar disponible según el vehículo y el terminal. Si necesitas un método de pago concreto, contáctanos antes del viaje y te lo confirmaremos.",
        },
        {
          q: "¿Debo reservar el taxi con antelación?",
          a: "Conviene reservar con antelación para traslados al aeropuerto, salidas muy temprano, grupos grandes y trayectos que requieran un vehículo concreto. Escríbenos por WhatsApp o llámanos y organizamos el viaje contigo.",
        },
        {
          q: "¿Puedo pedir una silla infantil o viajar con equipaje?",
          a: "Sí. Al contactarnos, indícanos el número de pasajeros, el equipaje y si necesitas silla infantil. Así podemos asignar el vehículo más adecuado para tu trayecto.",
        },
        {
          q: "¿Puedo cambiar o cancelar mi reserva?",
          a: "Sí. Si cambian tus planes, contáctanos lo antes posible por teléfono o WhatsApp.",
        },
        {
          q: "¿Qué hago si olvido algo en el taxi?",
          a: "Contáctanos lo antes posible con los datos del viaje: punto de recogida, destino, fecha y hora aproximada. Con esa información intentaremos identificar el trayecto y ayudarte a recuperar el objeto.",
        },
      ],
    },
    errors: {
      pickup: "Indica un punto de recogida.",
      destination: "Indica un destino.",
      samePlace: "El destino debe ser distinto de la recogida.",
      date: "Elige una fecha.",
      datePast: "La fecha no puede ser anterior a hoy.",
      time: "Elige una hora de recogida.",
      timeSoon: "Elige una hora con al menos 20 minutos de margen.",
      returnDate: "Elige una fecha de vuelta.",
      returnDateBefore: "La vuelta no puede ser anterior a la ida.",
      returnTime: "Elige una hora de vuelta.",
      passengers: "Este vehículo admite hasta {n} pasajeros.",
      luggage: "Indica el equipaje.",
      name: "Escribe tu nombre completo.",
      phone: "Introduce un teléfono válido.",
      email: "Introduce un correo válido.",
      geoDenied: "Permiso de ubicación denegado — escribe la dirección.",
      geoError: "No se ha podido obtener tu ubicación — escribe la dirección.",
      geoLocate: "Usar mi ubicación actual",
      searching: "Buscando…",
      noPlaces: "Ninguna coincidencia. Prueba una calle, hotel, estación o lugar.",
      placesFailed: "No se han podido cargar las sugerencias. Puedes escribir la dirección.",
      retry: "Reintentar",
    },
    vehicles: {
      sedan: "Sedán",
      sedanDetail: "4 pasajeros · 2 maletas grandes o 3 pequeñas",
      sedanDesc: "La opción de cada día para trayectos urbanos con menos equipaje.",
      prius: "Prius Plus y Dacia",
      priusDetail: "4 pasajeros · 4 maletas grandes o 6–7 pequeñas",
      priusDesc: "El taxi principal para aeropuerto y el día a día. Cómodo, práctico y con espacio para maletas.",
      van: "Caddy y Mercedes Clase V",
      vanDetail: "Más de 4 pasajeros · extra de equipaje",
      vanDesc: "Más espacio para grupos, maletas extra y trayectos más amplios.",
      featured: "El más usado",
    },
    why: {
      eyebrow: "Por qué elegirnos",
      title: "Tranquilidad, desde la recogida hasta el destino.",
      items: [
        { title: "Puntualidad", text: "Llega a tiempo y viaja sin estrés innecesario." },
        { title: "Viajes cómodos", text: "Un vehículo limpio y cuidado para trayectos locales y más largos." },
        { title: "Traslados al aeropuerto", text: "Recogidas reservadas con horarios fiables." },
        { title: "Conocimiento local", text: "Un conductor con experiencia en Barcelona y alrededores." },
      ],
    },
    services: {
      eyebrow: "Servicios",
      title: "El viaje que encaja con cada ocasión.",
      items: [
        { title: "Trayectos locales", alt: "Calle urbana en una ciudad mediterránea" },
        { title: "Traslados al aeropuerto", alt: "Avión sobre las nubes" },
        { title: "Viajes de larga distancia", alt: "Carretera costera en un paisaje abierto" },
        { title: "Viajes de negocios", alt: "Edificios modernos de ciudad" },
        { title: "Traslados a estaciones", alt: "Tren llegando a una estación" },
        { title: "Reservas anticipadas", alt: "Taxi profesional listo para una recogida" },
      ],
    },
    airport: {
      eyebrow: "Traslados al aeropuerto",
      title: "A tiempo para cada vuelo.",
      text: "Recogidas reservadas para llegadas y salidas. Te esperamos en la terminal y viajas con calma, sin colas de última hora.",
      points: [
        { title: "Llegadas", text: "Te esperamos en la terminal al aterrizar." },
        { title: "Salidas", text: "Sal con tiempo de sobra para facturar." },
        { title: "Datos del vuelo", text: "Añade el número de vuelo al reservar." },
      ],
      cta: "Reservar traslado",
      imageAlt: "Terminal de aeropuerto al anochecer",
    },
    vehicle: {
      eyebrow: "Los vehículos",
      title: "El Prius Plus es el taxi que puedes esperar.",
      text: "Un taxi de Barcelona para el día a día, el aeropuerto y trayectos más largos. Elige un sedán para menos equipaje, o un taxi más grande cuando necesites espacio.",
      imageAlt: "Taxi Toyota Prius Plus en Barcelona, negro con puertas amarillas",
      streetAlt: "Prius Plus taxi de Barcelona aparcado en la calle",
      features: [
        "Espacio cómodo para 4 pasajeros",
        "Maletas para aeropuerto y el día a día",
        "El coche principal para la mayoría de trayectos",
        "Limpio, práctico y listo",
      ],
      sedanAlt: "Taxi sedán circulando por Barcelona",
      vanAlt: "Taxi furgoneta Mercedes en colores de Barcelona",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos. Y en camino.",
      steps: [
        { title: "Dinos adónde vas", text: "Escríbenos por WhatsApp o llámanos con el punto de recogida y el destino." },
        { title: "Organizamos el viaje", text: "Confirmamos contigo la hora, el vehículo y el precio previsto." },
        { title: "Disfruta el viaje", text: "El conductor llega al punto acordado." },
      ],
    },
    areas: {
      eyebrow: "Zonas",
      title: "Servicio de taxi fiable en Barcelona y alrededores.",
      text: "Trayectos locales, traslados al aeropuerto y reservas anticipadas en Barcelona y Cataluña. Si te alojas cerca o viajas un poco más lejos, indícanos el destino.",
      extra: "Los trayectos más largos se pueden concertar.",
      contact: "¿No sabes si cubrimos tu zona? Contáctanos.",
    },
    reviews: {
      eyebrow: "Opiniones",
      title: "Lo que dicen los pasajeros.",
      items: [
        {
          name: "Lucía Navarro",
          rating: 5,
          quote:
            "Reservé un traslado al aeropuerto muy temprano y todo fue puntual. El conductor llegó unos minutos antes, ayudó con las maletas y el trayecto fue tranquilo. Volvería a reservar sin dudarlo.",
        },
        {
          name: "Javier Morales",
          rating: 5,
          quote:
            "Viajábamos cuatro personas con bastante equipaje y nos asignaron un vehículo con espacio de sobra. Todo estaba limpio, cómodo y el conductor conocía perfectamente la mejor ruta.",
        },
        {
          name: "Marta Ruiz",
          rating: 5,
          quote:
            "Necesitaba un taxi a última hora y escribí por WhatsApp. Me respondieron rápido, confirmaron el precio y organizaron la recogida sin complicaciones. Muy fácil de gestionar.",
        },
      ],
    },
    about: {
      eyebrow: "Sobre nosotros",
      title: "Un conductor profesional, no un centro de llamadas.",
      p1: "TapTaxiBcn es un servicio profesional para trayectos diarios, aeropuerto y viajes más largos. Reservas en directo, viajas en un coche limpio y cómodo, y tratas con el mismo conductor de confianza.",
      p2: "Con base en Barcelona, para viajes locales y de mayor distancia por la ciudad y alrededores.",
      imageAlt: "Taxi de Barcelona negro con puertas amarillas",
    },
    contact: {
      eyebrow: "Cuando lo necesites",
      title: "¿Necesitas un taxi? Reserva en menos de un minuto.",
      text: "Llama, escribe o reserva online. Sin crear cuenta.",
      book: "Reservar taxi",
      call: "Llamar",
      whatsapp: "WhatsApp",
      whatsappMessage: "Hola, me gustaría reservar un taxi en Barcelona.",
    },
    footer: {
      blurb: "Servicio de taxi fiable en Barcelona y alrededores.",
      contact: "Contacto",
      explore: "Explorar",
      bookTaxi: "Reservar un taxi",
      coverage: "Zona de servicio",
      coverageText: "Barcelona y alrededores de Cataluña.",
      coverageNote: "Viajes más largos bajo petición.",
      rights: "Todos los derechos reservados.",
      privacy: "Política de privacidad",
      terms: "Términos",
      bookingNote: "El conductor confirma las reservas.",
      hours: "Disponible 24 horas, 7 días a la semana",
    },
    sticky: { call: "Llamar", book: "Reservar", whatsapp: "WhatsApp" },
    bookingStatus: {
      awaiting_confirmation: "Pendiente de confirmación del conductor",
      confirmed: "Reserva confirmada",
      in_progress: "En curso",
      completed: "Completada",
      declined: "Rechazada",
      cancelled: "Cancelada",
    },
    langSuggest: {
      title: "¿Ver la web en {lang}?",
      text: "Podemos mostrar el sitio en el idioma de tu dispositivo. Tu elección se guarda aquí.",
      accept: "Usar {lang}",
      dismiss: "Mantener el idioma actual",
    },
    toasts: {
      routeReady: "Origen y destino listos",
      quoteReady: "Presupuesto listo",
      confirmed: "Reserva confirmada",
      received: "Solicitud enviada al conductor",
    },
    stats: {
      items: [
        { value: 24, suffix: "/7", label: "Disponible" },
        { value: 4, suffix: "", label: "Idiomas" },
        { value: 3, suffix: "", label: "Tipos de viaje" },
      ],
    },
    legal: {
      privacyTitle: "Política de privacidad",
      termsTitle: "Condiciones de reserva",
      updated: "Última actualización",
      back: "Volver al inicio",
      privacy: [
        "TapTaxiBcn solo recoge la información necesaria para la reserva: nombre, teléfono, correo, puntos de recogida y destino, y las notas que quieras añadir.",
        "Los datos se usan para confirmar el viaje, contactarte y guardar la reserva. No vendemos tu información y no hace falta crear una cuenta.",
        "Si el sitio está conectado a un correo o mensajería, tus datos se envían solo para realizar el viaje solicitado.",
        "Puedes pedir que actualicemos o eliminemos tu información por correo o teléfono.",
        "Esta página es una plantilla inicial y debe revisarla el operador antes de usarla en público.",
      ],
      terms: [
        "Las reservas de este sitio son solicitudes de viaje con TapTaxiBcn. Quedan confirmadas al recibir una referencia y cuando el conductor acepta el trayecto.",
        "Los precios son estimaciones según los datos indicados. La tarifa final puede cambiar si varían la ruta, la espera, las paradas o el número de pasajeros.",
        "Estate listo a la hora acordada. La espera y las cancelaciones de última hora pueden tener cargo. En aeropuerto, incluye el número de vuelo si puedes.",
        "Los vehículos tienen un número limitado de plazas y maletas. Si necesitas más espacio, contáctanos antes.",
        "Estas condiciones son una plantilla inicial y deben revisarse antes de usarse en público.",
      ],
    },
    notFound: { title: "Página no encontrada", text: "La página que buscas no existe.", back: "Volver al inicio" },
    bookPage: { title: "¿Necesitas un taxi?", text: "Dinos adónde vas y organizamos el viaje por ti." },
  },
  ca: {
    skip: "Salta al contingut",
    langLabel: "Idioma",
    nav: { home: "Inici", book: "Reservar", services: "Serveis", areas: "Zones", about: "Sobre nosaltres", contact: "Contacte", bookNow: "Reservar ara", openMenu: "Obre el menú", closeMenu: "Tanca el menú" },
    hero: {
      eyebrow: "Barcelona · Taxi",
      title: "Viatges de confiança. Quan els necessitis.",
      text: "Reserva un taxi còmode i puntual en uns segons. Trajectes locals, trasllats a l’aeroport i reserves anticipades a Barcelona i Catalunya.",
      book: "Reservar un taxi",
      call: "Trucar",
      whatsapp: "WhatsApp",
      imageAlt: "Barcelona al capvespre",
    },
    booking: {
      eyebrow: "Reserva ràpida",
      title: "On vas?",
      subtitle: "Sense compte. Pressupost en uns segons.",
      rideNow: "Ara",
      scheduleLater: "Programar",
      pickup: "Punt de recollida",
      destination: "Destinació",
      pickupPlaceholder: "Adreça, hotel o punt de trobada",
      destinationPlaceholder: "On t’hem de portar?",
      date: "Data",
      time: "Hora de recollida",
      returnJourney: "Viatge de tornada",
      returnDate: "Data de tornada",
      returnTime: "Hora de tornada",
      getQuote: "Consultar preu",
      useAddress: "Fer servir aquesta adreça",
      cantFindTitle: "No trobes el punt de recollida?",
      cantFindText: "Cap problema. Truca’ns i t’organitzem la reserva.",
      cantFindCta: "Trucar per reservar",
      chooseRide: "Tria el vehicle",
      passengers: "Passatgers",
      luggage: "Equipatge",
      passengerOne: "passatger",
      passengerMany: "passatgers",
      plusFourPassengers: "+4 passatgers",
      requestPrice: "Consultar preu",
      suitcaseOne: "maleta",
      suitcaseMany: "maletes",
      fullName: "Nom complet",
      phone: "Telèfon mòbil",
      email: "Correu electrònic (opcional)",
      notes: "Notes",
      notesOptional: "(opcional)",
      notesPlaceholder: "Número de vol, edifici o indicacions",
      continue: "Continuar",
      back: "Enrere",
      cancel: "Cancel·lar",
      confirm: "Confirmar reserva",
      confirming: "Confirmant…",
      bookNow: "Reservar ara",
      bookingInProgress: "Reservant...",
      receivedTitle: "Sol·licitud de reserva rebuda",
      receivedNote: "Hem enviat la sol·licitud al conductor. Rebràs la confirmació quan l’accepti.",
      receivedContact: "Per a consultes, truca al {phone}.",
      confirmedLiveTitle: "Reserva confirmada",
      confirmedLiveNote: "El conductor ha confirmat aquest trajecte.",
      declinedTitle: "No s’ha pogut confirmar la reserva",
      declinedNote: "El conductor no pot confirmar aquest trajecte. Pots trucar-li si encara necessites un taxi.",
      submitError: "No s’ha pogut desar la reserva. Torna-ho a provar.",
      close: "Tancar",
      done: "Fet",
      steps: { journey: "Viatge", ride: "Cotxe", details: "Dades", confirm: "Confirmar" },
      summaryIntro: "Revisa els detalls del viatge abans de confirmar.",
      labels: { pickup: "Recollida", destination: "Destinació", date: "Data", time: "Hora", return: "Tornada", passengers: "Passatgers", luggage: "Equipatge", vehicle: "Vehicle", name: "Nom", phone: "Telèfon", fare: "Preu" },
      confirmedTitle: "Sol·licitud de reserva rebuda",
      reference: "Referència de reserva:",
      confirmedNote: "Rebràs la confirmació quan el conductor accepti. Per a canvis, truca al {phone}.",
      fareNote: "El conductor confirmarà el preu. Nit i aeroport poden variar.",
      estFare: "Preu est.",
      findingDriver: "Buscant el teu conductor…",
      calculating: "Calculant",
      distance: "Distància",
      driveTime: "Temps",
      calculatingRoute: "Calculant la ruta…",
      routeUnavailable: "Ruta no disponible — adreces indicades a dalt",
    },
    bookCta: {
      title: "Necessites un taxi?",
      text: "Digues-nos on vas i t’organitzem el viatge.",
      whatsapp: "Reservar per WhatsApp",
      call: "Trucar ara",
      whatsappMessage: "Hola, voldria reservar un taxi a Barcelona.",
    },
    faq: {
      eyebrow: "FAQ taxi Barcelona",
      title: "Preguntes freqüents",
      items: [
        {
          q: "Quant costa un taxi de l’aeroport de Barcelona al centre? Hi ha tarifa fixa?",
          a: "No hi ha una tarifa fixa oficial única entre l’aeroport Barcelona-El Prat i el centre de Barcelona. El preu depèn de la tarifa regulada vigent, del recorregut i dels suplements aplicables. Si ens contactes per a un trajecte, et podem confirmar el preu o la tarifa prevista abans del viatge.",
        },
        {
          q: "Puc pagar amb targeta o contactless?",
          a: "Sí, s’accepta el pagament amb targeta. El pagament contactless també pot estar disponible segons el vehicle i el terminal. Si necessites un mètode de pagament concret, contacta’ns abans del viatge i t’ho confirmarem.",
        },
        {
          q: "Hauria de reservar el taxi amb antelació?",
          a: "És recomanable reservar amb antelació per a trasllats a l’aeroport, sortides molt d’hora, grups grans i trajectes que requereixin un vehicle concret. Escriu-nos per WhatsApp o truca’ns i organitzem el viatge amb tu.",
        },
        {
          q: "Puc demanar una cadireta infantil o viatjar amb equipatge?",
          a: "Sí. Quan ens contactis, indica’ns el nombre de passatgers, l’equipatge i si necessites cadireta infantil. Així podrem assignar el vehicle més adequat per al teu trajecte.",
        },
        {
          q: "Puc canviar o cancel·lar la reserva?",
          a: "Sí. Si canvien els teus plans, contacta’ns tan aviat com puguis per telèfon o WhatsApp.",
        },
        {
          q: "Què he de fer si em deixo alguna cosa al taxi?",
          a: "Contacta’ns tan aviat com puguis amb les dades del viatge: punt de recollida, destinació, data i hora aproximada. Amb aquesta informació intentarem identificar el trajecte i ajudar-te a recuperar l’objecte.",
        },
      ],
    },
    errors: {
      pickup: "Indica un punt de recollida.",
      destination: "Indica una destinació.",
      samePlace: "La destinació ha de ser diferent de la recollida.",
      date: "Tria una data.",
      datePast: "La data no pot ser anterior a avui.",
      time: "Tria una hora de recollida.",
      timeSoon: "Tria una hora amb almenys 20 minuts de marge.",
      returnDate: "Tria una data de tornada.",
      returnDateBefore: "La tornada no pot ser anterior a l’anada.",
      returnTime: "Tria una hora de tornada.",
      passengers: "Aquest vehicle admet fins a {n} passatgers.",
      luggage: "Indica l’equipatge.",
      name: "Escriu el teu nom complet.",
      phone: "Introdueix un telèfon vàlid.",
      email: "Introdueix un correu vàlid.",
      geoDenied: "Permís d’ubicació denegat — escriu l’adreça.",
      geoError: "No s’ha pogut obtenir la ubicació — escriu l’adreça.",
      geoLocate: "Fer servir la meva ubicació",
      searching: "Cercant…",
      noPlaces: "Cap coincidència. Prova un carrer, hotel, estació o lloc.",
      placesFailed: "No s'han pogut carregar els suggeriments. Pots escriure l’adreça.",
      retry: "Torna-ho a provar",
    },
    vehicles: {
      sedan: "Sedan",
      sedanDetail: "4 passatgers · 2 maletes grans o 3 petites",
      sedanDesc: "L’opció de cada dia per a trajectes urbans amb menys equipatge.",
      prius: "Prius Plus i Dacia",
      priusDetail: "4 passatgers · 4 maletes grans o 6–7 petites",
      priusDesc: "El taxi principal per a aeroport i el dia a dia. Còmode, pràctic i amb espai per a maletes.",
      van: "Caddy i Mercedes Classe V",
      vanDetail: "Més de 4 passatgers · extra d’equipatge",
      vanDesc: "Més espai per a grups, maletes extra i trajectes més amplis.",
      featured: "El més usat",
    },
    why: {
      eyebrow: "Per què triar-nos",
      title: "Tranquil·litat, de la recollida a la destinació.",
      items: [
        { title: "Puntualitat", text: "Arriba a l’hora i viatja sense estrès innecessari." },
        { title: "Viatges còmodes", text: "Un vehicle net i cuidat per a trajectes locals i més llargs." },
        { title: "Trasllats a l’aeroport", text: "Recollides reservades amb horaris fiables." },
        { title: "Coneixement local", text: "Un conductor amb experiència a Barcelona i rodalies." },
      ],
    },
    services: {
      eyebrow: "Serveis",
      title: "El viatge que s’adapta a cada ocasió.",
      items: [
        { title: "Trajectes locals", alt: "Carrer urbà en una ciutat mediterrània" },
        { title: "Trasllats a l’aeroport", alt: "Avió per sobre dels núvols" },
        { title: "Viatges de llarga distància", alt: "Carretera costanera en un paisatge obert" },
        { title: "Viatges de negocis", alt: "Edificis moderns de ciutat" },
        { title: "Trasllats a estacions", alt: "Tren arribant a una estació" },
        { title: "Reserves anticipades", alt: "Taxi professional a punt per a una recollida" },
      ],
    },
    airport: {
      eyebrow: "Trasllats a l’aeroport",
      title: "A temps per a cada vol.",
      text: "Recollides reservades per a arribades i sortides. T’esperem a la terminal i viatges amb calma, sense cues d’última hora.",
      points: [
        { title: "Arribades", text: "T’esperem a la terminal en aterrar." },
        { title: "Sortides", text: "Surt amb temps de sobres per facturar." },
        { title: "Dades del vol", text: "Afegeix el número de vol en reservar." },
      ],
      cta: "Reservar trasllat",
      imageAlt: "Terminal d’aeroport al capvespre",
    },
    vehicle: {
      eyebrow: "Els vehicles",
      title: "El Prius Plus és el taxi que pots esperar.",
      text: "Un taxi de Barcelona per al dia a dia, l’aeroport i trajectes més llargs. Tria un sedan per a menys equipatge, o un taxi més gran quan necessitis espai.",
      imageAlt: "Taxi Toyota Prius Plus a Barcelona, negre amb portes grogues",
      streetAlt: "Prius Plus taxi de Barcelona aparcat al carrer",
      features: [
        "Espai còmode per a 4 passatgers",
        "Maletes per a aeroport i el dia a dia",
        "El cotxe principal per a la majoria de trajectes",
        "Net, pràctic i a punt",
      ],
      sedanAlt: "Taxi sedan circulant per Barcelona",
      vanAlt: "Taxi furgoneta Mercedes amb els colors de Barcelona",
    },
    how: {
      eyebrow: "Com funciona",
      title: "Tres passos. I en camí.",
      steps: [
        { title: "Digues-nos on vas", text: "Escriu-nos per WhatsApp o truca’ns amb el punt de recollida i la destinació." },
        { title: "T’organitzem el viatge", text: "Confirmem amb tu l’hora, el vehicle i el preu previst." },
        { title: "Gaudeix del viatge", text: "El conductor arriba al punt acordat." },
      ],
    },
    areas: {
      eyebrow: "Zones",
      title: "Servei de taxi de confiança a Barcelona i rodalies.",
      text: "Trajectes locals, trasllats a l’aeroport i reserves anticipades a Barcelona i Catalunya. Si t’allotges a prop o viatges una mica més lluny, indica’ns la destinació.",
      extra: "Els trajectes més llargs es poden concertar.",
      contact: "No saps si cubrim la teva zona? Contacta’ns.",
    },
    reviews: {
      eyebrow: "Opinions",
      title: "El que diuen els passatgers.",
      items: [
        {
          name: "Lucía Navarro",
          rating: 5,
          quote:
            "Vaig reservar un trasllat a l’aeroport molt d’hora i tot va ser puntual. El conductor va arribar uns minuts abans, va ajudar amb les maletes i el trajecte va ser tranquil. El tornaria a reservar sense dubtar-ho.",
        },
        {
          name: "Javier Morales",
          rating: 5,
          quote:
            "Viatjàvem quatre persones amb força equipatge i ens van assignar un vehicle amb espai de sobra. Tot estava net i còmode, i el conductor coneixia perfectament la millor ruta.",
        },
        {
          name: "Marta Ruiz",
          rating: 5,
          quote:
            "Necessitava un taxi a última hora i vaig escriure per WhatsApp. Em van respondre de seguida, van confirmar el preu i van organitzar la recollida sense complicacions. Molt fàcil de gestionar.",
        },
      ],
    },
    about: {
      eyebrow: "Sobre nosaltres",
      title: "Un conductor professional, no un centre de trucades.",
      p1: "TapTaxiBcn és un servei professional per a trajectes diaris, aeroport i viatges més llargs. Reserves en directe, viatges en un cotxe net i còmode, i parles amb el mateix conductor de confiança.",
      p2: "Amb base a Barcelona, per a viatges locals i de més distància per la ciutat i rodalies.",
      imageAlt: "Taxi de Barcelona negre amb portes grogues",
    },
    contact: {
      eyebrow: "Quan ho necessitis",
      title: "Necessites un taxi? Reserva en menys d’un minut.",
      text: "Truca, escriu o reserva en línia. Sense crear un compte.",
      book: "Reservar taxi",
      call: "Trucar",
      whatsapp: "WhatsApp",
      whatsappMessage: "Hola, voldria reservar un taxi a Barcelona.",
    },
    footer: {
      blurb: "Servei de taxi de confiança a Barcelona i rodalies.",
      contact: "Contacte",
      explore: "Explorar",
      bookTaxi: "Reservar un taxi",
      coverage: "Zona de servei",
      coverageText: "Barcelona i rodalies de Catalunya.",
      coverageNote: "Viatges més llargs sota petició.",
      rights: "Tots els drets reservats.",
      privacy: "Política de privadesa",
      terms: "Termes",
      bookingNote: "El conductor confirma les reserves.",
      hours: "Disponible 24 hores, 7 dies a la setmana",
    },
    sticky: { call: "Trucar", book: "Reservar", whatsapp: "WhatsApp" },
    bookingStatus: {
      awaiting_confirmation: "Pendent de confirmació del conductor",
      confirmed: "Reserva confirmada",
      in_progress: "En curs",
      completed: "Completada",
      declined: "Rebutjada",
      cancelled: "Cancel·lada",
    },
    langSuggest: {
      title: "Vols veure el web en {lang}?",
      text: "Podem mostrar el lloc en l’idioma del teu dispositiu. La teva tria es desa aquí.",
      accept: "Fer servir {lang}",
      dismiss: "Mantenir l’idioma actual",
    },
    toasts: {
      routeReady: "Origen i destinació a punt",
      quoteReady: "Pressupost a punt",
      confirmed: "Reserva confirmada",
      received: "Sol·licitud enviada al conductor",
    },
    stats: {
      items: [
        { value: 24, suffix: "/7", label: "Disponible" },
        { value: 4, suffix: "", label: "Idiomes" },
        { value: 3, suffix: "", label: "Opcions de viatge" },
      ],
    },
    legal: {
      privacyTitle: "Política de privadesa",
      termsTitle: "Condicions de reserva",
      updated: "Darrera actualització",
      back: "Tornar a l’inici",
      privacy: [
        "TapTaxiBcn només recull la informació necessària per a la reserva: nom, telèfon, correu, punts de recollida i destinació, i les notes que vulguis afegir.",
        "Les dades s’utilitzen per confirmar el viatge, contactar-te i guardar la reserva. No venem la teva informació i no cal crear un compte.",
        "Si el lloc està connectat a un correu o missatgeria, les teves dades s’envien només per fer el viatge sol·licitat.",
        "Pots demanar que actualitzem o eliminem la teva informació per correu o telèfon.",
        "Aquesta pàgina és una plantilla inicial i l’ha de revisar l’operador abans d’usar-la en públic.",
      ],
      terms: [
        "Les reserves d’aquest lloc són sol·licituds de viatge amb TapTaxiBcn. Queden confirmades en rebre una referència i quan el conductor accepta el trajecte.",
        "Els preus són estimacions segons les dades indicades. La tarifa final pot canviar si varien la ruta, l’espera, les parades o el nombre de passatgers.",
        "Sigues a punt a l’hora acordada. L’espera i les cancel·lacions d’última hora poden tenir càrrec. A l’aeroport, afegeix el número de vol si pots.",
        "Els vehicles tenen un nombre limitat de places i maletes. Si necessites més espai, contacta’ns abans.",
        "Aquestes condicions són una plantilla inicial i s’han de revisar abans d’usar-les en públic.",
      ],
    },
    notFound: { title: "Pàgina no trobada", text: "La pàgina que busques no existeix.", back: "Tornar a l’inici" },
    bookPage: { title: "Necessites un taxi?", text: "Digues-nos on vas i t’organitzem el viatge." },
  },
  fr: {
    skip: "Aller au contenu",
    langLabel: "Langue",
    nav: { home: "Accueil", book: "Réserver", services: "Services", areas: "Zones", about: "À propos", contact: "Contact", bookNow: "Réserver", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
    hero: {
      eyebrow: "Barcelone · Taxi",
      title: "Des trajets fiables. Quand vous en avez besoin.",
      text: "Réservez un taxi confortable et ponctuel en quelques instants. Trajets locaux, transferts aéroport et courses anticipées à Barcelone et en Catalogne.",
      book: "Réserver un taxi",
      call: "Appeler",
      whatsapp: "WhatsApp",
      imageAlt: "Barcelone au crépuscule",
    },
    booking: {
      eyebrow: "Réservation rapide",
      title: "Où allez-vous ?",
      subtitle: "Sans compte. Un devis en quelques secondes.",
      rideNow: "Maintenant",
      scheduleLater: "Planifier",
      pickup: "Lieu de prise en charge",
      destination: "Destination",
      pickupPlaceholder: "Adresse, hôtel ou point de rendez-vous",
      destinationPlaceholder: "Où devons-nous vous emmener ?",
      date: "Date",
      time: "Heure de prise en charge",
      returnJourney: "Trajet retour",
      returnDate: "Date de retour",
      returnTime: "Heure de retour",
      getQuote: "Demander le prix",
      useAddress: "Utiliser cette adresse",
      cantFindTitle: "Vous ne trouvez pas le lieu de prise en charge ?",
      cantFindText: "Pas de souci. Appelez-nous et nous organiserons la réservation.",
      cantFindCta: "Appeler pour réserver",
      chooseRide: "Choisissez votre véhicule",
      passengers: "Passagers",
      luggage: "Bagages",
      passengerOne: "passager",
      passengerMany: "passagers",
      plusFourPassengers: "+4 passagers",
      requestPrice: "Demander le prix",
      suitcaseOne: "valise",
      suitcaseMany: "valises",
      fullName: "Nom complet",
      phone: "Téléphone mobile",
      email: "E-mail (facultatif)",
      notes: "Notes",
      notesOptional: "(facultatif)",
      notesPlaceholder: "Numéro de vol, bâtiment ou consignes",
      continue: "Continuer",
      back: "Retour",
      cancel: "Annuler",
      confirm: "Confirmer la réservation",
      confirming: "Confirmation…",
      bookNow: "Réserver maintenant",
      bookingInProgress: "Réservation...",
      receivedTitle: "Demande de réservation reçue",
      receivedNote: "Votre demande a été envoyée au chauffeur. Vous recevrez une confirmation lorsqu’il l’acceptera.",
      receivedContact: "Pour toute question, appelez le {phone}.",
      confirmedLiveTitle: "Réservation confirmée",
      confirmedLiveNote: "Le chauffeur a confirmé ce trajet.",
      declinedTitle: "La réservation n’a pas pu être confirmée",
      declinedNote: "Le chauffeur ne peut pas confirmer ce trajet. Vous pouvez l’appeler si vous avez encore besoin d’un taxi.",
      submitError: "La réservation n’a pas pu être enregistrée. Veuillez réessayer.",
      close: "Fermer",
      done: "Terminé",
      steps: { journey: "Trajet", ride: "Véhicule", details: "Coordonnées", confirm: "Confirmer" },
      summaryIntro: "Vérifiez les détails du trajet avant de confirmer.",
      labels: { pickup: "Prise en charge", destination: "Destination", date: "Date", time: "Heure", return: "Retour", passengers: "Passagers", luggage: "Bagages", vehicle: "Véhicule", name: "Nom", phone: "Téléphone", fare: "Prix" },
      confirmedTitle: "Demande de réservation reçue",
      reference: "Référence de réservation :",
      confirmedNote: "Vous recevrez la confirmation lorsque le chauffeur acceptera. Pour toute modification, appelez le {phone}.",
      fareNote: "Le chauffeur confirmera le prix. Nuit et aéroport peuvent varier.",
      estFare: "Prix est.",
      findingDriver: "Recherche de votre chauffeur…",
      calculating: "Calcul",
      distance: "Distance",
      driveTime: "Trajet",
      calculatingRoute: "Calcul de l’itinéraire…",
      routeUnavailable: "Itinéraire indisponible — adresses indiquées ci-dessus",
    },
    bookCta: {
      title: "Besoin d’un taxi ?",
      text: "Dites-nous où vous allez et nous organiserons le trajet pour vous.",
      whatsapp: "Réserver sur WhatsApp",
      call: "Appeler maintenant",
      whatsappMessage: "Bonjour, je voudrais réserver un taxi à Barcelone.",
    },
    faq: {
      eyebrow: "FAQ taxi Barcelone",
      title: "Questions fréquentes",
      items: [
        {
          q: "Combien coûte un taxi de l’aéroport de Barcelone au centre-ville ? Y a-t-il un tarif fixe ?",
          a: "Il n’existe pas de tarif fixe officiel unique entre l’aéroport de Barcelone-El Prat et le centre-ville. Le prix dépend du tarif réglementé en vigueur, de l’itinéraire et des suppléments applicables. Si vous nous contactez pour un trajet, nous pouvons confirmer le prix ou le tarif prévu avant votre départ.",
        },
        {
          q: "Puis-je payer par carte ou sans contact ?",
          a: "Oui, le paiement par carte est possible. Le paiement sans contact peut également être disponible selon le véhicule et le terminal. Si vous avez besoin d’un moyen de paiement précis, contactez-nous avant le trajet et nous le confirmerons.",
        },
        {
          q: "Dois-je réserver mon taxi à l’avance ?",
          a: "La réservation à l’avance est conseillée pour les transferts aéroport, les départs très matinaux, les groupes plus importants et les trajets nécessitant un véhicule particulier. Contactez-nous par WhatsApp ou par téléphone et nous organiserons le trajet avec vous.",
        },
        {
          q: "Puis-je demander un siège enfant ou voyager avec des bagages ?",
          a: "Oui. En nous contactant, indiquez le nombre de passagers, le volume de bagages et si vous avez besoin d’un siège enfant. Nous pourrons ainsi prévoir le véhicule le plus adapté.",
        },
        {
          q: "Puis-je modifier ou annuler ma réservation ?",
          a: "Oui. Si vos plans changent, contactez-nous dès que possible par téléphone ou WhatsApp.",
        },
        {
          q: "Que faire si j’oublie quelque chose dans le taxi ?",
          a: "Contactez-nous dès que possible avec les détails du trajet : lieu de prise en charge, destination, date et heure approximative. Ces informations nous aideront à identifier le trajet et à récupérer l’objet.",
        },
      ],
    },
    errors: {
      pickup: "Indiquez un lieu de prise en charge.",
      destination: "Indiquez une destination.",
      samePlace: "La destination doit être différente du départ.",
      date: "Choisissez une date.",
      datePast: "La date ne peut pas être dans le passé.",
      time: "Choisissez une heure.",
      timeSoon: "Choisissez une heure au moins 20 minutes à l’avance.",
      returnDate: "Choisissez une date de retour.",
      returnDateBefore: "Le retour ne peut pas précéder l’aller.",
      returnTime: "Choisissez une heure de retour.",
      passengers: "Ce véhicule accueille jusqu’à {n} passagers.",
      luggage: "Indiquez les bagages.",
      name: "Entrez votre nom complet.",
      phone: "Entrez un numéro de téléphone valide.",
      email: "Entrez une adresse e-mail valide.",
      geoDenied: "Autorisation de localisation refusée — saisissez l’adresse.",
      geoError: "Impossible d’obtenir votre position — saisissez l’adresse.",
      geoLocate: "Utiliser ma position actuelle",
      searching: "Recherche…",
      noPlaces: "Aucun lieu trouvé. Essayez une rue, un hôtel, une gare ou un lieu.",
      placesFailed: "Impossible de charger les suggestions. Vous pouvez saisir l’adresse.",
      retry: "Réessayer",
    },
    vehicles: {
      sedan: "Berline",
      sedanDetail: "4 passagers · 2 grandes valises ou 3 petites",
      sedanDesc: "L’option du quotidien pour les trajets en ville avec moins de bagages.",
      prius: "Prius Plus et Dacia",
      priusDetail: "4 passagers · 4 grandes valises ou 6–7 petites",
      priusDesc: "Le taxi principal pour l’aéroport et le quotidien. Confortable, pratique et prêt pour les bagages.",
      van: "Caddy et Mercedes Classe V",
      vanDetail: "Plus de 4 passagers · bagages supplémentaires",
      vanDesc: "Plus d’espace pour les groupes, les bagages et les plus longs trajets.",
      featured: "Le plus utilisé",
    },
    why: {
      eyebrow: "Pourquoi nous choisir",
      title: "La sérénité, de la prise en charge à l’arrivée.",
      items: [
        { title: "Prise en charge fiable", text: "Arrivez à l’heure et voyagez sans stress inutile." },
        { title: "Trajets confortables", text: "Un véhicule propre et soigné pour les courses locales et plus longues." },
        { title: "Transferts aéroport", text: "Courses réservées avec des horaires fiables." },
        { title: "Connaissance locale", text: "Un chauffeur expérimenté à Barcelone et aux alentours." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Le trajet adapté à chaque occasion.",
      items: [
        { title: "Courses locales", alt: "Rue urbaine dans une ville méditerranéenne" },
        { title: "Transferts aéroport", alt: "Avion au-dessus des nuages" },
        { title: "Longue distance", alt: "Route côtière dans un paysage ouvert" },
        { title: "Voyages d’affaires", alt: "Immeubles modernes en ville" },
        { title: "Transferts gare", alt: "Train arrivant en gare" },
        { title: "Courses anticipées", alt: "Taxi professionnel prêt pour une prise en charge" },
      ],
    },
    airport: {
      eyebrow: "Transferts aéroport",
      title: "À l’heure pour chaque vol.",
      text: "Prises en charge réservées pour les arrivées et départs. Rendez-vous au terminal et voyagez sereinement, sans files de dernière minute.",
      points: [
        { title: "Arrivées", text: "Nous vous attendons au terminal à l’atterrissage." },
        { title: "Départs", text: "Partez avec une marge confortable pour l’enregistrement." },
        { title: "Infos vol", text: "Ajoutez votre numéro de vol lors de la réservation." },
      ],
      cta: "Réserver un transfert",
      imageAlt: "Terminal d’aéroport au crépuscule",
    },
    vehicle: {
      eyebrow: "Les véhicules",
      title: "Le Prius Plus est le taxi que vous pouvez attendre.",
      text: "Un taxi de Barcelone pour le quotidien, l’aéroport et les plus longs trajets. Choisissez une berline pour moins de bagages, ou un plus grand taxi quand vous avez besoin d’espace.",
      imageAlt: "Taxi Toyota Prius Plus à Barcelone, noir avec portes jaunes",
      streetAlt: "Prius Plus taxi de Barcelone stationné dans la rue",
      features: [
        "Espace confortable pour 4 passagers",
        "Bagages pour l’aéroport et le quotidien",
        "La voiture principale pour la plupart des trajets",
        "Propre, pratique et prêt",
      ],
      sedanAlt: "Taxi berline en circulation à Barcelone",
      vanAlt: "Taxi van Mercedes aux couleurs de Barcelone",
    },
    how: {
      eyebrow: "Comment ça marche",
      title: "Trois étapes. Et vous êtes en route.",
      steps: [
        { title: "Dites-nous où vous allez", text: "Écrivez-nous sur WhatsApp ou appelez-nous avec le lieu de prise en charge et la destination." },
        { title: "Nous organisons le trajet", text: "Nous confirmons avec vous l’heure, le véhicule et le tarif prévu." },
        { title: "Profitez du trajet", text: "Le chauffeur arrive au point convenu." },
      ],
    },
    areas: {
      eyebrow: "Zones desservies",
      title: "Un taxi fiable à Barcelone et aux alentours.",
      text: "Trajets locaux, transferts aéroport et courses anticipées à Barcelone et en Catalogne. Si vous séjournez à proximité ou allez un peu plus loin, indiquez simplement la destination.",
      extra: "Les plus longs trajets peuvent être convenus.",
      contact: "Vous n’êtes pas sûr que nous desservions votre zone ? Contactez-nous.",
    },
    reviews: {
      eyebrow: "Avis",
      title: "Ce que disent les passagers.",
      items: [
        {
          name: "Lucía Navarro",
          rating: 5,
          quote:
            "J’ai réservé un transfert aéroport très tôt le matin et tout s’est passé à l’heure. Le chauffeur est arrivé quelques minutes en avance, a aidé avec les valises et le trajet a été calme. Je n’hésiterais pas à réserver à nouveau.",
        },
        {
          name: "Javier Morales",
          rating: 5,
          quote:
            "Nous voyagions à quatre avec beaucoup de bagages et on nous a attribué un véhicule largement assez spacieux. Tout était propre et confortable, et le chauffeur connaissait parfaitement le meilleur itinéraire.",
        },
        {
          name: "Marta Ruiz",
          rating: 5,
          quote:
            "J’avais besoin d’un taxi au dernier moment et j’ai écrit sur WhatsApp. Ils ont répondu vite, confirmé le prix et organisé la prise en charge sans complication. Très simple à gérer.",
        },
      ],
    },
    about: {
      eyebrow: "À propos",
      title: "Un chauffeur professionnel, pas un centre d’appels.",
      p1: "TapTaxiBcn est un service professionnel pour les trajets du quotidien, l’aéroport et les plus longues distances. Vous réservez directement, voyagez dans une voiture propre et confortable, et échangez avec le même chauffeur de confiance.",
      p2: "Basé à Barcelone, pour des trajets locaux et plus longs dans la ville et ses alentours.",
      imageAlt: "Taxi de Barcelone noir avec portes jaunes",
    },
    contact: {
      eyebrow: "Dès que vous en avez besoin",
      title: "Besoin d’un taxi ? Réservez en moins d’une minute.",
      text: "Appelez, écrivez ou réservez en ligne. Sans créer de compte.",
      book: "Réserver un taxi",
      call: "Appeler",
      whatsapp: "WhatsApp",
      whatsappMessage: "Bonjour, je voudrais réserver un taxi à Barcelone.",
    },
    footer: {
      blurb: "Service de taxi fiable à Barcelone et aux alentours.",
      contact: "Contact",
      explore: "Explorer",
      bookTaxi: "Réserver un taxi",
      coverage: "Zone de service",
      coverageText: "Barcelone et les alentours de la Catalogne.",
      coverageNote: "Trajets plus longs sur demande.",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions",
      bookingNote: "Les réservations sont confirmées par le chauffeur.",
      hours: "Disponible 24 h/24, 7 j/7",
    },
    sticky: { call: "Appeler", book: "Réserver", whatsapp: "WhatsApp" },
    bookingStatus: {
      awaiting_confirmation: "En attente de confirmation du chauffeur",
      confirmed: "Réservation confirmée",
      in_progress: "En cours",
      completed: "Terminée",
      declined: "Refusée",
      cancelled: "Annulée",
    },
    langSuggest: {
      title: "Afficher le site en {lang} ?",
      text: "Nous pouvons afficher le site dans la langue de votre appareil. Votre choix est enregistré ici.",
      accept: "Utiliser {lang}",
      dismiss: "Garder la langue actuelle",
    },
    toasts: {
      routeReady: "Départ et destination prêts",
      quoteReady: "Estimation prête",
      confirmed: "Réservation confirmée",
      received: "Demande envoyée au chauffeur",
    },
    stats: {
      items: [
        { value: 24, suffix: "/7", label: "Disponible" },
        { value: 4, suffix: "", label: "Langues" },
        { value: 3, suffix: "", label: "Types de course" },
      ],
    },
    legal: {
      privacyTitle: "Politique de confidentialité",
      termsTitle: "Conditions de réservation",
      updated: "Dernière mise à jour",
      back: "Retour à l’accueil",
      privacy: [
        "TapTaxiBcn ne collecte que les informations nécessaires à la réservation : nom, téléphone, e-mail, lieux de départ et d’arrivée, et les notes que vous ajoutez.",
        "Ces données servent à confirmer le trajet, vous contacter et conserver la réservation. Nous ne vendons pas vos informations et aucun compte n’est requis.",
        "Si le site est relié à une messagerie, vos données sont envoyées uniquement pour réaliser le trajet demandé.",
        "Vous pouvez demander la mise à jour ou la suppression de vos informations par e-mail ou téléphone.",
        "Cette page est un modèle de départ et doit être relue par l’exploitant avant une mise en ligne publique.",
      ],
      terms: [
        "Les réservations de ce site sont des demandes de course auprès de TapTaxiBcn. Elles sont confirmées à la réception d’une référence et lorsque le chauffeur accepte le trajet.",
        "Les prix sont des estimations selon les informations fournies. Le tarif final peut changer si l’itinéraire, l’attente, les arrêts ou le nombre de passagers diffèrent.",
        "Soyez prêt à l’heure convenue. L’attente et les annulations de dernière minute peuvent être facturées. Pour l’aéroport, indiquez le numéro de vol si possible.",
        "Les véhicules ont une capacité limitée de passagers et de bagages. Si vous avez besoin de plus d’espace, contactez-nous avant de réserver.",
        "Ces conditions sont un modèle de départ et doivent être relues avant une mise en ligne publique.",
      ],
    },
    notFound: { title: "Page introuvable", text: "La page que vous cherchez n’existe pas.", back: "Retour à l’accueil" },
    bookPage: { title: "Besoin d’un taxi ?", text: "Dites-nous où vous allez et nous organiserons le trajet pour vous." },
  },
};
