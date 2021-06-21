/* Chart specific code goes below here */

function loadStrengthChartBasic() {
    let currentExerciseData = localStorage.getItem('exercise-data');
    currentExerciseData = JSON.parse(currentExerciseData);

    let relevantDates = [];
    let relevantExerciseData = {};
    for (let i = 0; i < currentExerciseData.length; i++) {
        if (currentExerciseData[i]['session-type'] == 'strength') {
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
        options: {}
    };
    
    // === include 'setup' then 'config' above ===
  
    let strengthChart = new Chart(
        document.getElementById('myStrengthChart'),
        config
    );
}



function chooseChart(chartType) {

}