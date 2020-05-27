import { createContext } from 'react';

const PrestationsContext = createContext({prestations: [], setPrestations: () => {}});

export default PrestationsContext;