import {useEffect, useMemo, useState} from 'react'

type Property = {
    propertyId: string;
    title: string;
    address: string[];
    previewImage: {
        url: string;
        caption: string;
        imageType: 'PRIMARY'
    };
    rating: {
        ratingValue: number;
        ratingType:
            | 'self'
            | 'star';
    }
}

type ValueWithCurrency = {
    amount: number;
    currency: string;
}

type Offer = {
    promotion: {
        title: string;
        type:
            | 'CAMPAIGN'
            | 'MEMBER';
    };
    name: string;
    displayPrice: ValueWithCurrency;
    savings: ValueWithCurrency | null;
    cancellationOption: {
        cancellationType:
            | 'FREE_CANCELLATION'
            | 'NOT_REFUNDABLE';
    }
}

type Result = {
    id: string;
    property: Property;
    offer: Offer;
}

type DataPayload = {
    results: Result[];
}

export function useResults(url: string) {
    const [data, setData] = useState<DataPayload['results']>([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((payload: DataPayload) => {
                setData(payload.results)
            })

    }, [setData, url]);

    return useMemo(() => {
        return [
            data
        ];
    }, [data])
}
