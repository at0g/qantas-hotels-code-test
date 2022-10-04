import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import mockData from '../public/data.json';
import { useResults } from "./useResults";
import userEvent from "@testing-library/user-event";

jest.mock('./useResults', () => ({
  __esModule: true,
  useResults: jest.fn(() => [mockData.results]),
}));

const dealsDesc = mockData.results.sort((a, b) => {
  if (a.offer.displayPrice.amount > b.offer.displayPrice.amount) {
    return -1
  }
  if (a.offer.displayPrice.amount < b.offer.displayPrice.amount) {
    return 1;
  }
  return 0
});

const dealsAsc = [...dealsDesc].reverse();

describe('App', () => {
  let container: ReturnType<typeof render>['container'];

  beforeEach(() => {
    const result = render(<App />);
    container = result.container;
  });

  it('should render the Qantas logo', async () => {
    const logo = await screen.findByAltText('Qantas');
    expect(logo).toBeInTheDocument();
  });

  it('should load the results from /data.json', () => {
    expect(useResults).toHaveBeenCalledWith('/data.json');
  });

  describe('rendering a list of deals', () => {
    it.each(mockData.results.map(({ id }) => id))('should render deal %s', async (dealId) => {
      const deal = await screen.findByTestId(`deal-${dealId}`);
      expect(deal).toBeInTheDocument();
    });
  });

  describe('sorting results', () => {
    it('should render a sort control', async () => {
      const sorter = await screen.getByLabelText('Sort by')
      expect(sorter).toBeInTheDocument();
    });

    it('should render deals by descending price as the default', () => {
      const deals = container.querySelectorAll('[data-testid^="deal-"]');
      dealsDesc.forEach((deal, index) => {
        const actual = deals[index].getAttribute('data-testid');
        const expected = `deal-${deal.id}`;
        expect(actual).toBe(expected);
      });
    });

    it('should render the deals by ascending price to reflect the sort', async () => {
      const sorter = await screen.getByLabelText('Sort by')
      await act(() => userEvent.selectOptions(sorter, 'Price low-high'));

      const deals = container.querySelectorAll('[data-testid^="deal-"]');
      dealsAsc.forEach((deal, index) => {
        const actual = deals[index].getAttribute('data-testid');
        const expected = `deal-${deal.id}`;
        expect(actual).toBe(expected);
      });
    })
  });
})
