import React from 'react';
import { render, screen } from '@testing-library/react';
import { PropertyListItem } from "./PropertyListItem";

const fixture: React.ComponentProps<typeof PropertyListItem> = {
    address: '123 somewhere',
    badge: 'new OR improved',
    currency: 'USD',
    image: {
        src: 'https://unsplash.it/145/125/?random',
        alt: 'Alt text for test'
    },
    title: 'Test promotion',
    offerPrice: 1000000,
    offerTitle: 'Only one million dollars',
    ratingValue: 3.5,
    ratingType: "SELF",
    testId: 'testid-for-test'
}

describe('PropertyListItem', () => {
    describe('required props', () => {
        beforeEach(() => {
            render(<PropertyListItem {...fixture} />)
        })

        it('should render a list item with the matching test id', async () => {
            const node = await screen.findByTestId(fixture.testId);
            expect(node).toBeInTheDocument();
        })

        describe('property info', () => {
            it('should render the property title', async () => {
                const title = await screen.findByText(fixture.title);
                expect(title).toBeInTheDocument();
            });

            it('should render the property rating', async () => {
                const ratingId = `${fixture.ratingType.toLowerCase()}_rating:${fixture.ratingValue}`;
                const rating = await screen.findByTestId(ratingId);
                expect(rating).toBeInTheDocument();
            });

            it('should render the property image', async () => {
                const img = await screen.findByAltText(fixture.image.alt)
                expect(img).toBeInTheDocument();
            });
        });

        describe('offer details', () => {
            it('should display the offer price', async () => {
                const price = await screen.findByText(fixture.offerPrice);
                expect(price).toBeInTheDocument();
            });

            it('should display the offer currency', async () => {
                const currency = await screen.findByText(`1 night total (${fixture.currency})`);
                expect(currency).toBeInTheDocument();
            });
        });
    });

    describe('optional props', () => {
        it('should render the cancellation option', async () => {
            const option = 'Free cancellation'
            render(<PropertyListItem {...fixture} cancellationOption={option} />)
            const cancellationOption = await screen.findByText(option);
            expect(cancellationOption).toBeInTheDocument();
        });

        it('should render the offer savings', async () => {
            const savings = 200;
            render(<PropertyListItem {...fixture} offerSavings={savings} />);
            const offerSavings = await screen.findByText(`Save $${savings}~`);
            expect(offerSavings).toBeInTheDocument();
        });
    });
});
