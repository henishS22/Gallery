const name1 = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const file = document.getElementById('file');
const form = document.getElementById('form');
let file1;

form.addEventListener('submit', (e) => {
    e.preventDefault();
})
const btn = document.getElementById('btn');

const fileUpload = (file) => {
    file1 = file.files[0];
}

btn.addEventListener('click', async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', name1.value);
    bodyFormData.append('email', email.value);
    bodyFormData.append('password', password.value);
    if (file1) {
        if (file1.type == 'image/png' || file1.type == 'image/jpeg') {
            bodyFormData.append('dp', file1);
        } else {
            bodyFormData = '';
            file1 = '';
            file.value = '';
            alert('Invalid File Format, Upload Image!');
        }
    }
    const data = await axios.post(`${window.location.origin}/api/v1/user/register`, bodyFormData)
    if (data.data.msg == 'Success') {
        alert('Registered Successfully');
        location.href = '/login'
    } else if (data.data.msg == 'fail') {
        alert('This Email is alreday Registered, Try to Login');
    }
})
