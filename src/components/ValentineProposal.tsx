import { motion } from 'framer-motion';
import { useState } from 'react';
import './ValentineProposal.css';
import { photos } from '../data/photos';
import OutfitSelection from './OutfitSelection';

const ValentineProposal = () => {
     const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
     const [showOutfits, setShowOutfits] = useState(false);

     const moveNoButton = () => {
          // Generate random position within a smaller boundary
          const randomX = Math.random() * (window.innerWidth / 2) - window.innerWidth / 2;
          const randomY = Math.random() * (window.innerHeight / 2) - window.innerHeight / 2;
          setNoButtonPosition({ x: randomX, y: randomY });
     };

     if (showOutfits) {
          return <OutfitSelection />;
     }

     return (
          <div className="app-container">
               <motion.div className="photos-container">
                    {photos.map((photo, index) => (
                         <motion.img
                              key={photo}
                              src={photo}
                              alt={`Us ${index + 1}`}
                              className="photo"
                              initial={{
                                   opacity: 0,
                                   x: index % 2 === 0 ? -1000 : 1000,
                                   rotate: index % 2 === 0 ? -45 : 45
                              }}
                              animate={{
                                   opacity: 1,
                                   x: 0,
                                   rotate: index % 2 === 0 ? -8 : 8
                              }}
                              transition={{
                                   duration: 1.5,
                                   delay: index * 0.3,
                                   type: "spring",
                                   stiffness: 100,
                                   damping: 20
                              }}
                         />
                    ))}
               </motion.div>

               <motion.div
                    className="intro-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                         duration: 2,
                         ease: "easeOut",
                         delay: 1
                    }}
               >
                    <h1>Hey Beautiful 🌹</h1>
                    <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 2, duration: 1.5 }}
                    >
                         Are you ready to be my valentine?
                    </motion.p>

                    <motion.div
                         className="button-container"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 3, duration: 1 }}
                    >
                         <motion.button
                              className="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => setShowOutfits(true)}
                         >
                              Yes
                         </motion.button>

                         <motion.button
                              className="button no-button"
                              animate={noButtonPosition}
                              transition={{
                                   type: "spring",
                                   stiffness: 300,
                                   damping: 20
                              }}
                              onHoverStart={moveNoButton}
                              onClick={moveNoButton}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                         >
                              No
                         </motion.button>
                    </motion.div>
               </motion.div>
          </div>
     );
};

export default ValentineProposal; 