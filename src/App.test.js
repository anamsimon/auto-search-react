import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Make component', () => {
  render(<App />);
  const element = screen.getByText(/Any make/i);
  expect(element).toBeInTheDocument();
});


test('renders Model component', () => {
  render(<App />);
  const element = screen.getByText(/Any model/i);
  expect(element).toBeInTheDocument();
});

test('renders Price component', () => {
  render(<App />);
  const element = screen.getByText(/Price/i);
  expect(element).toBeInTheDocument();
});

test('renders Kilometres component', () => {
  render(<App />);
  const element = screen.getByText(/Kilometres/i);
  expect(element).toBeInTheDocument();
});

test('renders Result button', () => {
  render(<App />);
  const element = screen.getByRole('button');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(/results/i);
});
