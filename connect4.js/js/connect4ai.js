const ROWS = 6;
const COLUMNS = 7;
const MARGIN_RADIUS = 10;
const PROGRESS_BAR_HEIGHT = 15;
const O = 0;
const X = 1;
const EMPTY = -1;
const BOARD_FILL_STYLE = '#3879e0';
const PLIES = [ 3, 2, 4, 1, 5, 0, 6 ];

class ConnectFourHeuristicFunction {
    static #TWO_BLOCKS_SCORE = 1;
    static #THREE_BLOCKS_SCORE = 10;
    static #MINIMIZING_PLAYER_VICTORY_SCORE = -1000000;
    static #MAXIMIZING_PLAYER_VICTORY_SCORE = +1000000;
    
    evaluate(state, depth) {
        if (state.isWinningFor(X)) {
            return ConnectFourHeuristicFunction.#MINIMIZING_PLAYER_VICTORY_SCORE - depth;
        }
        
        if (state.isWinningFor(O)) {
            return ConnectFourHeuristicFunction.#MAXIMIZING_PLAYER_VICTORY_SCORE + depth;
        }
        
        return this.#evaluate2(state) +
               this.#evaluate3(state);
    }
    
    #evaluate2(state) {
        return this.#evaluate2Horizontal (state) +
               this.#evaluate2Vertical   (state) + 
               this.#evaluate2Ascending  (state) +
               this.#evaluate2Descending (state);
    }
    
    #evaluate3(state) {
        return this.#evaluate3Horizontal (state) +
               this.#evaluate3Vertical   (state) + 
               this.#evaluate3Ascending  (state) +
               this.#evaluate3Descending (state);
    }
    
    #evaluate2Horizontal(state) {
        let sum = 0;
        
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLUMNS - 1; x++) {
                if (state.get(x, y) === O &&
                    state.get(x + 1, y) === O) {
                    sum += ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                           state.get(x + 1, y) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate2Vertical(state) {
        let sum = 0;
        
        for (let y = 0; y < ROWS - 1; y++) {
            for (let x = 0; x < COLUMNS; x++) {
                if (state.get(x, y) === O &&
                    state.get(x, y + 1) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                       state.get(x, y + 1) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate2Ascending(state) {
        let sum = 0;
        
        for (let y = ROWS - 1; y > 0; y--) {
            for (let x = 0; x < COLUMNS - 1; x++) {
                if (state.get(x, y) === O &&
                    state.get(x + 1, y - 1) === O) {
                    sum += ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                           state.get(x + 1, y - 1) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate2Descending(state) {
        let sum = 0;
        
        for (let y = ROWS - 1; y > 0; y--) {
            for (let x = 1; x < COLUMNS; x++) {
                if (state.get(x, y) === O &&
                    state.get(x - 1, y - 1) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                           state.get(x - 1, y - 1) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#TWO_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate3Horizontal(state) {
        let sum = 0;
        
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLUMNS - 2; x++) {
                if (state.get(x, y) === O &&
                    state.get(x + 1, y) === O &&
                    state.get(x + 2, y) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                        state.get(x + 1, y) === X &&
                        state.get(x + 2, y) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate3Vertical(state) {
        let sum = 0;
        
        for (let y = 0; y < ROWS - 2; y++) {
            for (let x = 0; x < COLUMNS; x++) {
                if (state.get(x, y) === O &&
                    state.get(x, y + 1) === O &&
                    state.get(x, y + 2) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                        state.get(x, y + 1) === X &&
                        state.get(x, y + 2) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate3Ascending(state) {
        let sum = 0;
        
        for (let y = ROWS - 1; y > 1; y--) {
            for (let x = 0; x < COLUMNS - 2; x++) {
                if (state.get(x, y) === O &&
                    state.get(x + 1, y - 1) === O &&
                    state.get(x + 2, y - 2) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                        state.get(x + 1, y - 1) === X && 
                        state.get(x + 2, y - 2) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
    
    #evaluate3Descending(state) {
        let sum = 0;
        
        for (let y = ROWS - 1; y > 1; y--) {
            for (let x = 2; x < COLUMNS; x++) {
                if (state.get(x, y) === O &&
                    state.get(x - 1, y - 1) === O &&
                    state.get(x - 2, y - 2) === O) {
                    
                    sum += ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                } else if (state.get(x, y) === X &&
                        state.get(x - 1, y - 1) === X &&
                        state.get(x - 2, y - 2) === X) {
                    
                    sum -= ConnectFourHeuristicFunction.#THREE_BLOCKS_SCORE;
                }
            }
        }
        
        return sum;
    }
}

class ConnectFourBoard {
    static ROWS = 6;
    static COLUMNS = 7;
    static VICTORY_LENGTH = 4;
    
    #boardData;
        
    #getCellChar(cellCharacter) {
        switch (cellCharacter) {
            case X:
                return "<span style='color: blue;'>X</span>";
                
            case O:
                return "<span style='color: red;'>O</span>";
                
            case EMPTY:
                return " ";
                
            default:
                throw "Should not get here.";
        }
    }
        
    #getWinningCellChar(cellCharacter) {
        switch (cellCharacter) {
            case X:
                return "<span style='color: white; background-color: black; font-weight: bold;'>X</span>";
                
            case O:
                return "<span style='color: white; background-color: black; font-weight: bold;'>O</span>";
                
            case EMPTY:
                return " ";
                
            default:
                throw "Should not get here.";
        }
    }
    
    constructor(other) {
        if (arguments.length === 1) {
            this.#boardData = [...other.#boardData];
        } else {
            this.#boardData = Array(ConnectFourBoard.ROWS *
                                    ConnectFourBoard.COLUMNS);
                            
            for (let i = 0, end = this.#boardData.length; i < end; i++) {
                this.#boardData[i] = EMPTY;
            }
        }
    }
    
    expand() {
        const children = new Array(ConnectFourBoard.COLUMNS);
        
        for (const x of PLIES) {
            if (makePly(x)) {
                const child = new ConnectFourBoard(this);
                children.push(child);
                unmakePly(x);
            }
        }
        
        return children;
    }
    
    get(x, y) {
        return this.#boardData[y * ConnectFourBoard.COLUMNS + x];
    }
    
    set(x, y, playerType) {
        this.#boardData[y * ConnectFourBoard.COLUMNS + x] = playerType;
    }
    
    toString() {
        let str = "";
        const winningPattern = this.getWinningPattern();
        
        function isInWinningPattern(winningPattern, x, y) {
            if (winningPattern === null) {
                return false;
            }
            
            for (const p of winningPattern) {
                if (p.x === x && p.y === y) {
                    return true;
                }
            }
            
            return false;
        }
        
        for (let y = 0; y < ConnectFourBoard.ROWS; y++) {
            for (let x = 0; x < ConnectFourBoard.COLUMNS; x++) {
                str += "|";
                
                const belongsToWinningPattern = 
                        isInWinningPattern(winningPattern, x, y);
                
                if (belongsToWinningPattern === false) {
                    str += this.#getCellChar(this.get(x, y));

                } else {
                    str += this.#getWinningCellChar(this.get(x, y));
                }
            }
            
            str += "|<br/>";
        }
        
        str += "+-+-+-+-+-+-+-+<br/>";
        str += " 1 2 3 4 5 6 7";
        
        return str;
    }
    
    isTie() {
        for (let x = 0; x < COLUMNS; x++) {
            if (this.get(x, 0) === EMPTY) {
                return false;
            }
        }
        
        return true;
    }
    
    makePly(x, playerType) {
        for (let y = ROWS - 1; y >= 0; y--) {
            if (this.get(x, y) === EMPTY) {
                this.set(x, y, playerType);
                return true;
            }
        }
        
        return false;
    }
    
    unmakePly(x) {
        for (let y = 0; y < ROWS; y++) {
            if (this.get(x, y) !== EMPTY) {
                this.set(x, y, EMPTY);
                return;
            }
        }
    }
    
    isTerminal() {
        return this.isWinningFor(O) ||
               this.isWinningFor(X) ||
               this.isTie();
    }
    
    getWinningPattern() {
        if (!this.isWinningFor(X) &&
            !this.isWinningFor(O)) {
            return null;
        }
        
        let winningPattern = null;
        
        for (let length = ROWS; 
                 length >= ConnectFourBoard.VICTORY_LENGTH; 
                 length--) {
        
            // Try load the vertical winning pattern:
            winningPattern = 
                    this.tryLoadVerticalWinningPattern(X, length);

            if (winningPattern !== null) {
                return winningPattern;
            }
        
            winningPattern = 
                    this.tryLoadVerticalWinningPattern(O, length);

            if (winningPattern !== null) {
                return winningPattern;
            }
            
            // Try to load the ascending winning pattern:
            winningPattern =
                this.tryLoadAscendingWinningPattern(X, length);
        
            if (winningPattern !== null) {
                return winningPattern;
            }
            
            winningPattern =
                this.tryLoadAscendingWinningPattern(O, length);
        
            if (winningPattern !== null) {
                return winningPattern;
            }

            // Try to load the descending winning pattern:
            winningPattern = 
                    this.tryLoadDescendingWinningPattern(X, length);

            if (winningPattern !== null) {
                return winningPattern;
            }

            winningPattern = 
                    this.tryLoadDescendingWinningPattern(O, length);
            
            if (winningPattern !== null) {
                return winningPattern;
            }
        }

        for (let length = COLUMNS; length >= ConnectFourBoard.VICTORY_LENGTH; length--) {
            
            winningPattern = 
                    this.tryLoadHorizontalWinningPattern(X, length);
            
            if (winningPattern !== null) {
                return winningPattern;
            }
            
            winningPattern = 
                    this.tryLoadHorizontalWinningPattern(O, length);
            
            if (winningPattern !== null) {
                return winningPattern;
            }
        }
        
        throw "Should not get here.";
    }
    
    hasHorizontalStreak(playerType, length) {
        const lastX = COLUMNS - length;
        
        for (let y = ROWS - 1; y >= 0; y--) {
            horizontalCheck:
            
            for (let x = 0; x <= lastX; x++) {
                
                for (let i = 0; i < length; i++) {
                    if (this.get(x + i, y) !== playerType) {
                        continue horizontalCheck;
                    }
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    hasVerticalStreak(playerType, length) {
        const lastY = ROWS - length;
        
        for (let x = 0; x < COLUMNS; x++) {
            verticalCheck:
            
            for (let y = 0; y <= lastY; y++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x, y + i) !== playerType) {
                        continue verticalCheck;
                    }
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    hasAscendingDiagonalStreak(playerType, length) {
        
        const lastX = COLUMNS - length;
        const lastY = length - 1;
        
        for (let y = ROWS - 1; y >= lastY; y--) {
            diagonalCheck:
            
            for (let x = 0; x <= lastX; x++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x + i, y - i) !== playerType) {
                        continue diagonalCheck;
                    }
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    hasDescendingDiagonalStreak(playerType, length) {
        
        const firstX = length - 1;
        const lastY  = length - 1;
        
        for (let y = ROWS - 1; y >= lastY; y--) {
            diagonalCheck:
                    
            for (let x = firstX; x < COLUMNS; x++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x - i, y - i) !== playerType) {
                        continue diagonalCheck;
                    }
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    isWinningFor(playerType) {
        return this.hasAscendingDiagonalStreak  (playerType, ConnectFourBoard.VICTORY_LENGTH) ||
               this.hasDescendingDiagonalStreak (playerType, ConnectFourBoard.VICTORY_LENGTH) ||
               this.hasHorizontalStreak         (playerType, ConnectFourBoard.VICTORY_LENGTH) ||
               this.hasVerticalStreak           (playerType, ConnectFourBoard.VICTORY_LENGTH);
    }
    
    tryLoadAscendingWinningPattern(playerType, length) {
        
        const lastX = COLUMNS - length;
        const lastY = length - 1;
        let winningPattern = [];
        
        for (let y = ROWS - 1; y >= lastY; y--) {
            diagonalCheck:
                    
            for (let x = 0; x <= lastX; x++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x + i, y - i) === playerType) {
                        winningPattern.push({x: x + i, y: y - i});
                        
                        if (winningPattern.length === length) {
                            return winningPattern;
                        }
                    } else {
                        winningPattern = [];
                        continue diagonalCheck;
                    }
                }
            }
        }
        
        return null;
    }
    
    tryLoadDescendingWinningPattern(playerType, length) {
        
        const firstX = length - 1;
        const lastY = ROWS - length;
        let winningPattern = [];
        
        for (let y = ROWS - 1; y > lastY; y--) {
            diagonalCheck:
                    
            for (let x = firstX; x < COLUMNS; x++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x - i, y - i) === playerType) {
                        winningPattern.push({x: x - i, y: y - i});
                        
                        if (winningPattern.length === length) {
                            return winningPattern;
                        }
                    } else {
                        winningPattern = [];
                        continue diagonalCheck;
                    }
                }
            }
        }
        
        return null;
    }
    
    tryLoadHorizontalWinningPattern(playerType, length) {
        
        const lastX = COLUMNS - length;
        let winningPattern = [];
        
        for (let y = ROWS - 1; y >= 0; y--) {
            horizontalCheck:
                    
            for (let x = 0; x <= lastX; x++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x + i, y) === playerType) {
                        winningPattern.push({x: x + i, y: y});
                        
                        if (winningPattern.length === length) {
                            return winningPattern;
                        }
                    } else {
                        winningPattern = [];
                        continue horizontalCheck;
                    }
                }
            }
        }
        
        return null;
    }
    
    tryLoadVerticalWinningPattern(playerType, length) {
        
        const lastY = ROWS - length;
        let winningPattern = [];
        
        for (let x = 0; x < COLUMNS; x++) {
            verticalCheck:
                    
            for (let y = 0; y <= lastY; y++) {
                for (let i = 0; i < length; i++) {
                    if (this.get(x, y + i) === playerType) {
                        winningPattern.push({x: x, y: y + i});
                
                        if (winningPattern.length === length) {
                            return winningPattern;
                        }
                    } else {
                        winningPattern = [];
                        continue verticalCheck;
                    }
                }
            }
        }
        
        return null;
    }
};

class ConnectFourAlphaBetaPruningSearchEngine {
    #bestMoveState;
    #heuristicFunction;
    
    constructor(heuristicFunction) {
        this.#heuristicFunction = heuristicFunction;
    }
    
    getName() {
        return "Alpha-beta pruning";
    }
    
    search(root, depth, playerType = O) {
        this.#bestMoveState = null;
        
        this.#alphaBetaPruningRootImpl(root,
                                       depth,
                                       playerType);
        
        return this.#bestMoveState;
    }
    
    #alphaBetaPruningRootImpl(root, depth, playerType) {
        
        if (playerType === O) {
            
            // Try to maximize the value:
            let alpha = Number.MIN_SAFE_INTEGER;
            let value = Number.MIN_SAFE_INTEGER;
            let tentativeValue = Number.MIN_SAFE_INTEGER;
            
            for (const x of PLIES) {
                if (!root.makePly(x, O)) {
                    continue;
                }

                value = Math.max(value,
                                 this.#alphaBetaPruningImpl(
                                         root,
                                         depth - 1,
                                         alpha,
                                         Number.MAX_SAFE_INTEGER,
                                         X));
                
                if (tentativeValue < value) {
                    tentativeValue = value;
                    this.#bestMoveState = new ConnectFourBoard(root);
                }

                root.unmakePly(x);  
                
                alpha = Math.max(alpha, value);
            }
        } else {
            
            let beta  = Number.MAX_SAFE_INTEGER;
            let value = Number.MAX_SAFE_INTEGER;
            let tentativeValue = Number.MAX_SAFE_INTEGER;
            
            for (const x of PLIES) {
                if (!root.makePly(x, X)) {
                    continue;
                }

                value = Math.min(value,
                                 this.#alphaBetaPruningImpl(
                                         root,
                                         depth - 1,
                                         Number.MIN_SAFE_INTEGER,
                                         beta,
                                         O));

                if (tentativeValue > value) {
                    tentativeValue = value;
                    this.#bestMoveState = new ConnectFourBoard(root);
                }

                root.unmakePly(x);
                
                beta = Math.min(beta, value);
            }
        }
    } 
    
    #alphaBetaPruningImpl(state, 
                          depth, 
                          alpha,
                          beta, 
                          playerType) {

        if (depth === 0 || state.isTerminal()) {
            return heuristicFunction.evaluate(state, depth);
        }
        
        if (playerType === O) {
            let value = Number.MIN_SAFE_INTEGER;
            
            for (const x of PLIES) {
                if (!state.makePly(x, O)) {
                    continue;
                }
                
                value = Math.max(value, 
                                 this.#alphaBetaPruningImpl(state,
                                                            depth - 1,
                                                            alpha,
                                                            beta,
                                                            X));
                
                state.unmakePly(x);
                
                if (value > beta) {
                    break;
                }
                
                alpha = Math.max(alpha, value);
            }   
            
            return value;
        } else {
            let value = Number.MAX_SAFE_INTEGER;
            
            for (const x of PLIES) {
                if (!state.makePly(x, X)) {
                    continue;
                }
                
                value = Math.min(value,
                                 this.#alphaBetaPruningImpl(state,
                                                            depth - 1,
                                                            alpha,
                                                            beta,
                                                            O));
                
                state.unmakePly(x);
                
                if (value < alpha) {
                    break;
                }
                
                beta = Math.min(beta, value);
            }
            
            return value;
        }          
    }
}

class ConnectFourNegamaxSearchEngine {
    #heuristicFunction;
    
    constructor(heuristicFunction) {
        this.#heuristicFunction = heuristicFunction;
    }
    
    getName() {
        return "Negamax";
    }
    
    search(root, depth, playerType = O) {
        if (playerType === O) {
            return this.#negamaxRoot(root,
                                     depth,
                                     Number.MIN_SAFE_INTEGER,
                                     Number.MAX_SAFE_INTEGER,
                                     +1);
        } else {
            return this.#negamaxRoot(root,
                                     depth,
                                     Number.MIN_SAFE_INTEGER,
                                     Number.MAX_SAFE_INTEGER,
                                     -1);
        }
    }
    
    #negamaxRoot(root,
                 depth,
                 alpha,
                 beta,
                 color) {
        
        let value = Number.MIN_SAFE_INTEGER;
        let bestMoveState = null;
        
        for (const x of PLIES) {
            if (!root.makePly(x, color === 1 ? O : X)) {
                continue;
            }
            
            const score = -this.#negamax(root,
                                         depth - 1,
                                         -beta,
                                         -alpha,
                                         -color);  
                                         
            if (value < score) {
                value = score;
                bestMoveState = new ConnectFourBoard(root);
            }
            
            root.unmakePly(x);
            
            alpha = Math.max(alpha, value);
            
            if (alpha >= beta) {
                break;
            }
        }
        
        return bestMoveState;
    }
    
    #negamax(root, 
             depth,
             alpha,
             beta,
             color) {
        
        if (depth === 0 || root.isTerminal()) {
            return color * this.#heuristicFunction.evaluate(root, depth);
        }
        
        let value = Number.MIN_SAFE_INTEGER;
        
        for (const x of PLIES) {
            if (!root.makePly(x, color === 1 ? O : X)) {
                continue;
            }
            
            value = Math.max(
                        value,
                        -this.#negamax(root, 
                                       depth - 1, 
                                       -beta, 
                                       -alpha, 
                                       -color));
            
            root.unmakePly(x);
            
            alpha = Math.max(alpha, value);
            
            if (alpha >= beta) {
                break;
            }
        }
        
        return value;
    }
}

class ConnectFourPrincipalVariationSearchEngine {
    #heuristicFunction;
    
    constructor(heuristicFunction) {
        this.#heuristicFunction = heuristicFunction;
    }
    
    getName() {
        return "Principal variation search";
    }
    
    search(root, depth, playerType = O) {
        if (playerType === O) {
            return this.#pvsRoot(root,
                                 depth,
                                 Number.MIN_SAFE_INTEGER,
                                 Number.MAX_SAFE_INTEGER,
                                 +1);
        } else {
            return this.#pvsRoot(root,
                                 depth,
                                 Number.MIN_SAFE_INTEGER,
                                 Number.MAX_SAFE_INTEGER,
                                 -1);
        }
    }
    
    #pvsRoot(root,
             depth,
             alpha,
             beta,
             color) {
                 
        let value = Number.MIN_SAFE_INTEGER;
        let bestMoveState = null;
        
        for (const x of PLIES) {
            if (!root.makePly(x, color === 1 ? O : X)) {
                continue;
            }
            
            const score = -this.#pvs(root,
                                     depth - 1,
                                     -beta,
                                     -alpha,
                                     -color);
                                     
            if (value < score) {
                value = score;
                bestMoveState = new ConnectFourBoard(root);
            }
            
            root.unmakePly(x);
            
            alpha = Math.max(alpha, value);
            
            if (alpha >= beta) {
                break;
            }
        }
        
        return bestMoveState;
    }
    
    #pvs(root,
         depth,
         alpha,
         beta,
         color) {
    
        if (depth === 0 || root.isTerminal()) {
            return color * this.#heuristicFunction.evaluate(root, depth);
        }
        
        let isFirstState = true;
        
        for (const x of PLIES) {
            if (!root.makePly(x, color === 1 ? O : X)) {
                continue;
            }
            
            let score;

            if (isFirstState) {
                isFirstState = false;
                
                score = -this.#pvs(root, 
                                   depth - 1, 
                                   -beta, 
                                   -alpha, 
                                   -color);
                            
            } else {
                score = -this.#pvs(root, 
                                   depth - 1, 
                                   -alpha - 1, 
                                   -alpha, 
                                   -color);
                             
                if (alpha < score && score < beta) {
                    score = -this.#pvs(root, 
                                       depth - 1,
                                       -beta,
                                       -alpha, 
                                       -color);
                }
            }
            
            root.unmakePly(x);
            
            alpha = Math.max(alpha, score);
            
            if (alpha >= beta) {
                break;
            }
        }
        
        return alpha;
    }
}