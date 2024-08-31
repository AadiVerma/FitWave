import {configureStore} from '@reduxjs/toolkit';
import authreducer from './slices/slice.js'
export const store=configureStore({
    reducer:{
        Auth:authreducer
    }
})