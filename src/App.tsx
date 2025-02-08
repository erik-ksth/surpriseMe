import ValentineProposal from './components/ValentineProposal';
import { ChoicesProvider } from './context/ChoicesContext';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <ChoicesProvider>
      <div className="background-circles">
        <motion.div
          className="circle circle-1"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="circle circle-2"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      <ValentineProposal />
    </ChoicesProvider>
  );
}

export default App;
