/* Chart specific code goes below here */

let strengthChart;
let enduranceChart;
let meditationChart;

function setDefaultDate() {
    let currentDate = new Date();
    document.getElementById('to-date').value = currentDate.toISOString().substring(0, 10);
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    document.getElementById('from-date').value = currentExerciseData[0]['date'];
}

function loadStrengthChartBasic() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    let fromDate = document.getElementById('from-date').value + ' 00:00:00';
    fromDate = new Date(fromDate);
    let toDate = document.getElementById('to-date').value + ' 23:59:59';
    toDate = new Date(toDate);

    let relevantDates = [];
    let relevantExerciseData = {};
    for (let i = 0; i < currentExerciseData.length; i++) {
        if (currentExerciseData[i]['session-type'] == 'strength') {
            let exerciseDate = new Date(currentExerciseData[i]['date'] + ' ' + currentExerciseData[i]['time']);
            if (exerciseDate < fromDate) {
                continue;
            }
            if (exerciseDate > toDate) {
                continue;
            }
            // console.log(currentExerciseData[i]); 
            // Get a unique list of dates for labels
            if (relevantDates.length == 0) {
                relevantDates.push(currentExerciseData[i]['date']);
            } else {
                if (currentExerciseData[i]['date'] != relevantDates[relevantDates.length - 1]) {
                    relevantDates.push(currentExerciseData[i]['date']);
                }
            }

            // Sum up all relevant exercises
            // Add exercise to object
            if (currentExerciseData[i]['exercise'] in relevantExerciseData) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']] = {};
            }
            // add date to exercise
            if (currentExerciseData[i]['date'] in relevantExerciseData[currentExerciseData[i]['exercise']]) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = 0;
            }
            // add up the exercise repetitions
            relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = (
                parseInt(relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']])
                + parseInt(currentExerciseData[i]['repetitions'])
            );

        }
    }
    
    // console.log(relevantDates);
    // console.log(relevantExerciseData);

    let lineDataset = [];

    for (let exercise in relevantExerciseData) {
        let keyLabel = exercise;
        let colour1 = Math.random() * 255;
        let colour2 = Math.random() * 255;
        let colour3 = Math.random() * 255;
        let lineBackgroundColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineBorderColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineData = [];
        for (let i = 0; i < relevantDates.length; i++) {
            if (relevantDates[i] in relevantExerciseData[exercise]) {
                lineData.push(relevantExerciseData[exercise][relevantDates[i]]);
            } else {
                lineData.push(0);
            }
        }
        lineDataset.push(
            {
                label: keyLabel,
                backgroundColor: lineBackgroundColour,
                borderColor: lineBorderColour,
                data: lineData,
            }
        );
    }

    let labels = relevantDates;
    let data = {
        labels: labels,
        datasets: lineDataset
    };

    let config = {
        type: 'bar',
        data,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '# of Repetitions'
                    }
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Strength Progress'
                }   
            }
        }
    };
    
    // === include 'setup' then 'config' above ===
  
    strengthChart = new Chart(
        document.getElementById('myStrengthChart'),
        config
    );
}

function loadEnduranceChartBasic() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    let fromDate = document.getElementById('from-date').value + ' 00:00:00';
    fromDate = new Date(fromDate);
    let toDate = document.getElementById('to-date').value + ' 23:59:59';
    toDate = new Date(toDate);

    let relevantDates = [];
    let relevantExerciseData = {};
    for (let i = 0; i < currentExerciseData.length; i++) {
        if (currentExerciseData[i]['session-type'] == 'endurance') {
            let exerciseDate = new Date(currentExerciseData[i]['date'] + ' ' + currentExerciseData[i]['time']);
            if (exerciseDate < fromDate) {
                continue;
            }
            if (exerciseDate > toDate) {
                continue;
            }
            // console.log(currentExerciseData[i]); 
            // Get a unique list of dates for labels
            if (relevantDates.length == 0) {
                relevantDates.push(currentExerciseData[i]['date']);
            } else {
                if (currentExerciseData[i]['date'] != relevantDates[relevantDates.length - 1]) {
                    relevantDates.push(currentExerciseData[i]['date']);
                }
            }

            // Sum up all relevant exercises
            // Add exercise to object
            if (currentExerciseData[i]['exercise'] in relevantExerciseData) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']] = {};
            }
            // add date to exercise
            if (currentExerciseData[i]['date'] in relevantExerciseData[currentExerciseData[i]['exercise']]) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = 0;
            }
            // add up the exercise repetitions
            relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = (
                parseInt(relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']])
                + parseInt(currentExerciseData[i]['duration'])
            );

        }
    }
    
    // console.log(relevantDates);
    // console.log(relevantExerciseData);

    let lineDataset = [];

    for (let exercise in relevantExerciseData) {
        let keyLabel = exercise;
        let colour1 = Math.random() * 255;
        let colour2 = Math.random() * 255;
        let colour3 = Math.random() * 255;
        let lineBackgroundColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineBorderColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineData = [];
        for (let i = 0; i < relevantDates.length; i++) {
            if (relevantDates[i] in relevantExerciseData[exercise]) {
                lineData.push(relevantExerciseData[exercise][relevantDates[i]]);
            } else {
                lineData.push(0);
            }
        }
        lineDataset.push(
            {
                label: keyLabel,
                backgroundColor: lineBackgroundColour,
                borderColor: lineBorderColour,
                data: lineData,
            }
        );
    }

    let labels = relevantDates;
    let data = {
        labels: labels,
        datasets: lineDataset
    };

    let config = {
        type: 'bar',
        data,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Duration (minutes)'
                    }
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Endurance Progress'
                }   
            }
        }
    };
    
    // === include 'setup' then 'config' above ===
  
    enduranceChart = new Chart(
        document.getElementById('myEnduranceChart'),
        config
    );
}


function loadMeditationChartBasic() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);
    let fromDate = document.getElementById('from-date').value + ' 00:00:00';
    fromDate = new Date(fromDate);
    let toDate = document.getElementById('to-date').value + ' 23:59:59';
    toDate = new Date(toDate);

    let relevantDates = [];
    let relevantExerciseData = {};
    for (let i = 0; i < currentExerciseData.length; i++) {
        if (currentExerciseData[i]['session-type'] == 'meditation') {
            let exerciseDate = new Date(currentExerciseData[i]['date'] + ' ' + currentExerciseData[i]['time']);
            if (exerciseDate < fromDate) {
                continue;
            }
            if (exerciseDate > toDate) {
                continue;
            }
            // console.log(currentExerciseData[i]); 
            // Get a unique list of dates for labels
            if (relevantDates.length == 0) {
                relevantDates.push(currentExerciseData[i]['date']);
            } else {
                if (currentExerciseData[i]['date'] != relevantDates[relevantDates.length - 1]) {
                    relevantDates.push(currentExerciseData[i]['date']);
                }
            }

            // Sum up all relevant exercises
            // Add exercise to object
            if (currentExerciseData[i]['exercise'] in relevantExerciseData) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']] = {};
            }
            // add date to exercise
            if (currentExerciseData[i]['date'] in relevantExerciseData[currentExerciseData[i]['exercise']]) {
                // do nothing
            } else {
                relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = 0;
            }
            // add up the exercise repetitions
            relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']] = (
                parseInt(relevantExerciseData[currentExerciseData[i]['exercise']][currentExerciseData[i]['date']])
                + parseInt(currentExerciseData[i]['duration'])
            );

        }
    }
    
    // console.log(relevantDates);
    // console.log(relevantExerciseData);

    let lineDataset = [];

    for (let exercise in relevantExerciseData) {
        let keyLabel = exercise;
        let colour1 = Math.random() * 255;
        let colour2 = Math.random() * 255;
        let colour3 = Math.random() * 255;
        let lineBackgroundColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineBorderColour = 'rgb(' + colour1.toString() + ', ' + colour2.toString() + ', ' + colour3.toString() + ')';
        let lineData = [];
        for (let i = 0; i < relevantDates.length; i++) {
            if (relevantDates[i] in relevantExerciseData[exercise]) {
                lineData.push(relevantExerciseData[exercise][relevantDates[i]]);
            } else {
                lineData.push(0);
            }
        }
        lineDataset.push(
            {
                label: keyLabel,
                backgroundColor: lineBackgroundColour,
                borderColor: lineBorderColour,
                data: lineData,
            }
        );
    }

    let labels = relevantDates;
    let data = {
        labels: labels,
        datasets: lineDataset
    };

    let config = {
        type: 'bar',
        data,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Duration (minutes)'
                    }
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Meditation Progress'
                }   
            }
        }
    };
    
    // === include 'setup' then 'config' above ===
  
    meditationChart = new Chart(
        document.getElementById('myMeditationChart'),
        config
    );
}


function chooseChart(chartType) {
    let currentSessionType = document.getElementById('current-display').value;
    document.getElementById('current-display').value = chartType;
    // console.log(currentSessionType);
    // Change nav icon highlight
    document.getElementById('session-nav-icon-' + currentSessionType).className = "nav-icons-workouts";
    document.getElementById('session-nav-icon-' + chartType).className = "nav-icons-workouts nav-icons-workouts-active";
    // Show chart
    document.getElementById(currentSessionType + '-chart').style.display = 'none';
    document.getElementById(chartType + '-chart').style.display = 'block';
}

function refreshCharts() {
    document.getElementById('invalid-input-from-to-date').style.display = 'none';
    let fromDate = document.getElementById('from-date').value;
    let toDate = document.getElementById('to-date').value;
    if (fromDate.length === 0 || toDate.length === 0) {
        document.getElementById('invalid-input-from-to-date').style.display = 'block';
        return;
    }
    strengthChart.destroy();
    enduranceChart.destroy();
    meditationChart.destroy();
    loadStrengthChartBasic();
    loadEnduranceChartBasic();
    loadMeditationChartBasic();
}