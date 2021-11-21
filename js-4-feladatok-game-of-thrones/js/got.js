const url = '/json/got.json'
let alivechar = []
let currentname = ''

async function request(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

function sortalive(allchar) {
    for (let i = 0; i < allchar.length; i++) {
        if (!(allchar[i].dead === true)) {
            alivechar.push(allchar[i]);
        }
    }
    alivechar.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        //pop1 to make it 48
    alivechar.pop();
}


function populate() {
    let templateString = ""
    for (let i = 0; i < alivechar.length; i++) {
        templateString += `<div class="character" id="${alivechar[i].name}"><img src="${alivechar[i].portrait}" alt="${alivechar[i].name}"><p>${alivechar[i].name}</p></div>`;
    }
    const elem = document.getElementById('container');
    elem.innerHTML = templateString;
}

function addListener() {
    const allChars = document.getElementsByClassName('character')
    for (let i = 0; i < alivechar.length; i++) {
        document.getElementById(`${alivechar[i].name}`).addEventListener('click', function() {
            currentname = this.id;
            [].forEach.call(allChars, function(el) {
                el.classList.remove('highlighted')
            });
            this.classList.add('highlighted');
            displayBio();
        })
    }

}


function highlighted(name) {
    const allChars = document.getElementsByClassName('character')
    currentname = name;
    [].forEach.call(allChars, function(el) {
        el.classList.remove('highlighted')
    });
    document.getElementById(name).classList.add('highlighted');
}

function displayBio(char) {
    let displayedChar = alivechar.find(c => c.name === currentname)
    if (char) {
        displayedChar = char;
    }
    let templateString = `<img class="picture" src="${displayedChar.picture}" alt="${displayedChar.name} portrait" > <h2>${displayedChar.name}</h2>`
    if (displayedChar.house) {
        templateString += `<img src="/assets/houses/${displayedChar.house}.png" alt="">`
    }
    templateString += `<p>${displayedChar.bio}</p>`

    const el = document.getElementById('bio');
    el.innerHTML = templateString;
}

function search() {
    input = document.getElementById('searchfield');
    filter = input.value.toUpperCase();
    if (filter) {
        if (!(alivechar.find(c => c.name.toUpperCase().match(filter)))) {
            console.log('not found')
            const el = document.getElementById('bio');
            el.innerHTML = '<p>Character not found</p>';
        } else {

            displayBio(alivechar.find(c => c.name.toUpperCase().match(filter)))
            highlighted(alivechar.find(c => c.name.toUpperCase().match(filter)).name);
        }
    }

}

request(url).then(sortalive).then(populate).then(addListener).then(displayBio);