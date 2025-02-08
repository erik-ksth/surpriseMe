import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { categories } from '../data/choices';
import { useChoices } from '../context/ChoicesContext';
import DinnerSelection from './DinnerSelection';
import SoundManager from '../utils/sounds';
import './OutfitSelection.css';

const OutfitSelection = () => {
     const [flippedCard, setFlippedCard] = useState<number | null>(null);
     const [showDinner, setShowDinner] = useState(false);
     const outfitCategory = categories.find(cat => cat.name === "Outfit")!;
     const { setOutfitChoice } = useChoices();

     // Randomly shuffle the choices
     const shuffledChoices = useMemo(() => {
          return Math.random() > 0.5 ? [...outfitCategory.choices] : [...outfitCategory.choices].reverse();
     }, [outfitCategory.choices]);

     const handleCardClick = (outfitId: number) => {
          if (flippedCard === null) {
               setFlippedCard(outfitId);
               const selectedOutfit = outfitCategory.choices.find(outfit => outfit.id === outfitId);
               if (selectedOutfit) {
                    setOutfitChoice(selectedOutfit);
                    SoundManager.playSound('cardFlip');
               }
          }
     };

     const handleNextClick = () => {
          SoundManager.playSound('transition');
          setShowDinner(true);
     };

     if (showDinner) {
          return <DinnerSelection />;
     }

     return (
          <div className="app-container">
               <motion.div
                    className="outfit-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
               >
                    <h1>Perfect! 🥰</h1>
                    <p>Pick a card to see what you should wear!</p>

                    <div className="outfit-grid">
                         {shuffledChoices.map((outfit, index) => (
                              <motion.div
                                   key={outfit.id}
                                   className={`card-container ${flippedCard === outfit.id ? 'flipped' : ''} ${flippedCard !== null && flippedCard !== outfit.id ? 'disabled' : ''}`}
                                   onClick={() => handleCardClick(outfit.id)}
                                   whileHover={flippedCard === null ? { scale: 1.05 } : {}}
                                   whileTap={flippedCard === null ? { scale: 0.95 } : {}}
                                   initial={{
                                        opacity: 0,
                                        x: index === 0 ? -100 : 100
                                   }}
                                   animate={{
                                        opacity: flippedCard !== null && flippedCard !== outfit.id ? 0.5 : 1,
                                        scale: flippedCard !== null && flippedCard !== outfit.id ? 0.95 : 1,
                                        x: 0,
                                        transition: { duration: 0.5 }
                                   }}
                              >
                                   <div className="card">
                                        <div className="card-front">
                                             <div className="card-content">
                                                  <span className="question-mark">?</span>
                                                  <p>Click to reveal</p>
                                             </div>
                                        </div>
                                        <div className="card-back">
                                             <img src={outfit.imageUrl} alt={outfit.title} />
                                             <p>{outfit.title}</p>
                                        </div>
                                   </div>
                              </motion.div>
                         ))}
                    </div>

                    <AnimatePresence>
                         {flippedCard && (
                              <motion.div
                                   className="next-button-container"
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 20 }}
                                   transition={{ duration: 0.5 }}
                              >
                                   <motion.button
                                        className="button next-button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleNextClick}
                                   >
                                        Next Step →
                                   </motion.button>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </motion.div>
          </div>
     );
};

export default OutfitSelection; 