export function concatClasses(...classArr){
    let ansArr = [];
    for (let className of classArr) {
        ansArr.push(`${className}`);
    }
    return ansArr.join(' ');
}