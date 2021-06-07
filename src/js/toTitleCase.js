function toTitleCase(str) {
    let words = str.split(' ');
    let capWords = words.map(word => word.slice(0, 1).toUpperCase() + word.slice(1));
    return capWords.join(' ');
}

export default toTitleCase;