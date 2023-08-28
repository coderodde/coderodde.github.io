class RadialPieChart {
    
    #canvas_id;
    #entries = [];
    #maximum_radius;
    #start_angle;
    #empty_pie_chart_color;
    #canvas_background_color;

    constructor(canvas_id,
                maximum_radius = 100,
                start_angle = 0.0, 
                empty_pie_chart_color = "#000",
                canvas_background_color = "#fff") {

        this.#canvas_id = canvas_id;

        this.#maximum_radius = 
            RadialPieChart.#validateMaximumRadius(maximum_radius);

        start_angle %= 360.0;

        if (start_angle < 0.0) {
            start_angle += 360.0;
        }

        this.#start_angle = start_angle;
        this.#empty_pie_chart_color = empty_pie_chart_color;
        this.#canvas_background_color = canvas_background_color; 
    }
    
    addEntry(value, color) {
        const entry = {
            "value": RadialPieChart.#validateValue(value),
            "color": color
        };

        this.#entries.push(entry);
    }

    getMaximumRadius() {
        return this.#maximum_radius;
    }

    getStartAngle() {
        return this.#start_angle;
    }

    getValueAt(index) {
        this.#checkIndex(index);
        return this.#entries[index]["value"];
    }

    getColorAt(index) {
        this.#checkIndex(index);
        return this.#entries[index]["color"];
    }

    setStartAngle(start_angle) {
        this.#start_angle = start_angle;
        this.#start_angle %= 360.0;

        if (this.#start_angle < 0.0) {
            this.#start_angle += 360.0;
        }
    }

    setMaximumRadius(new_maximum_radius) {
        this.#validateValue(new_maximum_radius);
        this.#maximum_radius = new_maximum_radius;
    }

    setValueAt(index, new_value) {
        this.#checkIndex(index);
        this.#entries[index]["value"] = this.#validateValue(new_value);
    }

    setColorAt(index, new_color) {
        this.#checkIndex(index);
        this.#entries[index]["color"] = new_color;
    }

    removeEntry(index) {
        if (this.#entries.length === 0) {
            throw "Removing from an empty list.";
        }

        this.#checkIndex(index);
        this.#entries.splice(index, 1);
    }

    render() {
        const canvas = document.getElementById(this.#canvas_id);
        const ctx = canvas.getContext("2d");

        ctx.canvas.width  = this.#maximum_radius * 2;
        ctx.canvas.height = this.#maximum_radius * 2;

        // Fill the entire chart background:
        ctx.fillStyle = this.#canvas_background_color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (this.#entries.length === 0) {
            // Once here, there is no entries in the list.
            // Just fill the circle with empty_pie_chart_color:
            this.#fillEmptyCircle(ctx);
        } else {
            this.#renderEntries(ctx);
        }
    }
    
    static #validateValue(value) {
        if (value < 0) {
            throw "Value (" + value + ") can not be negative.";
        }
        
        return value;
    }

    static #validateMaximumRadius(maximum_radius) {
        if (maximum_radius <= 0) {
            throw "Maximum radius (" + maximum_radius + ") is not positive.";
        }

        return maximum_radius;
    }

    #checkIndex(index) {
        if (this.#entries.length === 0) {
            throw "Indexing an empty list.";
        }

        if (index < 0) {
            throw "Index (" + index + ") cannot be negative.";
        }

        if (index >= this.#entries.length) {
            throw "Index (" + index + ") is too large. Must be at most "
                  + this.#entries.length + ".";
        }
    }

    #fillEmptyCircle(ctx) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = width / 2;

        ctx.beginPath();
        ctx.arc(centerX,
                centerY,
                radius,
                0.0,
                2 * Math.PI, 
                false);

        ctx.fillStyle = this.#empty_pie_chart_color;
        ctx.fill();
    }

    #renderEntries(ctx) {
        const angle_per_entry = 360.0 / this.#entries.length;

        for (var i = 0, n = this.#entries.length; i !== n; i++) {
            var entry_start_angle = -90.0 + this.#start_angle + angle_per_entry * i;
            var entry_end_angle = entry_start_angle + angle_per_entry;

            this.#drawEntry(ctx,
                            entry_start_angle, 
                            entry_end_angle,
                            this.#entries[i]["value"],
                            this.#entries[i]["color"]);
        }
    }

    #drawEntry(ctx, start_angle, end_angle, value, color) {
        const centerX = this.#maximum_radius;
        const centerY = this.#maximum_radius;
        const maximum_value = this.#findMaximumValue();
        const radius = this.#maximum_radius * (value / maximum_value);

        ctx.beginPath();
        ctx.arc(centerX, 
                centerY,
                radius, 
                (start_angle / 180.0) * Math.PI, 
                (end_angle / 180.0) * Math.PI);

        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = color;
        ctx.fill();
    }

    #findMaximumValue() {
        var maximum_value = 0;

        for (var i = 0, n = this.#entries.length; i !== n; i++) {
            const tentative_maximum_value = this.#entries[i]["value"];
            maximum_value = Math.max(maximum_value, tentative_maximum_value);
        }

        return maximum_value;
    }
}

function populatePieChartWithEntries(rpc, pie_chart) {
    const entries = pie_chart.getElementsByTagName("entry");

    for (var i = 0, n = entries.length; i !== n; i++) {
        const entry = entries[i];
        const value = entry.getAttribute("value");
        const color = entry.getAttribute("color");
        rpc.addEntry(value, color);
    }
}

function getRadialPieChartCanvasID(number) {
    return "radial-pie-chart-canvas-id-" + number;
}

function typesetSinglePieChart(pie_chart, number) {
    const canvas = document.createElement("canvas");
    canvas.id = getRadialPieChartCanvasID(number);

    pie_chart.appendChild(canvas);

    const start_angle = pie_chart.getAttribute("start-angle") || 0;
    const maximum_radius = pie_chart.getAttribute("maximum-radius") || 100;

    canvas.width = maximum_radius * 2;
    canvas.height = maximum_radius * 2;

    const empty_pie_chart_color = 
        pie_chart.getAttribute("empty-pie-chart-color") || "#000";

    const canvas_background_color = 
        pie_chart.getAttribute("canvas-background-color") || "#fff";

    const rpc = new RadialPieChart(canvas.id,
                                   maximum_radius,
                                   start_angle, 
                                   empty_pie_chart_color,
                                   canvas_background_color);

    populatePieChartWithEntries(rpc, pie_chart);
    rpc.render();
}

function typesetAllPieCharts() {
    const pie_charts = document.getElementsByTagName("rodde-radial-pie-chart");
    var number = 1;

    for (var i = 0, n = pie_charts.length; i !== n; i++) {
        typesetSinglePieChart(pie_charts[i], number++);
    }
}

typesetAllPieCharts();