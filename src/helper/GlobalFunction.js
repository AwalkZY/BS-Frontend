/**
 * @return {string}
 */
export function ConcatClasses(...classArr){
    let ansArr = [];
    for (let className of classArr) {
        ansArr.push(`${className}`);
    }
    return ansArr.join(' ');
}