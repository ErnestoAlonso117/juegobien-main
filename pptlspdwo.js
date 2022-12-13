
class pptlspdwoGame {
    constructor(p1,p2) {
        this._players = [p1, p2];
        this._turns =[null, null];
        
        this._sendToPlayers('Inicia la Partida de PPTLSPDWO');
        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this._onTurn(idx, turn);
            });
        });
    }
    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg)
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }

    _onTurn(playerIndex, turn){
        this._turns[playerIndex] = turn;
        this._sendToPlayer(playerIndex,`<h2> Ha selecionado: ${turn} </h2>`);
        this._checkGameOver();
    }
    

    _checkGameOver(){
        const turns = this._turns;

        if(turns[0] && turns[1]) {
            this._sendToPlayers('Juego Terminado -- ' + turns.join (' : '));
            this._getGameResult();
            this._turns = [null, null];
            this._sendToPlayers('Proximo Round !!!');
        }
    }
    _getGameResult() {
        const p1 = this._decodeTurn(this._turns[0]);
        const p2 = this._decodeTurn(this._turns[1]);

        switch (p1) {
            case 0:
                switch(p2) {
                    case 0: 
                    this._sendToPlayers('EMPATE, Tropas Aliadas! Salve el Emperador');
                    break;
                    case 1:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 2:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 3:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 4:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                }
                break;
            case 1 :
                switch(p2) {
                    case 0: 
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 1:
                    this._sendToPlayers('EMPATE, Tropas Aliadas! La galaxia es solo la entrada.')
                    break;
                    case 2:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 3:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 4:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                }
                break;
            case 2 :
                switch(p2) {
                    case 0: 
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 1:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 2:
                    this._sendToPlayers('EMPATE, Tropas Aliadas! Que el bien supremo nos guie.')
                    break;
                    case 3:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 4:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                }
                break;
            case 3:
                switch(p2) {
                    case 0: 
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 1:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 2:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 3:
                    this._sendToPlayers('EMPATE, Tropas Aliadas! Simio no mata Simio, Kai no mata Kai.')
                    break;
                    case 4:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                }
                break;
            case 4:
                switch(p2) {
                    case 0: 
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 1:
                    this._sendWinMessage(this._players[1], this._players[0]);
                    break;
                    case 2:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 3:
                    this._sendWinMessage(this._players[0], this._players[1]);
                    break;
                    case 4:
                    this._sendToPlayers('EMPATE, Tropas Aliadas! Estaremos bien mientras nadie diga Angron.');
                    break;
                }
        }
    }
    _sendWinMessage(winner, looser) {
        winner.emit('message', 'Ganaste, bien hecho mirey.')
        looser.emit('message', 'Perdiste, jaja que tonto.');
    }
    _decodeTurn(turn) {

        switch (turn) {
            case 'GuardiaImperial':
                console.log(0);
                return 0;
            case 'Tyranido':
                console.log(1);
                return 1;
            case 'GuerreroTau': 
                console.log(2);
                return 2;
            case 'GuerreroKai':
                console.log(3);
                return 3;
            case 'MarineDelCaos':
                console.log(4);
                return 4;
            default:
                throw new Error(`Could not decode turn ${turn}`);
        }
    }


}

module.exports = pptlspdwoGame;