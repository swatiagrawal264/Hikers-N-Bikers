import { fireEvent, getByDisplayValue, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Front_End from './Front_End';
import { Alert } from 'react';


it('should render User Input', () => {
  render(<Front_End/>);
});

it("should check input validation", async () => {
    const { getByText } = render(<Front_End from="" to="" />);

    try {
        await userEvent.click(getByText("Search"));
        const error = getByText('Please enter valid input');
        expect(error).toBeTruthy();
    } catch (e) {
        expect(e).not.toBeNull();
    }
});

it("should check if error is hidden if input is present", async () => {
    const { getByText } = render(<Front_End from="From" to="To" />);

    try {
        await userEvent.click(getByText("Search"));
        const error = getByText('Please enter valid input');
        expect(error).toBeTruthy();
    } catch (e) {
        expect(e).not.toBeNull();
    }
});

it("should check if from location input 'from' the user is properly read", () => {
    const { getByTestId } = render(<Front_End from="" to="" />);
    const input = getByTestId('from');
    fireEvent.change(input, { target: { value: 'The Boulders, Amherst' } })
    expect(screen.getByDisplayValue('The Boulders, Amherst')).toBeTruthy();
});

it("should check if from location input 'to' the user is properly read", () => {
    const { getByTestId } = render(<Front_End from="" to="" />);
    const input = getByTestId('to');
    fireEvent.change(input, { target: { value: 'Du Bois Library, Amherst' } })
    expect(screen.getByDisplayValue('Du Bois Library, Amherst')).toBeTruthy();
});


it("should check if from location input 'elevation preference' the user is properly read", () => {
    const { getByTestId } = render(<Front_End from="" to="" accuracy="0"/>);
    const input = getByTestId('elevation-preference');
    fireEvent.change(input, { target: { value: 10 } })
    expect(screen.getAllByDisplayValue(10)).toBeTruthy();
});

