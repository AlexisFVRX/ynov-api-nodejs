const books = [
    {"id": 1, "title": "Le seigneur des anneaux", "date": "10/10/2022"},
    {id: 2, title: "Harry Potter", date: "11/10/2022"},
    {id: 3, title: "Le petit chaperon rouge", date: "15/10/2022"}
];

exports.getBooks = () => {
    return books;
}

exports.getBookById = (id) => {
    id = parseInt(id);
    return books.find(o => o.id === id);
}

exports.addBook = (id, title, date) => {
    if (id != null && title != null && date != null) {
        books.push({id, title, date});
        return true;
    } else {
        throw new Error('All parameters are required');
    }
}

exports.deleteBookById = (id) => {
    id = parseInt(id);
    const bookIndex = books.findIndex(o => o.id === id);
    if (bookIndex > -1) {
        books.splice(bookIndex, 1);
        return true;
    } else {
        throw new Error('Book not found');
    }
}