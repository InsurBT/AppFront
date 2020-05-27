import { createContext } from 'react';

const ConnectedUserContext = createContext({connectedUser: {}, setConnectedUser: () => {}});

export default ConnectedUserContext;