import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import DocumentEdit from './DocumentEdit';

test('renders Title label', () => {
    render(<MemoryRouter><DocumentEdit /></MemoryRouter>);
    const labelElement = screen.getByText("Title:");
    expect(labelElement).toBeInTheDocument();
});

test('renders Content label', () => {
    render(<MemoryRouter><DocumentEdit /></MemoryRouter>);
    const labelElement = screen.getByText("Content:");
    expect(labelElement).toBeInTheDocument();
});

test("title variable gets value when text is entered", async () => {
    const inputValue = 'Hej';
    render(<MemoryRouter><DocumentEdit /></MemoryRouter>);

    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("Title:");

    await user.type(titleInput, inputValue);

    expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
});

test("content variable gets value when text is entered", async () => {
    const inputValue = 'hopp';
    render(<MemoryRouter><DocumentEdit /></MemoryRouter>);

    const user = userEvent.setup();

    const contentInput = screen.getByLabelText("Content:");

    await user.type(contentInput, inputValue);

    expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
});
