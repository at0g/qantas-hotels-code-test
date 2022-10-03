import React from 'react';
import { OneCol } from "./components/layout";
import {useResults} from "./useResults";
import {PropertyListItem} from "./components/PropertyListItem";

function App() {
    const [data] = useResults('/data.json');

  return (
    <OneCol>
        {data.map((result) => {
            const img = {
                src: result.property.previewImage.url,
                alt: result.property.previewImage.caption
            }
            return (
                <PropertyListItem
                    key={result.id}
                    address={result.property.address.join(', ')}
                    image={img}
                    badge={result.offer.promotion.title}
                    title={result.property.title}
                    offerTitle={result.offer.name}
                />
            )
        })}

    </OneCol>
  );
}

export default App;
