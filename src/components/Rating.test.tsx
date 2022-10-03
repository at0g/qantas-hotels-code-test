import React from 'react';
import { render, screen } from '@testing-library/react';
import { Rating } from "./Rating";

describe('Rating', () => {
   describe('Self rated', () => {
       const baseCircleSelector = 'circle[fill="#d2d4d6"]';
       const filledCircleSelector = 'circle[fill="#ede809"]';

       let container: ReturnType<typeof render>['container'];

       beforeEach(() => {
           const rendered = render(<Rating value={1.5} type="SELF" />);
           container = rendered.container;
       })
       it('should render a test id', async () => {
           const node = await screen.findByTestId('self_rating:1.5');
           expect(node).toBeInTheDocument();
       });
       it('should render 5 circle icons', () => {
           const nodeList = container.querySelectorAll(baseCircleSelector);
           expect(nodeList).toHaveLength(5);
       });
       it('should render the first circle with an accented fill', () => {
           const node = container.querySelector(filledCircleSelector);
           expect(node).toBeDefined();
       });
       it('should indicate a 1/2 rating by rendering the second circle with a masked fill', () => {
           const nodeList = container.querySelectorAll(filledCircleSelector);
           const node = container.querySelector('svg circle[mask="url(#circlePartialMask)"]');
           expect(node).toBe(nodeList[1]);
       });
       it('should only render the filled icon for the 1st and 2nd icons', () => {
           const nodeList = container.querySelectorAll(filledCircleSelector);
           expect(nodeList).toHaveLength(2);
       });
       it('should render the circle mask', () => {
           const mask = container.querySelector('mask[id="circlePartialMask"]');
           expect(mask).toBeInTheDocument();
       });
   });

   describe('User rated', () => {
       const baseStarSelector = 'path[fill="#d2d4d6"]';
       const filledStarSelector = 'path[fill="#ede809"]';

       let container: ReturnType<typeof render>['container'];

       beforeEach(() => {
           const rendered = render(<Rating value={1.5} type="USER" />);
           container = rendered.container;
       })
       it('should render a test id', async () => {
           const node = await screen.findByTestId('user_rating:1.5');
           expect(node).toBeInTheDocument();
       });
       it('should render 5 star icons', () => {
           const nodeList = container.querySelectorAll(baseStarSelector);
           expect(nodeList).toHaveLength(5);
       });
       it('should render the first star with an accented fill', () => {
           const node = container.querySelector(filledStarSelector);
           expect(node).toBeDefined();
       });
       it('should indicate a 1/2 rating by rendering the second star with a masked fill', () => {
           const nodeList = container.querySelectorAll(filledStarSelector);
           const node = container.querySelector('svg path[mask="url(#starPartialMask)"]');
           expect(node).toBe(nodeList[1]);
       });
       it('should only render the filled icon for the 1st and 2nd icons', () => {
           const nodeList = container.querySelectorAll(filledStarSelector);
           expect(nodeList).toHaveLength(2);
       });
       it('should render the star mask', () => {
           const mask = container.querySelector('mask[id="starPartialMask"]');
           expect(mask).toBeInTheDocument();
       });
   })
});
