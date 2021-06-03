function formatTimeHTML(date) {
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()+1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const formatedDate = `${date.getFullYear()}-${month}-${day}`;
    return formatedDate;
}

export default formatTimeHTML;