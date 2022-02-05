... to practice three interesting aspects of Software Engineering: 
1. Develop highly interactive game interface in React, flavoured with nice animations.
2. Explore some back-end tech, like Node.js, Express and WebSocket, to provide online two-player game mode.
3. Create code-breaking heuristic algorithm for AI (which turned out to be tought challenge).

44: Code Breaking Game 
is a variation of Bulls and Cows code-breaking paper and pencil game for two or more players, predating the commercially marketed board game Mastermind.

The game is played in turns by two opponents who aim to decipher the other's secret code by trial and error.

Each player picks a 4-digit secret number. The digits must be all different. 
Then, in turn, the players try to guess their opponent's number who in return provides the number of matches in 2-digit format. 
The first digit provides information about how many digits from player guess match opponent secret number.
The second digit - how many digits from player guess match their right positions in secret number.

The first player to reveal the other's secret number (get 44 in response to his guess) wins the game.

It is proved that any number can be solved within seven turns.

Because the game has simple rules while still being difficult and entertaining, there are many computer variants.
A computer program "moo", written in 1970 by J. M. Grochow at MIT, was among the first Bulls and Cows computer implementations.