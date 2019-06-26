export const ADD_TOKEN = 'ADD_TOKEN';
export const DEL_TOKEN = 'DEL_TOKEN';
export const RD_MSG = 'RD_MSG';
export const TR_MSG = 'TR_MSG';
export const UT_MSG = 'UT_MSG';

export function addToken(token) {
    return { type: ADD_TOKEN, token }
}

export function delToken() {
    return { type: DEL_TOKEN }
}

export function readMsg(msgID) {
    return { type: RD_MSG, msgID }
}

export function traceMsg(userID) {
    return { type: TR_MSG, userID }
}

export function untraceMsg(userID) {
    return { type: UT_MSG, userID }
}