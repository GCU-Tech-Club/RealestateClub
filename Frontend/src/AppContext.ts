import { createContext } from 'react';
import APIWrapper from './util/api';

const AppContext = createContext({
    api: APIWrapper
});

export default AppContext;