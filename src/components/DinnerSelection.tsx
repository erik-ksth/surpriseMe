import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { categories } from '../data/choices';
import { useChoices } from '../context/ChoicesContext';
import MovieSelection from './MovieSelection';
import './DinnerSelection.css';

const DinnerSelection = () => {
     const [flippedCard, setFlippedCard] = useState<number | null>(null);
     const [showMovie, setShowMovie] = useState(false);
     const dinnerCategory = categories.find(cat => cat.name === "Dinner")!;
     const { setDinnerChoice } = useChoices();

     // Randomly shuffle the choices
     const shuffledChoices = useMemo(() => {
          return Math.random() > 0.5 ? [...dinnerCategory.choices] : [...dinnerCategory.choices].reverse();
     }, [dinnerCategory.choices]);

     const handleCardClick = (dinnerId: number) => {
          if (flippedCard === null) {
               setFlippedCard(dinnerId);
               const selectedDinner = dinnerCategory.choices.find(dinner => dinner.id === dinnerId);
               if (selectedDinner) {
                    setDinnerChoice(selectedDinner);
               }
          }
     };

     if (showMovie) {
          return <MovieSelection />;
     }

     return (
          <div className="app-container">
               <motion.div
                    className="dinner-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
               >
                    <h1>Time to eat! 🍽️</h1>
                    <p>Where should we have our romantic dinner?</p>

                    <div className="dinner-grid">
                         {shuffledChoices.map((dinner, index) => (
                              <motion.div
                                   key={dinner.id}
                                   className={`card-container ${flippedCard === dinner.id ? 'flipped' : ''} ${flippedCard !== null && flippedCard !== dinner.id ? 'disabled' : ''}`}
                                   onClick={() => handleCardClick(dinner.id)}
                                   whileHover={flippedCard === null ? { scale: 1.05 } : {}}
                                   whileTap={flippedCard === null ? { scale: 0.95 } : {}}
                                   initial={{
                                        opacity: 0,
                                        x: index === 0 ? -100 : 100
                                   }}
                                   animate={{
                                        opacity: flippedCard !== null && flippedCard !== dinner.id ? 0.5 : 1,
                                        scale: flippedCard !== null && flippedCard !== dinner.id ? 0.95 : 1,
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
                                             <img src={dinner.imageUrl} alt={dinner.title} />
                                             <p>{dinner.title}</p>
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
                                        onClick={() => setShowMovie(true)}
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

export default DinnerSelection; 