import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { categories } from '../data/choices';
import { useChoices } from '../context/ChoicesContext';
import ReviewChoices from './ReviewChoices';
import SoundManager from '../utils/sounds';
import './MovieSelection.css';

const MovieSelection = () => {
     const [flippedCard, setFlippedCard] = useState<number | null>(null);
     const [showReview, setShowReview] = useState(false);
     const movieCategory = categories.find(cat => cat.name === "Movie")!;
     const { setMovieChoice } = useChoices();

     // Randomly shuffle the choices
     const shuffledChoices = useMemo(() => {
          return Math.random() > 0.5 ? [...movieCategory.choices] : [...movieCategory.choices].reverse();
     }, [movieCategory.choices]);

     const handleCardClick = (movieId: number) => {
          if (flippedCard === null) {
               setFlippedCard(movieId);
               const selectedMovie = movieCategory.choices.find(movie => movie.id === movieId);
               if (selectedMovie) {
                    setMovieChoice(selectedMovie);
                    SoundManager.playSound('cardFlip');
               }
          }
     };

     const handleNextClick = () => {
          SoundManager.playSound('success'); // Use success sound for final transition
          setShowReview(true);
     };

     if (showReview) {
          return <ReviewChoices />;
     }

     return (
          <div className="app-container">
               <motion.div
                    className="movie-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
               >
                    <h1>Movie Time! 🎬</h1>
                    <p>What should we watch together?</p>

                    <div className="movie-grid">
                         {shuffledChoices.map((movie, index) => (
                              <motion.div
                                   key={movie.id}
                                   className={`card-container ${flippedCard === movie.id ? 'flipped' : ''} ${flippedCard !== null && flippedCard !== movie.id ? 'disabled' : ''}`}
                                   onClick={() => handleCardClick(movie.id)}
                                   whileHover={flippedCard === null ? { scale: 1.05 } : {}}
                                   whileTap={flippedCard === null ? { scale: 0.95 } : {}}
                                   initial={{
                                        opacity: 0,
                                        x: index === 0 ? -100 : 100
                                   }}
                                   animate={{
                                        opacity: flippedCard !== null && flippedCard !== movie.id ? 0.5 : 1,
                                        scale: flippedCard !== null && flippedCard !== movie.id ? 0.95 : 1,
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
                                             <img src={movie.imageUrl} alt={movie.title} />
                                             <p>{movie.title}</p>
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
                                        See Your Choices →
                                   </motion.button>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </motion.div>
          </div>
     );
};

export default MovieSelection; 