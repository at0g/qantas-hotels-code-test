import React from 'react';
import { OneCol } from "./components/layout";
import {useResults} from "./useResults";

function App() {
    const [data] = useResults('/data.json');

  return (
    <OneCol>
        <div>
            <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
        </div>
    </OneCol>
  );
}

export default App;
