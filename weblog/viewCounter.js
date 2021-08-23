function process() {
    let span = document.getElementById("view_count_span");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            renderResults(this.responseText, span);
        }
    };
    xhttp.open("POST", "https://weblog-view-counter.herokuapp.com/countView", true);
    xhttp.send();
}

function renderResults(jsonText, textElement) {
    const responseObject = JSON.parse(jsonText);
    
    if (responseObject["succeeded"]) {
        const numberOfViews = responseObject["numberOfViews"];
        const mostRecentViewTime = responseObject["mostRecentViewCount"];
        textElement.innerHTML = 
            "Total views: " +
            numberOfViews + 
            ". Last visit time: " + 
            mostRecentViewTime +
            ".";

    } else {
        textElement.innerHTML = "Total views: N/A. Last visit time: N/A.";
    }
}