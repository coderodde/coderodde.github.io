class ConnectFourCanvas {
    
    static #BACKGROUND_RGB_COLOR = "#bbbbbb";
    static #X_PLAYER_RGB_COLOR   = "#1b379e";
    static #O_PLAYER_RGB_COLOR   = "#d94545";
    static #COLUMNS = 7;
    static #ROWS = 6;
    static #O = 0;
    static #X = 1;
    static #EMPTY = -1;
    static #MARGIN_RADIUS = 4;
    static #PADDING = 15;
            
    #canvas;
    #canvasContext;
    #width;
    #height;
    #board;
    
    constructor() {
        if (arguments.length !== 3) {
            throw "Expecting 4 arguments: canvas, width, height.";
        }
        
        this.#canvas = arguments[0];
        this.#canvasContext = this.#canvas.getContext('2d');
        this.#width = arguments[1];
        this.#height = arguments[2];
    }
    
    setBoard(board) {
        this.#board = board;
    }
    
    setSize(width, height) {
        this.#width  = width;
        this.#height = height;
        this.#canvasContext.canvas.width  = width;
        this.#canvasContext.canvas.height = height;
    }
    
    render() {
        this.#paintBackground();
        this.#paintCells();
    }
    
    #paintBackground() {
//        const skipLeftMarginWidth = this.#getLeftMarginWidth();
//        const skipTopMarginHeight = this.#getTopMarginHeight();
        
        this.#canvasContext.fillStyle = ConnectFourCanvas.#BACKGROUND_RGB_COLOR;
//        this.#canvasContext.fillRect(skipLeftMarginWidth,
//                                     skipTopMarginHeight + ConnectFourCanvas.#PADDING,
//                                     this.#width - 2 * skipLeftMarginWidth,
//                                     this.#height - 2 * skipTopMarginHeight - 
//                                             ConnectFourCanvas.#PADDING);
        this.#canvasContext.fillRect(0,
                                     0,
                                     this.#width,
                                     this.#height);
    }
    
    #getCellWidth() {
        const cellWidth  = this.#width  / ConnectFourCanvas.#COLUMNS;
        const cellHeight = this.#height / ConnectFourCanvas.#ROWS;
        const effectiveCellWidth = Math.min(cellWidth, cellHeight);
        return effectiveCellWidth;
    }
    
//    #getLeftMarginWidth() {
//        const cellWidth = this.#getCellWidth();
//        const totalWidth = this.#width;
//        const totalCellWidths = ConnectFourCanvas.#COLUMNS * cellWidth;
//        const leftMarginWidth = (totalWidth - totalCellWidths) / 2;
//        return leftMarginWidth;
//    }
//    
//    #getTopMarginHeight() {
//        const cellWidth = this.#getCellWidth();
//        const totalHeight = this.#height;
//        const totalCellHeights = ConnectFourCanvas.#ROWS * cellWidth;
//        const topMarginHeight = (totalHeight - totalCellHeights) / 2;
//        return topMarginHeight;
//    }
    
    #paintCells() {
//        const skipLeftMarginWidth = this.#getLeftMarginWidth();
//        const skipTopMarginHeight = this.#getTopMarginHeight() + 
//                                    ConnectFourCanvas.#PADDING;
        
        for (let y = 0; y < ConnectFourCanvas.#ROWS; y++) {
            for (let x = 0; x < ConnectFourCanvas.#COLUMNS; x++) {
                const cellValue = this.#board.get(x, y);
                const cellRgb = this.#getCellRGB(cellValue);
                
                const cellWidth = this.#getCellWidth();
                const centerX = x * cellWidth + cellWidth / 2;
                      
                const centerY = y * cellWidth + cellWidth / 2;

                const radius = 
                        (cellWidth - ConnectFourCanvas.#MARGIN_RADIUS) / 2;
                
                this.#canvasContext.beginPath();
                this.#canvasContext.fillStyle = cellRgb;
                this.#canvasContext.arc(centerX,
                                        centerY,
                                        radius,
                                        0,
                                        2 * Math.PI,
                                        false);
                                        
                this.#canvasContext.fill();
            }
        }
    }
    
    #getCellRGB(cellValue) {
        switch (cellValue) {
            case EMPTY:
                return "white"; 
                
            case ConnectFourCanvas.#X:
                return ConnectFourCanvas.#X_PLAYER_RGB_COLOR;
                
            case ConnectFourCanvas.#O:
                return ConnectFourCanvas.#O_PLAYER_RGB_COLOR;
                
            default:
                throw "Should not get here.";
        }
    }
}