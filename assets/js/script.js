// IN THIS LESSON WE WILL REQUEST INFORMATION FROM THE SERVER AND THAN DISPLAY IT ON THE WEB PAGE!



const API_KEY = 'yV4WcbI3_ld6Ot2266lepq2J_sE';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById('checksform'));

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        throw new Error(data.error);
    }
    for (let entry of form.entries()) { // This will log out the answers we type in on the web page inside the console, This is purely to simulate what gets sent to server.
        console.log(entry);
    }
}


async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // This function requests information from the server. 

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data); // Instead of console.log(data.expiry)
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) { // This function will introduce a modal that displays message. containing information received from the server
    let heading = 'API Key Status';
    let results = `<div>Your key is valid until</div>`;
    results += `<div class='key-status'>${data.expiry}</div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;
    resultsModal.show();
}
