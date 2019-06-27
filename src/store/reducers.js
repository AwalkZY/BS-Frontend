import {ADD_TOKEN, DEL_TOKEN, RD_MSG, TR_MSG, UT_MSG} from "./actions";
import {combineReducers} from "redux";

const initialState = {
    token: "",
    message: [],
    msgTracer: ""
};

function token(state = "", action) {
    switch (action.type) {
        case ADD_TOKEN:
            return action.token;
        case DEL_TOKEN:
            return "";
        default:
            return state;
    }
}

function message(state = [], action) {
    switch (action.type) {
        case RD_MSG:
            return state.map(element => {
                if (element.msgID === action.msgID) {
                    return Object.assign({}, element, {
                        isRead: true
                    })
                }
                return element
            });
        default:
            return state;
    }
}

function msgTracer(state = "", action) {
    switch (action.type) {
        case TR_MSG:
            return action.msgTracer;
        case UT_MSG:
            return "";
        default:
            return state;
    }
}

export const MainReducer = combineReducers({
    token,
    message,
    msgTracer
});