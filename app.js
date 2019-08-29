document.addEventListener('DOMContentLoaded', function () {
    console.log('Content loaded')
    fetch('http://localhost:3000/candidates')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCandidates(data);
        })
        .catch(error => console.log(error))


})



//fetch from http://localhost:3000/candidates
//console.log() the data that comes back

//list candidates, including their 
//name in h2 tag
//image in img, 
//bio in p tag, 




const candidateContainer = document.querySelector('.candidate-container')

const displayCandidates = (candidates) => {
    candidates.map(candidate => {
        createCandidate(candidate)
    })
}

const createCandidate = (candidate) => {
    const name = document.createElement('h2')
    const image = document.createElement('img')
    const bio = document.createElement('p')
    const form = document.querySelector('form')

    name.innerText = candidate.name
    image.src = candidate.image
    bio.innerText = candidate.bio

    form.addEventListener('submit', event => {
        event.preventDefault()
        console.log("event target", event.target)
        postCandidate(event.target)
    })

    candidateContainer.append(name, image, bio)
}

const postCandidate = candidate => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name: candidate.name.value,
            image: candidate.image.value,
            bio: candidate.bio.value,
            votes: 0
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log('options', options)

    return fetch('http://localhost:3000/candidates', options)
        .then(res => res.json())
        .then(res => console.log("response", res))
        .catch(error => console.error(error));
}
