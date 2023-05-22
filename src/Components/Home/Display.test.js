import { render } from '@testing-library/react';
import Display from './Display';

it('should render home', () => {
    const home = render(<Display />);
    expect(home).not.toBe(null);
});

it("should render User Input Component", () => {
    const { queryByTestId } = render(<Display />);
    const userInput = queryByTestId('user-input');
  
    expect(userInput).toBeDefined();
});

it("should render Map View Component", () => {
    const { queryByTestId } = render(<Display />);
    const mapView = queryByTestId('map-view');
  
    expect(mapView).toBeDefined();
});