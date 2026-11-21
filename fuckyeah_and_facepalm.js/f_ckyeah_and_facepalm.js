function fuckyeah_bling(fuckyeah_text_element) {
    var black = true;

    function fuckyeah_bling_func() {
        var colors = ["red", "orange", "yellow", "green", "blue", "violet"];
        var index = Math.floor(Math.random() * 6);

        fuckyeah_text_element.style.color = colors[index];
        fuckyeah_text_element.style.backgroundColor = black ? "black" : "white";
        black = !black;
    }

    setInterval(fuckyeah_bling_func, 200);
}

function process_fuckyeah(fuckyeah_element) {
    var textElement = document.createElement("span");
    var divElement = document.createElement("div");

    divElement.style = "text-align: center;";
    textElement.innerHTML = "F_CK YEAH";
    textElement.style = "font-size:50px; font-weight: bold;";

    fuckyeah_bling(textElement);
    divElement.appendChild(textElement);
    fuckyeah_element.appendChild(divElement);
}

function process_facepalm(facepalm_element) { 
        var imgElement = document.createElement("img");
        var divElement = document.createElement("div");

        divElement.style = "text-align: center;";
        imgElement.src = "facepalm.webp";
        imgElement.width="240";
        imgElement.height="144";

        divElement.appendChild(imgElement);
        facepalm_element.appendChild(divElement);
}

function setup()
{
    customElements.define("fuck-yeah", class extends HTMLElement {});
    customElements.define("face-palm", class extends HTMLElement {});

    var fuckyeahList = document.getElementsByTagName("fuck-yeah");
    var facepalmList = document.getElementsByTagName("face-palm");

    for (var i = 0; i < fuckyeahList.length; ++i) {
        process_fuckyeah(fuckyeahList[i]);
    }

    for (var i = 0; i < facepalmList.length; ++i) {
        process_facepalm(facepalmList[i]);
    }
}

// Add the onload handler, do not discard other possible handlers:
var old_onload_handler = window.onload;

window.onload = function() {
    if (old_onload_handler) {
        old_onload_handler();
    }

    setup();
};