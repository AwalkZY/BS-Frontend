/**
 * @return {string}
 */
import {Post} from "./Api";
import {ApiRoot} from "./Constant";
import {message} from "antd";

export function ConcatClasses(...classArr){
    let ansArr = [];
    for (let className of classArr) {
        ansArr.push(`${className}`);
    }
    return ansArr.join(' ');
}

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function beforeUpload(file) {
    if (file.size / 1024 / 1024 >= 2) {
        message.error('Image must smaller than 2MB!');
        return false;
    }
    return true;
}
