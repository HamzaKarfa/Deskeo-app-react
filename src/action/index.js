export function setRoom(payload) {
    return { type: "ADD_ROOM", payload }
};
export function setLoading(payload) {
    return { type: "UPDATE_LOADING", payload }
};
export function setIdle(payload) {
    return { type: "UPDATE_IDLE", payload }
};