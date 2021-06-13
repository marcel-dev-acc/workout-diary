/* code here */

function setDefaults() {
    // Set default date

    // Set default time

    // Load local data
    setItems();
}

function addItem() {
    // Get form data
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let exercise = document.getElementById('workout-exercise-value').value;
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
    setItems();
}

function setItems() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    if (currentExerciseData == null) {return false;}
    let pastExercisesEl = document.getElementById('past-exercises');
    pastExercisesEl.innerHTML = '';
    for (let itemNumber in currentExerciseData.reverse()) {
        let payload = currentExerciseData[itemNumber];
        pastExercisesEl.innerHTML += `<div class="exercise-set">
            <p>Date time: ` + payload.date.toString() + ' ' + payload.time.toString() + `</p>
            <p>Exercise: ` + payload.exercise.toString() + `</p>
            <p>Repetitions: ` + payload.repetitions.toString() + `</p>
        </div>`;
    }
}

function storeDataLocally(payload) {
    let currentExerciseData = localStorage.getItem('exercise-data');
    if (currentExerciseData == null) {
        payload['id'] = 1;
        localStorage.setItem(
            'exercise-data',
            JSON.stringify([payload])
        );
    } else {
        currentExerciseData = JSON.parse(currentExerciseData);
        payload['id'] = currentExerciseData.length + 1;
        currentExerciseData.push(payload);
        localStorage.setItem(
            'exercise-data',
            JSON.stringify(currentExerciseData)
        );
    }
}

function setExerciseValue(exercise) {
    document.getElementById('workout-exercise-value').value = exercise;
    let activeExerciseListValue = exercise
    if (exercise.length > 12) {
        activeExerciseListValue = exercise.substring(0, 9) + '...'
    }
    document.getElementById('active-exercise-list-value').innerHTML = activeExerciseListValue;
    document.getElementById('workout-exercise-list-pop-up').style.display = 'none';
}

function showExerciseList() {
    document.getElementById('workout-exercise-list-pop-up').style.display = 'block';
}

function clearLocalExerciseData() {
    localStorage.removeItem('exercise-data');
    document.getElementById('past-exercises').innerHTML = '';
}

function showAddSessionMenu() {
    console.log('show session menu clicked');
    document.getElementById('exercise-form-section').style.display = 'block';
}

function closeAddSessionMenu() {
    console.log('close session menu clicked');
    document.getElementById('exercise-form-section').style.display = 'none';
}