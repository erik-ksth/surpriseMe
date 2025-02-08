import ValentineProposal from './components/ValentineProposal';
import { ChoicesProvider } from './context/ChoicesContext';
import './App.css';

function App() {
  return (
    <ChoicesProvider>
      <ValentineProposal />
    </ChoicesProvider>
  );
}

export default App;
