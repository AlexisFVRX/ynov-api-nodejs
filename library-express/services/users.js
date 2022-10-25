const reviewsService = require('./reviews');
const db = require('../models');

const users = [
    {id: 1, firstName: "Jean", lastName: "Dupont"},
    {id: 2, firstName: "Michel", lastName: "Blanc"},
    {id: 3, firstName: "Pierre", lastName: "Marie"},
];

exports.getUsers = async () => {
    return await db.users.findAll();
}

/**
 *
 * @param id String : l'id de l'utilisateur à chercher
 * @description Search a user by an id, which is find by integer equality
 * @returns {{firstName: string, lastName: string, id: number} | {firstName: string, lastName: string, id: number} | {firstName: string, lastName: string, id: number}}
 */
exports.getUserById = (id) => {
    id = parseInt(id);
    return users.find(o => o.id === id);
}

exports.addUser = (id, firstName, lastName) => {
    if (id != null && firstName != null && lastName != null) {
        const userById = module.exports.getUserById(id);
        if (!userById) {
            users.push({id, firstName, lastName});
            //return true;
        } else {
            throw new Error('A user with this id already exists');
        }
    } else {
        throw new Error('All parameters are required');
    }
}

exports.deleteUserById = function deleteUserBy(id) {
    id = parseInt(id);
    const userIndex = users.findIndex(o => o.id === id);
    if (userIndex > -1) {
        reviewsService.deleteReviewsForUser(id);
        users.splice(userIndex, 1);
        return true;
    } else {
        throw new Error('Book not found');
    }
}