import axios from 'axios';
import {ApiRoot} from "./Constant";
import qs from "qs";
import {message} from "antd";

export function Get(url, params = {}, header = {}){
    return axios.get(ApiRoot + url, {
        "params" : params,
        "headers" : Object.assign(header, {token: window.$store.getState().token})
    }).catch(() =>
        {throw "通信错误，请联系管理员检查。"}
    ).then(res => res.data).then((res) => {
        if (res['status'] !== 200) {
            throw res["message"];
        }
        return res['data'];
    });
}

export function Post(url, params = {}, header = {}){
    return axios.post(ApiRoot + url, qs.stringify(params), {
        headers: Object.assign(header, {token: window.$store.getState().token})
    }).catch(() =>
        {throw "通信错误，请联系管理员检查。"}
    ).then(res => res.data).then((res) => {
        if (res['status'] !== 200) {
            throw res["message"];
        }
        return res['data'];
    });
}

export function Put(url, params = {}, header = {}){
    return axios.put(ApiRoot + url, qs.stringify(params), {
        headers: Object.assign(header, {token: window.$store.getState().token})
    }).catch(() =>
        {throw "通信错误，请联系管理员检查。"}
    ).then(res => res.data).then((res) => {
        if (res['status'] !== 200) {
            throw res["message"];
        }
        return res['data'];
    });
}

export function Delete(url, params = {}, header = {}){
    return axios.delete(ApiRoot + url, qs.stringify(params), {
        headers: Object.assign(header, {token: window.$store.getState().token})
    }).catch(() =>
        {throw "通信错误，请联系管理员检查。"}
    ).then(res => res.data).then((res) => {
        if (res['status'] !== 200) {
            throw res["message"];
        }
        return res['data'];
    });
}