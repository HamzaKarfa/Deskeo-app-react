const DESKEO_PROXY_API_URL = "https://deskeo.idmkr.io";

const Auth = {
  cookie: null,
  authenticate: async function () {
    const jsonResponse = await fetchJson("/authenticate", {
      email: 'zzgael@gmail.com',
      password: '961479f9'
    });

    if (!jsonResponse.cookie) {
      throw new TypeError("Could not find cookie in authenticate response");
    }

    this.cookie = jsonResponse.cookie;
  }
};

export async function fetchRooms(config, callback) {
  const jsonResponse = await authenticatedFetchJson("/rooms", config);
  const { reservations, rooms } = jsonResponse;
  callback();
  const reservationsByRoomId = getReservationsHoursByRoomId(
    reservations,
    rooms
  );
  const roomsById = getRoomsById(rooms, reservations);
  setRoomsAvailability(roomsById, reservationsByRoomId);
  setRoomsAvailabilityPercentage(roomsById);
  return roomsById;
}

function getRoomsById(rooms, reservations) {
  let roomsById = {};
  rooms.forEach((room) => {
    roomsById[room.id] = {
      room,
      reservations,
      availabilities: []
    };
  });
  return roomsById;
}

function getFormattedTime(dateString) {
  const pad = (s) => String("0" + s).slice(-2);
  const date = new Date(dateString);
  return pad(date.getHours()) + ":" + pad(date.getMinutes());
}

function getReservationsHoursByRoomId(reservations, rooms) {
  const reservationsByRoomId = {};
  rooms.forEach((room) => {
    reservationsByRoomId[room.id] = [];
  });
  reservations.forEach((reservation) => {
    reservationsByRoomId[reservation.roomId].push({
      start: getFormattedTime(reservation.start),
      end: getFormattedTime(reservation.end)
    });
  });
  orderReservationsByHour(reservationsByRoomId);
  return reservationsByRoomId;
}

function setRoomsAvailability(roomsById, reservationsByRoomId) {
  Object.keys(reservationsByRoomId).forEach((roomId) => {
    const reservations = reservationsByRoomId[roomId];
    const reservationRanges = [
      {
        start: roomsById[roomId].room.openingHour,
        end: roomsById[roomId].room.openingHour
      },
      ...reservations,
      {
        start: roomsById[roomId].room.closingHour,
        end: roomsById[roomId].room.closingHour
      }
    ];
    reservationRanges.forEach((reservation, i) => {
      const nextReservation = reservationRanges[i + 1];
      if (typeof nextReservation === "undefined") {
        return;
      }
      if (reservation.end !== nextReservation.start) {
        roomsById[roomId].availabilities.push({
          start: reservation.end,
          end: nextReservation.start
        });
      }
    });
  });
}

function setRoomsAvailabilityPercentage(roomsById) {
  Object.keys(roomsById).forEach((roomId) => {
    const totalHours =
      Number(roomsById[roomId].room.closingHour.substr(0, 2)) -
      Number(roomsById[roomId].room.openingHour.substr(0, 2));

    let totalAvailibility = 0;
    roomsById[roomId].availabilities.forEach((availability) => {
      totalAvailibility +=
        Number(availability.end.substr(0, 2)) -
        Number(availability.start.substr(0, 2));
    });

    roomsById[roomId].availibility_percentage = (
      totalAvailibility /
      (totalHours / 100)
    ).toFixed(2);
  });
}

function orderReservationsByHour(reservations) {
  Object.keys(reservations).forEach((roomid) => {
    reservations[roomid].sort((a, b) => a.start.localeCompare(b.start));
  });
}

async function authenticatedFetchJson(url, body) {
  if (!Auth.cookie) {
    await Auth.authenticate();
  }

  const jsonResponse = await fetchJson(url, {
    ...body,
    cookie: Auth.cookie
  });

  return jsonResponse;
}

async function fetchJson(url, body, config) {
  const response = await fetch(DESKEO_PROXY_API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body),
    ...config
  });
  const jsonResponse = await response.json();
  if (jsonResponse.error) {
    throw new TypeError(jsonResponse.error);
  }

  return jsonResponse;
}
