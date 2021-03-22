// const LocalStorage = require('node-localstorage').LocalStorage;
// module.exports = {
// auth: function () {

// var localStorage = require('localStorage');
function auth() {
    // localStorage = new LocalStorage('./scratch');
    // localStorage.setItem('Authorization', 'hello');
    const token = localStorage.getItem('Authorization');
    console.log(token);

    // localStorage.setItem('Authorization', 'myFirstValue');
    // console.log(localStorage.getItem('Authorization'));

    if (!token) {
        return false
    } else {
        return true
    }
}

auth();
        // return a;
    // }
// }