//class ParallelConnectFourSearchEngine {
//    
//    static #MINIMUM_SEED_DEPTH = 2;
//    static #DEFAULT_SEED_DEPTH = 2;
//    static #MINIMUM_DEPTH = 5;
//    
//    #heuristicFunction;
//    #requestedDepth;
//    #seedDepth;
//    
//    constructor() {
//        this.#heuristicFunction = arguments[0];
//        this.#seedDepth         = arguments[1];
//    }
//    
//    search(root, depth, playerType = O) {
//        if (!typeof(Worker) === undefined) {
//            
//            console.log("Web Worker API not supported.");
//            console.log("Delegating to the searial AI.");
//            
//            return new ConnectFourAlphaBetaPruningSearchEngine(
//                    this.#heuristicFunction)
//                    .search(root, 
//                            depth, 
//                            playerType);
//        }
//        
//        let bestMoveState = null;
//        
//        this.#requestedDepth = depth;
//        
//        if (depth < ParallelConnectFourSearchEngine.#MINIMUM_DEPTH) {
//            // If too shallow, delegate to the serial AI bot:
//            return new ConnectFourAlphaBetaPruningSearchEngine(
//                    this.#heuristicFunction)
//                    .search(root, depth);
//        }
//        
//        // Obtain the list of seed states. May lower the 'seedDepth':
//        const seedStates = getSeedStates(root, playerType);
//        
//        // Randomly shuffle the seed states. This is a trivial load balancing:
//        ParallelConnectFourSearchEngine.#shuffleArray(seedStates);
//        
//        const threadLoads = 
//                ParallelConnectFourSearchEngine.#bucketizeSeedStates(
//                seedStates,
//                navigator.hardwareConcurrency);
//        
//        const 
//        
//        return bestMoveState;
//    }
//    
//    static #bucketizeSeedStates(seedStates, cores) {
//        // Construct a list with capacity sufficient to accommodate all the
//        // buckets:
//        const threadBuckets = new Array(cores);
//        
//        // The basic number of seed states per thread bucket:
//        const basicNumberOfSeedsPerBucket = seedStates.size() / cores;
//        
//        // The seed state index:
//        let index = 0;
//        
//        for (let i = 0; i < cores; i++) {
//            // Construct the new bucket. +1 in order to add additional possible
//            // seed state in case 'threadCount' does not divide
//            // 'seedStates.size()':
//            const bucket = new Array(basicNumberOfSeedsPerBucket + 1);
//            
//            // Load the current bucket:
//            for (let j = 0; j < basicNumberOfSeedsPerBucket; j++, index++) {
//                bucket.push(seedStates[index]);
//            }
//            
//            // Add the bucket to the bucket list:
//            threadBuckets.push(bucket);
//        }
//        
//        // How many threads should receive one more additional seed state?
//        const remainingStates = seedStates.size() % cores;
//        
//        for (let i = 0; i < remainingStates; i++, index++) {
//            threadBuckets[i].push(seedStates[index]);
//        }
//        
//        return threadBuckets;
//    }
//    
//    static #getSeedStates(root, playerType) {
//        const levelA = [];
//        const levelB = [];
//        
//        // Initialize the expansion:
//        levelA.push(root);
//        
//        let effectiveSeedDepth = 0;
//        
//        for (let i = 0; i < this.#seedDepth; i++) {
//            // Load next state layer:
//            for (const cfb of levelA) {
//                levelB.push(cfb.expand(playerType));
//            }
//            
//            if (levelB.length !== 0) {
//                effectiveSeedDepth++;
//            } else {
//                // Once here, the root state is missing very few plies:
//                this.#seedDepth = effectiveSeedDepth;
//                return levelA;
//            }
//            
//            levelA = [];
//            levelA.push(levelB);
//            levelB = [];
//            
//            // Assume the opposite player:
//            playerType = ParallelConnectFourSearchEngine.#flipPlayer(playerType);
//        }
//        
//        return levelA;
//    }
//    
//    static #flipPlayer(playerType) {
//        if (playerType === X) {
//            return O;
//        } else {
//            return X;
//        }
//    }
//    
//    static #shuffleArray(array) {
//        let currentIndex = array.length;
//
//        // While there remain elements to shuffle...
//        while (currentIndex !== 0) {
//            // Pick a remaining element...
//            let randomIndex = Math.floor(Math.random() * currentIndex);
//            currentIndex--;
//
//            // And swap it with the current element.
//            [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex], array[currentIndex]];
//        }
//    }
//}