import { useState } from 'react';
import './App.css';

const chanceCards = [
  'Speeding fine £15.',
  'Bank pays you dividend of £50.',
  'Advance to Trafalgar Square. If you pass GO collect £200.',
  'Advance to GO.',
  'Pay school fees of £150.',
  'Advance to Mayfair.',
  '‘Get out of Jail Free’ Key.',
  'You are assessed for street repairs. £40 per house, £115 per hotel.',
  'Make general repairs on all of your buildings. For each house pay £25. For each hotel pay £100.',
  'Advance to Pall Mall. If you pass GO collect £200.',
  'Take a trip to Marylebone Station. If you pass GO collect £200.',
  'You building loan matures. Receive £150.',
  'GO TO JAIL.',
  'Go back three spaces.',
  '‘Drunk in charge’. Find £20.',
  'You have won a crossword competition. Collect £100.',
];

const communityChestCards = [
  'Bank error in your favour. Collect £200.',
  'Pay hospital £100.',
  'You have won second prize in a beauty contest. Collect £10.',
  'Income tax refund. Collect £20.',
  'Pay a £10 fine of take a CHANCE.',
  'Pay your insurance premium £50.',
  'From sale of stock you get £50.',
  'Receive interest on 7% preference shares £25.',
  'Advance to GO.',
  'Go back to Old Kent Road.',
  '‘Get out of Jail Free’ Key.',
  'It is your birthday. Collect £10 from each player.',
  'Doctor’s fee. Pay £50.',
  'Annuity matures. Collect £100.',
  'GO TO JAIL.',
  'You inherit £100.',
];

function shuffle(array: string[]) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

shuffle(chanceCards);
shuffle(communityChestCards);

function App() {
  const [cardType, setCardType] = useState<'CHANCE' | 'COMMUNITY CHEST'>()
  const [chanceCardIndex, setChanceCardIndex] = useState(0)
  const [communityChestCardIndex, setCommunityChestCardIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState<string>()

  const pickCard = (type: 'CHANCE' | 'COMMUNITY CHEST') => {
    setCardType(type)

    if (type === 'CHANCE') {
      setCurrentCard(chanceCards[chanceCardIndex])
      setChanceCardIndex(chanceCardIndex + 1 === chanceCards.length ? 0 : chanceCardIndex + 1)
    } else {
      setCurrentCard(communityChestCards[communityChestCardIndex])
      setCommunityChestCardIndex(communityChestCardIndex + 1 === communityChestCards.length ? 0 : communityChestCardIndex + 1)
    }
  }

  const returnCard = () => {
    setCardType(undefined)
    setCurrentCard(undefined)
  }

  return (
    <div className="main">
      <div className="cardPile cardPile--chance" onClick={() => pickCard('CHANCE')}>CHANCE</div>
      <div className="cardPile cardPile--communityChest" onClick={() => pickCard('COMMUNITY CHEST')}>COMMUNITY CHEST</div>
      {cardType && currentCard && (
        <div className={`card card--${cardType === 'CHANCE' ? 'chance' : 'communityChest'}`}>
          <div className="card__close" onClick={returnCard}></div>
          <div className="card__border">
            <div className="card__type">{cardType}</div>
            <div className="card__description">{currentCard}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
