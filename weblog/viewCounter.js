function processViewCounter() {
    let span = document.getElementById("view_count_span");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            renderResults(this.responseText, span);
        }   
    };

    xhttp.open("POST", "https://weblog-view-counter.herokuapp.com/countView");
    xhttp.send();
}

function getDateString(dateString) {
    const event = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', minute: 'numeric', second: 'numeric', hour: 'numeric'};
    return event.toLocaleDateString("en-US", options);
}

function renderResults(jsonText, textElement) {
    const responseObject = JSON.parse(jsonText);

    if (responseObject["succeeded"]) {
        const numberOfViews = responseObject["numberOfViews"];

        if (numberOfViews) {            
            textElement.innerHTML = "Total views: " + numberOfViews + ".";
        } else {
            textElement.innerHTML = "Total views: N/A.";
        }

        let mostRecentViewTime;

        if (responseObject["mostRecentViewTime"]) {
            mostRecentViewTime = responseObject["mostRecentViewTime"].replace("[Europe/Helsinki]", "");
        } else {
            mostRecentViewTime = "N/A";
        }

        textElement.innerHTML += " Last visit time: " + mostRecentViewTime + ".";
    } else {
        textElement.innerHTML = "Total views: N/A. Last visit time: N/A.";
    }
}