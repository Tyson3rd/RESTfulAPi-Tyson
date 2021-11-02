const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const {sequelize} = require('./db');
const {User, Membership} = require('./models');

const createUsers = async () => {
    const users = [
        {name : 'Tyson', password: 'ty212'},
        {name : 'James', password : 'ja275'},
        {name : 'Antony', password: 'an649'},
        {name : 'Chad', password: 'ch275'},
        {name : 'Sharon', password: 'sh515'},
        {name : 'Mushfika', password: 'mu298'},
        {name : 'Stanley', password: 'st998'},
    ];

    return users
}


const memberships = [
    {
        name : 'Platinum',
        price : 100.00
    },
    {
        name : 'Gold',
        price : 80.00
    },
    {
        name : 'Silver',
        price : 60.00
    }
];


const seed = async () => {

    await sequelize.sync({ force: true });

    const users = await createUsers(); // create users w/ encrypted passwords

    const userPromises = users.map(user => User.create(user))
    const membershipPromises = memberships.map(membership => Membership.create(membership))
    await Promise.all([...userPromises, ...membershipPromises]);
    console.log("db populated!")
}

seed();