import React, {useMemo} from 'react';
import { OneCol } from "./components/layout";
import {useResults} from "./useResults";
import {PropertyListItem} from "./components/PropertyListItem";

function App() {
    const [data] = useResults('/data.json');

    const mappedData = useMemo(() => data.map((result) => {
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

        const props: React.ComponentProps<typeof PropertyListItem> & { key: string; } = {
            key: result.id,
            address: result.property.address.join(', '),
            badge: result.offer.promotion.title,
            cancellationOption,
            currency: result.offer.displayPrice.currency,
            image: img,
            title: result.property.title,
            offerPrice: result.offer.displayPrice.amount,
            offerSavings: result.offer.savings?.amount,
            offerTitle: result.offer.name,
            ratingType,
            ratingValue: result.property.rating.ratingValue
        }

        return props;
    }), [data])

  return (
    <OneCol>
        {mappedData.map(({ key, ...props}) => (
            <PropertyListItem
                key={key}
                {...props}
            />
        ))}

    </OneCol>
  );
}

export default App;
