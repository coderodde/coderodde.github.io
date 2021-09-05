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
        const numberOfTotalViews = responseObject["numberOfTotalViews"];

        if (numberOfTotalViews) {            
            textElement.innerHTML = "Total views: " + numberOfTotalViews + ". ";
        } else {
            textElement.innerHTML = "Total views: N/A. ";
        }

        const numberOfVisitorsViews = responseObject["numberOfVisitorsViews"];

        if (numberOfVisitorsViews) {
            textElement.innerHTML += "Your views: " + numberOfVisitorsViews + ". ";
        } else {
            textElement.innerHTML += "Your views: N/A. ";
        }

        textElement.innerHTML += "<br/>";

        let mostRecentViewTime;

        if (responseObject["mostRecentViewTime"]) {
            mostRecentViewTime = responseObject["mostRecentViewTime"].replace("[Europe/Helsinki]", "");
            mostRecentViewTime = getDateString(mostRecentViewTime);
        } else {
            mostRecentViewTime = "N/A";
        }

        textElement.innerHTML += "Most recent view time: " + mostRecentViewTime + ". ";

        let visitorsMostRecentViewTime;

        if (responseObject["visitorsMostRecentViewTime"]) {
            visitorsMostRecentViewTime = responseObject["visitorsMostRecentViewTime"].replace("[Europe/Helsinki]", "");
            visitorsMostRecentViewTime = getDateString(visitorsMostRecentViewTime);
        } else {
            visitorsMostRecentViewTime = "N/A";
        }

        textElement.innerHTML += " Your last visit time: " + visitorsMostRecentViewTime + ".";
    } else {
        textElement.innerHTML = "(No view data available.)";
    }
}