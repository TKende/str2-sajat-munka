const url = 'http://localhost:3000/users';
let alldata;

async function request(url) {
    try {
        const response = await fetch(url);
        alldata = await response.json();
        return alldata;
    } catch (error) {
        console.error(error);
    }
}

function populate() {
    let templateString = "<tr><th>Id</th><th>Name</th><th>Email</th><th>Address</th><th>Modify</th></tr>"
    for (let i = 0; i < alldata.length; i++) {
        templateString += `<tr>`;
        templateString += `<td>${alldata[i].id}</td>`;
        templateString += `<td>${alldata[i].name}<input type="text" name="name"></td>`;
        templateString += `<td>${alldata[i].email}<input type="text" name="email"></td>`;
        templateString += `<td>${alldata[i].address}<input type="text" name="address"></td>`;
        templateString += `<td><button type='button' id=${alldata[i].id} class='delbutton' onclick='delrow(this)'>X</button><td><button type='button' id=${alldata[i].id} class='modbutton' onclick='modrow(this)'>M</button>`;
        templateString += `</tr>`;
    }

    const elem = document.getElementById('tablebody');
    elem.innerHTML = templateString;


}

async function modrow(e) {
    e.parentElement.parentElement.classList.toggle('visible')
}

async function delrow(e) {
    const result = await fetch('http://localhost:3000/users/' + e.id, {
        method: 'DELETE'
    })
}


const userform = document.getElementById('addnew');

const createUser = async(event) => {
    event.preventDefault();
    const user = {
        name: userform.name.value,
        email: userform.email.value,
        address: userform.address.value
    }

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    })
}

userform.addEventListener('submit', createUser)

request(url).then(populate);