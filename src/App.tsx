import * as React from 'react';
import { RecoilRoot } from 'recoil';
import Initiator from './components/Initiator';

function App() {
  return (
    <RecoilRoot>
      <Initiator />
    </RecoilRoot>
  );
}

export default App;
