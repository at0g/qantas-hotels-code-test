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
            const cancellationOption = result.offer.cancellationOption.cancellationType === 'FREE_CANCELLATION'
                ? 'Free cancellation'
                : undefined;

            const ratingType = result.property.rating.ratingType === 'star'
                ? 'USER'
                : 'SELF'

            return (
                <PropertyListItem
                    key={result.id}
                    address={result.property.address.join(', ')}
                    cancellationOption={cancellationOption}
                    currency={result.offer.displayPrice.currency}
                    image={img}
                    badge={result.offer.promotion.title}
                    title={result.property.title}
                    offerPrice={result.offer.displayPrice.amount}
                    offerSavings={result.offer.savings?.amount}
                    offerTitle={result.offer.name}
                    ratingValue={result.property.rating.ratingValue}
                    ratingType={ratingType}
                />
            )
        })}

    </OneCol>
  );
}

export default App;
