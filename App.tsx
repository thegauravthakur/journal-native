import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationLayer } from './components/NavigationLayer';

function App() {
  return (
    <RecoilRoot>
      <NavigationLayer />
    </RecoilRoot>
  );
}

export default App;
