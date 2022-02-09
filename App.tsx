import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationLayer } from './components/NavigationLayer';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NavigationLayer />
        </RecoilRoot>
      </QueryClientProvider>
  );
}

export default App;
