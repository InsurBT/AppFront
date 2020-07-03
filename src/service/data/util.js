export function randomDate(minYear, maxYear) {
    let randomYear = Math.floor(Math.random() * (maxYear - minYear) + minYear);
    let randmomMonth = ("0" + Math.floor(Math.random() * 11 + 1)).slice(-2);
    let randomDay = ("0" + Math.floor(Math.random() * 27 + 1)).slice(-2);

    return [randomYear, randmomMonth, randomDay].join("-");
}
