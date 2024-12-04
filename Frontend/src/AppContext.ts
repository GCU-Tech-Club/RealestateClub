import { createContext } from 'react';
import APIWrapper from './util/api';

const AppContext = createContext({
    api: new APIWrapper()
});

export default AppContext;