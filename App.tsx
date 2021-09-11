import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationLayer } from './components/NavigationLayer';
import { useEffect } from 'react';
import Realm from 'realm';
import { EventSchema } from './db/EventSchema';

function App() {
  useEffect(() => {}, []);
  return (
    <RecoilRoot>
      <NavigationLayer />
    </RecoilRoot>
  );
}

export default App;
