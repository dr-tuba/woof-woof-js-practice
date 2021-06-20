document.addEventListener('DOMContentLoaded', initialize)

const dogBar = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')
const filterButton = document.getElementById('good-dog-filter')

function initialize() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(data => data.forEach(renderDogs))
}

function renderDogs(dog) {
    let dogName = document.createElement('span')
    dogName.innerText = dog.name
    dogName.setAttribute('id', dog.id)
    let dogInfo = document.createElement('div')
    dogInfo.setAttribute('id', dog.id)
    dogInfo.setAttribute('class', 'all-dogs')
    dogInfo.style.display = 'none'
    let dogImage = document.createElement('img')
    dogImage.src = dog.image
    let dogNameInfo = document.createElement('h2')
    dogNameInfo.innerText = dog.name
    let dogButton = document.createElement('button')

    dogBar.append(dogName)
    dogInfoDiv.append(dogInfo)
    dogInfo.appendChild(dogImage)
    dogInfo.appendChild(dogNameInfo)
    dogInfo.appendChild(dogButton)
    function checkIsGood() {
        if (dog.isGoodDog === true) {
            dogButton.innerText = 'Good Dog!'
        } else {
            dogButton.innerText = 'Bad Dog!'
        }
    }
    
    checkIsGood()

    dogButton.addEventListener('click', changeDogStatus)

    function changeDogStatus(dogButtonClick) {
        if (dogButtonClick.target.textContent === 'Good Dog!') {
            dog.isGoodDog = false
        } else {
            dog.isGoodDog = true
        }
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': dog.name,
                'isGoodDog': dog.isGoodDog,
                'image': dog.image
            })
        })
        .then(checkIsGood)
    }
}

dogBar.addEventListener('click', showDogInfo)

function showDogInfo(e) {
    let arrayOfAllDogs = document.querySelectorAll('.all-dogs')
    arrayOfAllDogs.forEach((dog) => {
        if (dog.id === e.target.id) {
            dog.style.display = 'block'
        } else {
            dog.style.display = 'none'
        }
    })
}

filterButton.addEventListener('click', filterDogs)
    
function filterDogs(e) {
    const arrayOfAllDogs = document.querySelectorAll('.all-dogs')
    const dogList = [...arrayOfAllDogs]
    let goodDogs = dogList.filter(dog => dog.lastChild.textContent === 'Good Dog!')
    let badDogs = dogList.filter(dog => dog.lastChild.textContent === 'Bad Dog!')

    if (e.target.textContent === `Filter good dogs: OFF`) {
        e.target.textContent = `Filter good dogs: ON`
        for (dog of goodDogs) {
            dog.style.display = 'block'
        }
        for (dog of badDogs) {
            dog.style.display = 'none'
        }
    } else {
        e.target.textContent = `Filter good dogs: OFF`
        for (dog of goodDogs) {
            dog.style.display = 'none'
        }
        for (dog of badDogs) {
            dog.style.display = 'block'
        }
    }
}  


