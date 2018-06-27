const width = 5;
const height = 4;
const cardSize = 120;

let board;
let firstCard = null;
let secondCard = null;

let fails = 0;
let complete = 0;

function Card(letter) {
    this.letter = letter;
    this.shown = false;
    this.finished = false;
}

function setup() {
    createCanvas(width * cardSize, height * cardSize + 30);
    generateBoard();
}

function generateBoard() {
    fails = 0;
    complete = 0;

    board = new Array(width);
    for (let i = 0; i < width; i++) {
        board[i] = new Array(height);
    }

    let cardsLeft = width * height;
    let lastLetter = 0;

    while (cardsLeft > 0) {
        let x = floor(random(width));
        let y = floor(random(height));
        if (board[x][y] === undefined) {
            if (cardsLeft % 2 === 0) {
                lastLetter++;
            }
            board[x][y] = new Card(String(lastLetter));
            cardsLeft--;
        }
    }
}

function draw() {
    background(255);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            var card = board[i][j];

            if (card.shown) {
                if (card.finished) {
                    fill(0, 255, 0);
                } else {
                    fill(255);
                }
            } else {
                fill(200);
            }

            stroke(0);
            strokeWeight(2);
            rect(i * cardSize, j * cardSize, cardSize, cardSize);

            if (card.shown) {
                fill(0);
                textAlign(CENTER, CENTER);
                textSize(50);
                text(card.letter, i * cardSize + cardSize / 2, j * cardSize + cardSize / 2);
            }
        }
    }

    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(30);
    text('Fails: ' + fails, 0, cardSize * height + 20);

    if (complete >= width * height / 2) {
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(100);
        text('You did it!', cardSize * width / 2, cardSize * height / 2);
    }
}

function mousePressed() {
    if (complete >= width * height / 2) {
        generateBoard();
        return;
    }

    if (firstCard !== null && secondCard !== null) {
        firstCard.shown = false;
        secondCard.shown = false;
        firstCard = null;
        secondCard = null;

        fails++;
        return;
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let x = i * cardSize;
            let y = j * cardSize;

            if (mouseX >= x && mouseX < x + cardSize && mouseY >= y && mouseY < y + cardSize) {
                var card = board[i][j];
                if (!card.shown && !card.finished) {
                    card.shown = true;

                    if (firstCard === null) {
                        firstCard = card;
                    } else {
                        if (secondCard === null) {
                            secondCard = card;

                            if (firstCard.letter === secondCard.letter) {
                                firstCard.finished = true;
                                secondCard.finished = true;

                                complete++;

                                firstCard = null;
                                secondCard = null;
                            }
                        }
                    }
                }
            }
        }
    }
}