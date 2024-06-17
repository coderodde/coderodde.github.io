//const COLUMNS = 7;
//
//function alphaBetaPruningImplRoot(root, 
//                                  seedHeuristicFunction,
//                                  depth,
//                                  playerType) {
//    let bestMoveState = null;
//    
//    if (playerType === O) {
//        let alpha = Number.NEGATIVE_INFINITY;
//        let value = Number.NEGATIVE_INFINITY;
//        let tentativeValue = Number.NEGATIVE_INFINITY;
//        
//        for (let x = 0; x < COLUMNS; x++) {
//            if (!root.makePly(x, O)) {
//                // The entire column at X=x is full. Omit.
//                continue;
//            }
//            
//            value = Math.max(value,
//                             alphaBetaPruningImplAboveSeedLayer(
//                                     root,
//                                     depth - 1,
//                                     alpha,
//                                     Number.POSITIVE_INFINITY,
//                                     X,
//                                     seedHeuristicFunction));
//                                     
//            if (tentativeValue < value) {
//                tentativeValue = value;
//                bestMoveState = new ConnectFourBoard(root);
//            }
//            
//            // Undo the previously make ply:
//            root.unmakePly(x);
//            
//            alpha = Math.max(alpha, value);
//            
//        }
//        
//        return bestMoveState;
//    } else {
//        
//        let beta  = Number.POSITIVE_INFINITY;
//        let value = Number.POSITIVE_INFINITY;
//        let tentativeValue = Number.POSITIVE_INFINITY;
//        
//        for (let x = 0; x < COLUMNS; x++) {
//            // Try to make a ply at column 'x':
//            if (!root.makePly(x, O)) {
//                // The entire column at X=x is full. Omit.
//                continue;
//            }
//
//            value = Math.min(value,
//                             alphaBetaPruningImplAboveSeedLayer(
//                                    root,
//                                    depth - 1,
//                                    Number.NEGATIVE_INFINITY,
//                                    beta,
//                                    O,
//                                    seedHeuristicFunction));
//
//            if (tentativeValue > value) {
//                tentativeValue = value;
//                bestMoveState = new ConnectFourBoard(root);
//            }
//
//            // Undo the previously made ply:
//            root.unmakePly(x);
//
//            // Possibly lower beta:
//            beta = Math.min(beta, value);
//        }
//        
//        return bestMoveState;
//    }
//}
//
//function alphaBetaPruningImplAboveSeedLayer(root,
//                                            depth,
//                                            alpha,
//                                            beta,
//                                            playerType,
//                                            heuristicFunction,
//                                            seedStateHeuristicFunction) {
//        
//    if (depth === 0 || root.isTerminal()) {
//        // Once here, we have a loss, victory or tie:
//        return heuristicFunction.evaluate(root, depth);
//    }
//
//    if (requestedDepth - depth == seedDepth) {
//        // Once here, we have reached the seed level.
//        // 0 as the second argument is ignored. Just return the
//        // score for 'root' as we have computed its score in a 
//        // thread:
//        return seedStateHeuristicFunction.evaluate(root, 0);
//    }
//
//    if (playerType === O) {
//        let value = Double.NEGATIVE_INFINITY;
//
//        for (let x = 0; x < COLUMNS; x++) {
//            if (!root.makePly(x, O)) {
//                continue;
//            }
//
//            value = Math.max(value, 
//                             alphaBetaImplAboveSeedLayer(
//                                     root,
//                                     depth - 1,
//                                     alpha,
//                                     beta,
//                                     X,
//                                     heuristicFunction,
//                                     seedStateHeuristicFunction));
//            root.unmakePly(x);
//
//            if (value > beta) {
//                break;
//            }
//
//            alpha = Math.max(alpha, value);
//        }   
//
//        return value;
//    } else {
//        let value = Double.POSITIVE_INFINITY;
//
//        for (let x = 0; x < COLUMNS; x++) {
//            if (!root.makePly(x, X)) {
//                continue;
//            }
//
//            value = Math.min(value,
//                             alphaBetaImplAboveSeedLayer(
//                                     root,
//                                     depth - 1,
//                                     alpha,
//                                     beta,
//                                     O,
//                                     heuristicFunction,
//                                     seedStateHeuristicFunction));
//            root.unmakePly(x);
//
//            if (value < alpha) {
//                break;
//            }
//
//            beta = Math.min(beta, value);
//        }
//
//        return value;
//    }
//}
//
//function alphaBetaImpl(root,
//                       depth,
//                       alpha,
//                       beta,
//                             final PlayerType rootPlayerType) {
//
//    if (depth == 0 || root.isTerminal()) {
//        return heuristicFunction.evaluate(root, depth);
//    }
//
//    if (rootPlayerType == PlayerType.MAXIMIZING_PLAYER) {
//        double value = Double.NEGATIVE_INFINITY;
//
//        for (int x = 0; x < COLUMNS; x++) {
//            if (!root.makePly(x, PlayerType.MAXIMIZING_PLAYER)) {
//                continue;
//            }
//
//            value = Math.max(value, 
//                             alphaBetaImpl(root,
//                                           depth - 1,
//                                           alpha,
//                                           beta,
//                                           PlayerType.MINIMIZING_PLAYER));
//
//            root.unmakePly(x);
//
//            if (value > beta) {
//                break;
//            }
//
//            alpha = Math.max(alpha, value);
//        }   
//
//        return value;
//    } else {
//        double value = Double.POSITIVE_INFINITY;
//
//        for (int x = 0; x < COLUMNS; x++) {
//            if (!root.makePly(x, PlayerType.MINIMIZING_PLAYER)) {
//                continue;
//            }
//
//            value = Math.min(value,
//                             alphaBetaImpl(root,
//                                           depth - 1,
//                                           alpha,
//                                           beta,
//                                           PlayerType.MAXIMIZING_PLAYER));
//
//            root.unmakePly(x);
//
//            if (value < alpha) {
//                break;
//            }
//
//            beta = Math.min(beta, value);
//        }
//
//        return value;
//    }
//}