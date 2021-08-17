const main = (employees, number) => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    return displayBirthdayOfMonth(employees, date, number);
}
const displayBirthdayOfMonth = (employees, date, number) => {
    let result = '';
    for (let i = 0; i <= number; i++) {
        date.setMonth(date.getMonth() + 1);
        result += `${formatDate(date)}\n`;
        sort(employees);
        employees.map(employee => { // каждый раз функция сработает для каждого сотрудника
            if (employee.birthday.getMonth() === date.getMonth()) {
                result += '(' + employee.birthday.getDate() + ') - ' + employee.fullname + ' (' + Plural(getHowYearsOld(employee, date)) + ')\n'
            }
        });
    }
    return result;
}

function Plural(n) {
    if (n % 10 === 1 && n % 100 !== 11) {
        return `${n} год`;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return `${n} года`;
    } else {
        return `${n} года`;
    }
}

const sort = array => {
    for (let i = 0, endI = array.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (array[j].birthday.getDate() > array[j + 1].birthday.getDate()) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
    return array;
}
const formatDate = (date) => {
    const options = {month: 'long', year: 'numeric'};
    let formatDate = new Date(date).toLocaleString('ru-RU', options);
    return formatDate[0].toUpperCase() + formatDate.slice(1, -2);
}
const getHowYearsOld = (employee, date) => {
    let diff = date - employee.birthday; // мы получили разницу в милисикундах
    return Math.floor(diff / 31557600000); // делим на один год в милисикундах
}

export {main}