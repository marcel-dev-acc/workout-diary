/* code here */

function setDefaults() {
    // Set default date

    // Set default time

    // Load local data
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    for (var itemNumber in currentExerciseData) {
        let payload = currentExerciseData[itemNumber];
        console.log(payload);
        setItems(payload);
    }
}

function addItem() {
    // Get form data
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let exercise = document.getElementById('exercise').value;
    let repetitions = document.getElementById('repetitions').value;
    // Validate form data

    // Make payload
    let payload = {
        'date': date,
        'time': time,
        'exercise': exercise,
        'repetitions': repetitions,
    };
    // Store data locally
    storeDataLocally(payload);
    // Add record
    setItems(payload);
}

function setItems(payload) {
    let pastExercisesEl = document.getElementById('past-exercises');
    pastExercisesEl.innerHTML += `<div class="exercise-set">
    <p>Date-time: ` + payload.date.toString() + ' ' + payload.time.toString() + `</p>
    <p>Exercise: ` + payload.exercise.toString() + `</p>
    <p>Exercise: ` + payload.repetitions.toString() + `</p>
    </div>`
}

function storeDataLocally(payload) {
    let currentExerciseData = localStorage.getItem('exercise-data');
    if (currentExerciseData == null) {
        localStorage.setItem(
            'exercise-data',
            JSON.stringify([payload])
        );
    } else {
        currentExerciseData = JSON.parse(currentExerciseData);
        currentExerciseData.push(payload);
        localStorage.setItem(
            'exercise-data',
            JSON.stringify(currentExerciseData)
        );
    }
}

function clearLocalExerciseData() {
    localStorage.removeItem('exercise-data');
    document.getElementById('past-exercises').innerHTML = '';
}