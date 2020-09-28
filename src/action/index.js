
export function updateContentCC1(payload) {
    return { type: "UPDATE_CONTENT_CC1", payload }
};
export function updateContentCC2(payload) {
    return { type: "UPDATE_CONTENT_CC2", payload }
};
export function updateContentCC3(payload) {
    return { type: "UPDATE_CONTENT_CC3", payload }
};
export function setRoom(payload) {
    console.log(payload)
    return { type: "ADD_ROOM", payload }
};
export function setLoading(payload) {
    return { type: "UPDATE_LOADING", payload }
};
export function setIdle(payload) {
    return { type: "UPDATE_IDLE", payload }
};