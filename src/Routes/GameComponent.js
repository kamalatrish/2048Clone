import React from 'react';
export default class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
            score: 0,
            bestScore: localStorage.getItem("bestScore") || 0
        }
    }

    generateRandom = (dataVal) => {
        if (!dataVal) {
            return;
        }
        else {
            if (dataVal) {
                let randomkey1 = Math.floor(Math.random() * 3)
                let randomkey2 = Math.floor(Math.random() * 3)
                let options = [2, 4]
                if (dataVal[randomkey1][randomkey2] == "") {
                    dataVal[randomkey1][randomkey2] = options[Math.floor(Math.random() * 2)]
                }
                else {
                    this.generateRandom(dataVal)
                }
            }
        }
        return dataVal;
    }


    resetGame = () => {
        let dataDef = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
        this.setState({
            data: this.generateRandom(dataDef),
            score: 0
        })
    }

    calculateGameOver = (oldScore) => {
        let emptyArray = this.state.data.find(element => (element.find(item => item != "")))
        if (emptyArray.length == 16) {
            alert("Game Over")
        }
    }
    componentDidMount() {
        this.setState({
            data: this.generateRandom(this.state.data)
        })
        document.onkeydown = (e) => {
            e.preventDefault()
            let score = this.state.score
            let oldScore = this.state.score
            let dataVal = [...this.state.data];
            console.log("this.state.dataupupup", this.state.data)
            switch (e.keyCode) {
                case 37: // left arrow
                    for (let i = 0; i < dataVal.length; i++) {
                        let fiterElementsTotal = dataVal[i].filter(e => e != "")
                        console.log(fiterElementsTotal)
                        if (fiterElementsTotal.length == 1) {
                            dataVal[i] = [fiterElementsTotal[0], "", "", ""]
                        }
                        if (fiterElementsTotal.length == 2) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1]) {
                                dataVal[i] = [fiterElementsTotal[0] * 2, "", "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else {
                                dataVal[i] = [fiterElementsTotal[0], fiterElementsTotal[1], "", ""]
                            }
                        }
                        if (fiterElementsTotal.length == 3) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2]) { // 222
                                dataVal[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1], "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[0] != fiterElementsTotal[2]) { // 224
                                dataVal[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1], "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[0] != fiterElementsTotal[1]) { // 422
                                dataVal[i] = [fiterElementsTotal[0], fiterElementsTotal[1] * 2, "", ""]
                                score = score + fiterElementsTotal[1] * 2
                            } // do nothing for 242
                            else {
                                dataVal[i] = [fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2], ""]
                            }
                        }
                        if (fiterElementsTotal.length == 4) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2222
                                dataVal[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1] * 2, "", ""]
                                score = score + fiterElementsTotal[0] * 2 + fiterElementsTotal[1] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[2] != fiterElementsTotal[3]) { // 2224 // 2242
                                dataVal[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[2], fiterElementsTotal[3], ""]
                                score = fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] != fiterElementsTotal[1] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2422 // 4222
                                if (fiterElementsTotal[1] == fiterElementsTotal[2]) { // 4222
                                    dataVal[i] = [fiterElementsTotal[0], fiterElementsTotal[1] * 2, fiterElementsTotal[3], ""]
                                    score = score + fiterElementsTotal[1] * 2
                                }
                                else { // 2422
                                    dataVal[i] = [fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2] * 2, ""]
                                    score = score + fiterElementsTotal[2] * 2
                                }
                            }
                        }
                    }
                    break;
                case 38: //'Up Key pressed!'
                    let dataUp = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
                    console.log("dataVal", dataVal)
                    dataVal = [...this.state.data]
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            dataUp[j][i] = dataVal[i][j]
                        }
                    }
                    dataUp = [...dataUp]
                    for (let i = 0; i < dataUp.length; i++) {
                        let fiterElementsTotal = dataUp[i].filter(e => e != "")
                        console.log(fiterElementsTotal)
                        if (fiterElementsTotal.length == 1) {
                            dataUp = [...dataUp]
                            dataUp[i] = [fiterElementsTotal[0], "", "", ""]
                        }
                        if (fiterElementsTotal.length == 2) {
                            dataUp = [...dataUp]
                            if (fiterElementsTotal[0] == fiterElementsTotal[1]) {
                                dataUp[i] = [fiterElementsTotal[0] * 2, "", "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else {
                                dataUp[i] = [fiterElementsTotal[0], fiterElementsTotal[1], "", ""]
                            }
                        }
                        if (fiterElementsTotal.length == 3) {
                            dataUp = [...dataUp]
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2]) { // 222
                                dataUp[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1], "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[0] != fiterElementsTotal[2]) { // 224
                                dataUp[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1], "", ""]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[0] != fiterElementsTotal[1]) { // 422
                                dataUp[i] = [fiterElementsTotal[0], fiterElementsTotal[1] * 2, "", ""]
                                score = score + fiterElementsTotal[1] * 2
                            } // do nothing for 242
                            else {
                                dataUp[i] = [fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2], ""]
                            }
                        }
                        if (fiterElementsTotal.length == 4) {
                            dataUp = [...dataUp]
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2222
                                dataUp[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[1] * 2, "", ""]
                                score = score + fiterElementsTotal[0] * 2 + fiterElementsTotal[1] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[2] != fiterElementsTotal[3]) { // 2224 // 2242
                                dataUp[i] = [fiterElementsTotal[0] * 2, fiterElementsTotal[2], fiterElementsTotal[3], ""]
                                score = fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] != fiterElementsTotal[1] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2422 // 4222
                                if (fiterElementsTotal[1] == fiterElementsTotal[2]) { // 4222
                                    dataUp[i] = [fiterElementsTotal[0], fiterElementsTotal[1] * 2, fiterElementsTotal[3], ""]
                                    score = score + fiterElementsTotal[1] * 2
                                }
                                else { // 2422
                                    dataUp[i] = [fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2] * 2, ""]
                                    score = score + fiterElementsTotal[2] * 2
                                }
                            }
                        }
                    }
                    dataVal = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            dataVal[j][i] = dataUp[i][j]
                        }
                    }
                    break;
                case 39: // right
                    for (let i = 0; i < dataVal.length; i++) {
                        let fiterElementsTotal = dataVal[i].filter(e => e != "")
                        if (fiterElementsTotal.length == 1) {
                            dataVal[i] = ["", "", "", fiterElementsTotal[0]]
                        }
                        if (fiterElementsTotal.length == 2) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1]) {
                                dataVal[i] = ["", "", "", fiterElementsTotal[0] * 2]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else {
                                dataVal[i] = ["", "", fiterElementsTotal[0], fiterElementsTotal[1]]
                            }
                        }
                        if (fiterElementsTotal.length == 3) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2]) { // 222
                                dataVal[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1]]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[0] != fiterElementsTotal[2]) { // 224
                                dataVal[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1]]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[0] != fiterElementsTotal[1]) { // 422
                                dataVal[i] = ["", "", fiterElementsTotal[0], fiterElementsTotal[1] * 2]
                                score = score + fiterElementsTotal[1] * 2
                            } // do nothing for 242
                            else {
                                dataVal[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2]]
                            }
                        }
                        if (fiterElementsTotal.length == 4) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2222
                                dataVal[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1] * 2]
                                score = score + fiterElementsTotal[0] * 2 + fiterElementsTotal[1] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[2] != fiterElementsTotal[3]) { // 2224 // 2242
                                dataVal[i] = ["", fiterElementsTotal[0] * 2, fiterElementsTotal[2], fiterElementsTotal[3]]
                                score = fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] != fiterElementsTotal[1] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2422 // 4222
                                if (fiterElementsTotal[1] == fiterElementsTotal[2]) { // 4222
                                    dataVal[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1] * 2, fiterElementsTotal[3]]
                                    score = score + fiterElementsTotal[1] * 2
                                }
                                else { // 2422
                                    dataVal[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2] * 2]
                                    score = score + fiterElementsTotal[2] * 2
                                }
                            }
                        }
                    }
                    break;
                case 40: // down

                    var dataDown = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
                    console.log("dataVal", dataVal)
                    dataVal = [...this.state.data]
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            dataDown[j][i] = dataVal[i][j]
                        }
                    }

                    for (let i = 0; i < dataDown.length; i++) {
                        let fiterElementsTotal = dataDown[i].filter(e => e != "")
                        if (fiterElementsTotal.length == 1) {
                            dataDown[i] = ["", "", "", fiterElementsTotal[0]]
                        }
                        if (fiterElementsTotal.length == 2) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1]) {
                                dataDown[i] = ["", "", "", fiterElementsTotal[0] * 2]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else {
                                dataDown[i] = ["", "", fiterElementsTotal[0], fiterElementsTotal[1]]
                            }
                        }
                        if (fiterElementsTotal.length == 3) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2]) { // 222
                                dataDown[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1]]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[0] != fiterElementsTotal[2]) { // 224
                                dataDown[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1]]
                                score = score + fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[0] != fiterElementsTotal[1]) { // 422
                                dataDown[i] = ["", "", fiterElementsTotal[0], fiterElementsTotal[1] * 2]
                                score = score + fiterElementsTotal[1] * 2
                            } // do nothing for 242
                            else {
                                dataDown[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2]]
                            }
                        }
                        if (fiterElementsTotal.length == 4) {
                            if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[1] == fiterElementsTotal[2] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2222
                                dataDown[i] = ["", "", fiterElementsTotal[0] * 2, fiterElementsTotal[1] * 2]
                                score = score + fiterElementsTotal[0] * 2 + fiterElementsTotal[1] * 2
                            }
                            else if (fiterElementsTotal[0] == fiterElementsTotal[1] && fiterElementsTotal[2] != fiterElementsTotal[3]) { // 2224 // 2242
                                dataDown[i] = ["", fiterElementsTotal[0] * 2, fiterElementsTotal[2], fiterElementsTotal[3]]
                                score = fiterElementsTotal[0] * 2
                            }
                            else if (fiterElementsTotal[0] != fiterElementsTotal[1] && fiterElementsTotal[2] == fiterElementsTotal[3]) { // 2422 // 4222
                                if (fiterElementsTotal[1] == fiterElementsTotal[2]) { // 4222
                                    dataDown[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1] * 2, fiterElementsTotal[3]]
                                    score = score + fiterElementsTotal[1] * 2
                                }
                                else { // 2422
                                    dataDown[i] = ["", fiterElementsTotal[0], fiterElementsTotal[1], fiterElementsTotal[2] * 2]
                                    score = score + fiterElementsTotal[2] * 2
                                }
                            }
                        }
                    }
                    dataVal = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            dataVal[j][i] = dataDown[i][j]
                        }
                    }

                    break;
            }
            debugger;
            if (!(JSON.stringify(dataVal) === JSON.stringify(this.state.data))) {
                dataVal = this.generateRandom(dataVal)
            }
            this.setState({
                data: dataVal,
                score,
                bestScore: score > this.state.bestScore ? score : this.state.bestScore
            }, () => {
                localStorage.setItem("bestScore", this.state.bestScore)
                if (oldScore == score) {
                    this.calculateGameOver(oldScore)
                }
            })
        }
    }

    render() {
        return (
            <div className="centerTab">
                <div>
                    <span className="score">Score : {this.state.score}</span>
                    <span className="score">Best : {this.state.bestScore}</span>
                </div>

                <table>
                    {this.state.data.map((item, index) => {
                        return (
                            <tr>
                                {item.map((dataVal, index2) => {
                                    return (
                                        <td id={index + "_" + index2} className={"mark" + dataVal}>
                                            <h2 className="innerBlack">{dataVal}</h2>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </table>

                <div className="button-container">
                    Join the numbers and get to the 2048 tile !  <button id="new-game" onClick={() => this.resetGame()}>New Game</button>
                </div>
                <div className="instructions">
                    <p>Use your arrow keys to make all the tiles fall left, right, up, or down.When two tiles with the same number collide, the numbers add together and they merge into one tile.</p>
                </div>
            </div>
        );
    }
}