import React, {useMemo, useState} from 'react';
import { OneCol } from "./components/layout";
import {useResults} from "./useResults";
import {PropertyListItem} from "./components/PropertyListItem";
import {ListResultsHeader} from "./components/ListResultsHeader";

function App() {
    const [data] = useResults('/data.json');
    const [sortMode, setSortMode] = useState<'PRICE_ASC' | 'PRICE_DESC'>('PRICE_DESC');
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
            testId: `deal-${result.id}`,
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
    const sortedData = useMemo(() => mappedData.sort((a, b) => {
        if (sortMode === 'PRICE_ASC') {
            if (a.offerPrice < b.offerPrice) {
                return -1;
            }
            if (a.offerPrice > b.offerPrice) {
                return 1;
            }
            return 0;
        }

        if(sortMode === 'PRICE_DESC') {
            if (a.offerPrice > b.offerPrice) {
                return -1;
            }
            if (a.offerPrice < b.offerPrice) {
                return 1;
            }
            return 0;
        }
        return 0;
    }), [mappedData, sortMode])

    const header = <ListResultsHeader
        resultsCount={mappedData.length}
        resultsLocation="Sydney"
        onChange={setSortMode}
        value={sortMode}
    />

    return (
        <OneCol header={header}>
            {sortedData.map(({ key, ...props}) => (
                <PropertyListItem
                    key={key}
                    {...props}
                />
            ))}
        </OneCol>
    );
}

export default App;
