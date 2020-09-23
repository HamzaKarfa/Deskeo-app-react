import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchRooms } from "./deskeo";

function SDR() {
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!idle) {
      (async _ => {
        try {
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);

          setRooms(
            await fetchRooms(
              {
                start: today.toJSON().slice(0, 10),
                end: tomorrow.toJSON().slice(0, 10)
              },
              _ => setLoading(false)
            )
          );
        } catch (error) {
          setError(error);
          setLoading(false);
          throw error;
        }
      })();
      setIdle(true);
    }
  }, [idle]);

  return (
    <div className="App">
      <h1>Salles Deskeo disponibles</h1>
      {loading && (
        <img
          src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-cdn-2.gif"
          alt="Loading.."
          width="200"
        />
      )}
      {error.stack && (
        <div style={{ color: "red", fontStyle: "italic" }}>
          {JSON.stringify(error.stack)
            .split("\\n")
            .map(s => (
              <div style={{ textAlign: "left" }}> {s} </div>
            ))}
        </div>
      )}
      {Object.keys(rooms).map(roomId => {
        return (
          <div
            key={roomId}
            className="room"
            style={{
              backgroundImage: 'url("' + rooms[roomId].room.image + '")'
            }}
          >
            <div className="content">
              <h1>{rooms[roomId].room.name}</h1>
              {rooms[roomId].availabilities.map((availability, j) => {
                return (
                  <div key={j}>
                    {availability.start} => {availability.end}
                    <br />
                    <br />
                  </div>
                );
              })}
              <div className="availibility_percentage">
                <div
                  style={{
                    width: rooms[roomId].availibility_percentage + "%",
                    backgroundColor:
                      rooms[roomId].availibility_percentage > 20
                        ? "green"
                        : "red"
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      {!loading && !Object.getOwnPropertyNames(rooms).length && (
        <div>Oops ! Aucune disponibilité trouvée :(.</div>
      )}
    </div>
  );
}
export default SDR
