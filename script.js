'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');

const curScore0Element = document.querySelector('#current--0');
const curScore1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, gameIsActive;

// Starting conditions
const gameInitialize = () =>
{
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameIsActive = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  curScore0Element.textContent = 0;
  curScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

};
gameInitialize();

const switchingPlayer = () =>
{
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
const maxDiceValue = 6;
btnRoll.addEventListener('click', () =>
{
  if (gameIsActive)
  {
    const dice = Math.trunc(Math.random() * maxDiceValue) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    if (dice !== 1)
    {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else
    {
      // Switching to next player
      switchingPlayer();
    }
  }
});

const winningScore = 100;
btnHold.addEventListener('click', () =>
{
  if (gameIsActive)
  {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= winningScore)
    {
      // Finishing the game
      gameIsActive = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else
    {
      switchingPlayer();
    }
  }
});
btnNew.addEventListener('click', gameInitialize);
