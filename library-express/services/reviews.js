let reviews = [
    {userId: 1, bookId: 1, note: 8},
    {userId: 2, bookId: 1, note: 5},
    {userId: 3, bookId: 1, note: 3},
];

exports.getReviews = () => {
    return reviews;
}

exports.addReview = (userId, bookId, note) => {
    note = parseInt(note);
    if (note > 10) {
        throw new Error('The note must be max to 10');
    }
    userId = parseInt(userId);
    bookId = parseInt(bookId);
    const review = reviews.find(o => o.bookId === bookId && o.userId === userId);
    if (review) {
        throw new Error('This user already voted for this book');
    } else {
        reviews.push({userId, bookId, note});
        return true;
    }
}

exports.deleteReviewsForBook = (bookId) => {
    bookId = parseInt(bookId);
    reviews = reviews.filter(o => o.bookId !== bookId);
}

exports.deleteReviewsForUser = (userId) => {
    userId = parseInt(userId);
    reviews = reviews.filter(o => o.userId !== userId);
}