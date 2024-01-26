let startButton;

function setupMenu() {
  startButton = createButton('Start Game');
  startButton.position(width / 2 - 60, height / 2);
  startButton.mousePressed(startGame);
}

function drawMenu() {
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Fox\'s Dash Run', width / 2, height / 4);
  textSize(16);
  text('Made by Fox Studios - Scratch™', width / 2, height / 3);

  // Ensure the "Start Game" button is displayed during the menu
  if (!startButton) {
    setupMenu();
  }
}
