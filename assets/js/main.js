/* code here */

function setDefaults() {
    // Backward compatibility function
    // backwardCompatibility();
    // Set default session type
    document.getElementById('session-type').value = 'strength';
    // Set default date

    // Set default time

    // Load local data
    setItems();
    // Add event listener to upload button
    let jsonInput = document.getElementById('uploadJsonLink');
    jsonInput.addEventListener('change', (event) => {
        let file = event.target.files[0];

        let reader = new FileReader();
        reader.addEventListener('load', (event) => {
            let output = event.target.result;
            output = decodeURIComponent(output);
            output = JSON.parse(output);
            output = JSON.parse(output);
            // console.log(output);
            localStorage.setItem(
                'exercise-data',
                JSON.stringify(output)
            );
            setItems();
        });
        reader.readAsText(file);
    });
}

// function backwardCompatibility() {
//     let newArray = [];
//     let currentExerciseData = localStorage.getItem('exercise-data');
//     currentExerciseData = JSON.parse(currentExerciseData);
//     let a = 1
//     for (workout in currentExerciseData) {
//         let sessionTypeExists = 'id' in currentExerciseData[workout];
//         if (sessionTypeExists == false) {
//             newArray.push({
//                 'session-type': currentExerciseData[workout]['session-type'],
//                 'date': currentExerciseData[workout]['date'],
//                 'time': currentExerciseData[workout]['time'],
//                 'exercise': currentExerciseData[workout]['exercise'],
//                 'id': a,
//                 'repetitions': currentExerciseData[workout]['repetitions'],
//                 'duration': currentExerciseData[workout]['duration'],
//             });
//         } else {
//             newArray.push(currentExerciseData[workout]);
//         }
//         a++;
//     }
//     console.log(newArray);
//     localStorage.setItem(
//         'exercise-data',
//         JSON.stringify(newArray)
//     );
// }

function addItem(form) {
    // Get form data
    let sessionType = document.getElementById('session-type').value;
    let date = document.getElementById(form + '-date').value;
    let time = document.getElementById(form + '-time').value;
    let exercise = document.getElementById(form + '-workout-exercise-value').value;
    let repetitions;
    let duration;
    if (form === 'strength') {
        repetitions = document.getElementById(form + '-repetitions').value;
        duration = 0;
    } else {
        repetitions = 0;
        duration = document.getElementById(form + '-duration').value;
    }
    // Validate form data

    // Make payload
    let payload = {
        'session-type': sessionType,
        'date': date,
        'time': time,
        'exercise': exercise,
        'repetitions': repetitions,
        'duration': duration,
    };
    // Store data locally
    storeDataLocally(payload);
    // Add record
    setItems();
    // Hide add session menu
    closeAddSessionMenu()
}

function setItems() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    // console.log(currentExerciseData);
    if (currentExerciseData == null) {return false;}
    let pastExercisesEl = document.getElementById('past-exercises');
    pastExercisesEl.innerHTML = '';
    for (let itemNumber in currentExerciseData.reverse()) {
        let payload = currentExerciseData[itemNumber];
        // console.log(payload);
        let exerciseType = '';
        if (payload['session-type'] === 'strength') {
            exerciseType = '<p>Repetitions: ' + payload.repetitions.toString() + '</p>';
        } else {
            exerciseType = '<p>Duration: ' + payload.duration.toString() + '</p>';
        }
        pastExercisesEl.innerHTML += `<div class="exercise-set">
            <p>Date time: ` + payload.date.toString() + ' ' + payload.time.toString() + `</p>
            <p>Exercise: ` + payload.exercise.toString() + `</p>
            ` + exerciseType + `
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
    document.getElementById('strength-workout-exercise-value').value = exercise;
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
    closeClearDataBox();
}

function showClearDataBox() {
    document.getElementById('sidePanel').style.display = 'none';
    document.getElementById('confirm-clear-box').style.display = 'block';
}

function closeClearDataBox() {
    document.getElementById('confirm-clear-box').style.display = 'none';
}

function showAddSessionMenu() {
    document.getElementById('sidePanel').style.display = 'none';
    // console.log('show session menu clicked');
    document.getElementById('exercise-form-section').style.display = 'block';
}

function closeAddSessionMenu() {
    document.getElementById('exercise-form-section').style.display = 'none';
}

function showSessionForm(form) {
    let previousForm = document.getElementById('session-type').value;
    document.getElementById('session-type').value = form;
    // Change nav icon highlight
    document.getElementById('session-nav-icon-' + previousForm).className = "nav-icons-workouts";
    document.getElementById('session-nav-icon-' + form).className = "nav-icons-workouts nav-icons-workouts-active";
    // Change displayed form
    document.getElementById('session-type-' + previousForm + '-form').style.display = "none";
    document.getElementById('session-type-' + form + '-form').style.display = "block";
}

function saveJson() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    // console.log(currentExerciseData);
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentExerciseData));
    let anchorDownload = document.getElementById('downloadJsonLink');
    anchorDownload.href = dataStr;
    anchorDownload.download = "workouts.json";
    anchorDownload.click();
}

function uploadJson() {
    let jsonInput = document.getElementById('uploadJsonLink');
    jsonInput.click();
}

function showSidePanel() {
    document.getElementById('sidePanel').style.display = 'block';
}

function closeSidePanel() {
    document.getElementById('sidePanel').style.display = 'none';
}