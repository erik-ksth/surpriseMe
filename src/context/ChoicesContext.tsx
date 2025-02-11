import { createContext, useContext, useState, ReactNode } from 'react';
import { Choice } from '../data/choices';

interface SelectedChoices {
     outfit: Choice | null;
     activity: Choice | null;
     dinner: Choice | null;
     movie: Choice | null;
}

interface ChoicesContextType {
     selectedChoices: SelectedChoices;
     setOutfitChoice: (choice: Choice) => void;
     setActivityChoice: (choice: Choice) => void;
     setDinnerChoice: (choice: Choice) => void;
     setMovieChoice: (choice: Choice) => void;
}

const ChoicesContext = createContext<ChoicesContextType | undefined>(undefined);

export const ChoicesProvider = ({ children }: { children: ReactNode }) => {
     const [selectedChoices, setSelectedChoices] = useState<SelectedChoices>({
          outfit: null,
          activity: null,
          dinner: null,
          movie: null
     });

     const setOutfitChoice = (choice: Choice) => {
          setSelectedChoices(prev => ({ ...prev, outfit: choice }));
     };

     const setActivityChoice = (choice: Choice) => {
          setSelectedChoices(prev => ({ ...prev, activity: choice }));
     };

     const setDinnerChoice = (choice: Choice) => {
          setSelectedChoices(prev => ({ ...prev, dinner: choice }));
     };

     const setMovieChoice = (choice: Choice) => {
          setSelectedChoices(prev => ({ ...prev, movie: choice }));
     };

     return (
          <ChoicesContext.Provider
               value={{
                    selectedChoices,
                    setOutfitChoice,
                    setActivityChoice,
                    setDinnerChoice,
                    setMovieChoice
               }}
          >
               {children}
          </ChoicesContext.Provider>
     );
};

export const useChoices = () => {
     const context = useContext(ChoicesContext);
     if (context === undefined) {
          throw new Error('useChoices must be used within a ChoicesProvider');
     }
     return context;
}; 