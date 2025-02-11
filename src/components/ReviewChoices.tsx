import { motion } from 'framer-motion';
import { useChoices } from '../context/ChoicesContext';
import './ReviewChoices.css';

const ReviewChoices = () => {
     const { selectedChoices } = useChoices();

     return (
          <div className="app-container">
               <motion.div
                    className="review-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
               >
                    <h1>Perfect Date Plan! 💝</h1>
                    <p>Here's our romantic evening together...</p>

                    <div className="choices-review">
                         <motion.div
                              className="choice-card"
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                         >
                              <h2>Your Outfit 👗</h2>
                              <div className="choice-image">
                                   <img src={selectedChoices.outfit?.imageUrl} alt={selectedChoices.outfit?.title} />
                              </div>
                              <p>{selectedChoices.outfit?.title}</p>
                         </motion.div>

                         <motion.div
                              className="choice-card"
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                         >
                              <h2>Activity Plans 🍽️</h2>
                              <div className="choice-image">
                                   <img src={selectedChoices.activity?.imageUrl} alt={selectedChoices.activity?.title} />
                              </div>
                              <p>{selectedChoices.activity?.title}</p>
                         </motion.div>

                         <motion.div
                              className="choice-card"
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                         >
                              <h2>Dinner Plans 🍽️</h2>
                              <div className="choice-image">
                                   <img src={selectedChoices.dinner?.imageUrl} alt={selectedChoices.dinner?.title} />
                              </div>
                              <p>{selectedChoices.dinner?.title}</p>
                         </motion.div>

                         <motion.div
                              className="choice-card"
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 }}
                         >
                              <h2>Movie Choice 🎬</h2>
                              <div className="choice-image">
                                   <img src={selectedChoices.movie?.imageUrl} alt={selectedChoices.movie?.title} />
                              </div>
                              <p>{selectedChoices.movie?.title}</p>
                         </motion.div>
                    </div>

                    <motion.div
                         className="final-message"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 1.2 }}
                    >
                         <h2>Can't wait for our special evening! ❤️</h2>
                    </motion.div>
               </motion.div>
          </div>
     );
};

export default ReviewChoices; 