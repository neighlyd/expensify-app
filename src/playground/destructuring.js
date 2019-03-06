console.log('destructuring');

// const person = {
//     name: 'Dustin',
//     age: 36,
//     location: {
//         city: 'Seattle',
//         temp: 44
//     }
// }

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}`)

// const {city, temp: temperature} = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`)
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {title: bookName, publisher: {name: publisherName = 'Self-Published'}} = book;

// console.log(`${bookName} was published by ${publisherName}`);


const address = []

const [, , state = 'New York'] = address;

console.log(`You are in ${state}`)


const menu = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [item, , medium, ] = menu;

console.log(`A medium ${item} costs ${medium}`);