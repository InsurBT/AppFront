import { createContext } from 'react';

const ConnectedUserContext = createContext({connectedUser: null, setConnectedUser: () => {}});

export default ConnectedUserContext;