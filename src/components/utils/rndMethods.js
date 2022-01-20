const pickRndEl = (iterable) => 
    iterable[Math.floor(Math.random() * iterable.length)];

const rndStr = (str, size = 4) => 
    [...Array(size).keys()]
        .map(d => pickRndEl(str))
        .join('');

const uniqRndStr = (str, size = 4) => 
    str.split("")
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .join("")
        .slice(-size);

export { rndStr, uniqRndStr }