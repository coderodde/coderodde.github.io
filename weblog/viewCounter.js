function processViewCounter() {
    let span = document.getElementById("view_count_span");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("yees!");
            renderResults(this.responseText, span);
        } else {
            console.log("nooo!");
        }
    };

    xhttp.open("POST", "https://weblog-view-counter.herokuapp.com/countView");
    xhttp.send();
}

function renderResults(jsonText, textElement) {
    const responseObject = JSON.parse(jsonText);

    if (responseObject["succeeded"]) {
        const numberOfViews = responseObject["numberOfViews"];
        const mostRecentViewTime = responseObject["mostRecentViewTime"];

        if (numberOfViews) {            
            textElement.innerHTML = "Total views: " + numberOfViews + ".";
        } else {
            textElement.innerHTML = "Total views: N/A.";
        }

        if (mostRecentViewTime) {
            textElement += " Last visit time: " + new Date(mostRecentViewTime).toString() + ".";
        } else {
            textElement.innerHTML += " Last visit time: N/A.";
        }
    } else {
        textElement.innerHTML = "Total views: N/A. Last visit time: N/A.";
    }
}