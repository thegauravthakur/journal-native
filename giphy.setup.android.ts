import { GiphySDK } from '@giphy/react-native-sdk';
import { GIPHY_KEY } from 'react-native-dotenv';

GiphySDK.configure({ apiKey: GIPHY_KEY });
