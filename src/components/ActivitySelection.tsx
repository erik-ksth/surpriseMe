import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { categories } from '../data/choices';
import { useChoices } from '../context/ChoicesContext';
import DinnerSelection from './DinnerSelection';
import SoundManager from '../utils/sounds';
import './ActivitySelection.css';

const ActivitiesSelection = () => {
     const [flippedCard, setFlippedCard] = useState<number | null>(null);
     const [showMovie, setShowMovie] = useState(false);
     const activityCategory = categories.find(cat => cat.name === "Activities")!;
     const { setActivityChoice } = useChoices();

     // Randomly shuffle the choices
     const shuffledChoices = useMemo(() => {
          return Math.random() > 0.5 ? [...activityCategory.choices] : [...activityCategory.choices].reverse();
     }, [activityCategory.choices]);

     const handleCardClick = (activityId: number) => {
          if (flippedCard === null) {
               setFlippedCard(activityId);
               const selectedActivity = activityCategory.choices.find(activity => activity.id === activityId);
               if (selectedActivity) {
                    setActivityChoice(selectedActivity);
                    SoundManager.playSound('cardFlip');
               }
          }
     };

     const handleNextClick = () => {
          SoundManager.playSound('transition');
          setShowMovie(true);
     };

     if (showMovie) {
          return <DinnerSelection />;
     }

     return (
          <div className="app-container">
               <motion.div
                    className="activities-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
               >
                    <h1>What should we do? 🤔</h1>
                    <p>Choose an activity to do together!</p>

                    <div className="activities-grid">
                         {shuffledChoices.map((activity, index) => (
                              <motion.div
                                   key={activity.id}
                                   className={`card-container ${flippedCard === activity.id ? 'flipped' : ''} ${flippedCard !== null && flippedCard !== activity.id ? 'disabled' : ''}`}
                                   onClick={() => handleCardClick(activity.id)}
                                   whileHover={flippedCard === null ? { scale: 1.05 } : {}}
                                   whileTap={flippedCard === null ? { scale: 0.95 } : {}}
                                   initial={{
                                        opacity: 0,
                                        x: index === 0 ? -100 : 100
                                   }}
                                   animate={{
                                        opacity: flippedCard !== null && flippedCard !== activity.id ? 0.5 : 1,
                                        scale: flippedCard !== null && flippedCard !== activity.id ? 0.95 : 1,
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
                                             <img src={activity.imageUrl} alt={activity.title} />
                                             <p>{activity.title}</p>
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

export default ActivitiesSelection; 