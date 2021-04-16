import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';


test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    const {getByText} = render(<ContactForm />);
    const header = getByText(/contact form/i);

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstnameInput = screen.getByPlaceholderText(/edd/i);
    const button = screen.getByRole( 'button', { value: /submit/i })
    userEvent.click(button)

    userEvent.type(firstnameInput, "four");

    const firstError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    expect(firstError).toBeVisible();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const lastnameInput = screen.getByPlaceholderText(/Burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    const button = screen.getByRole( 'button', { value: /submit/i })
    userEvent.click(button)

    const firstError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    const secondError = screen.getByText(/Error: lastName is a required field./i)
    const thirdError = screen.getByText(/Error: email must be a valid email address./i)

    expect(firstError).toBeVisible();
    expect(secondError).toBeVisible();
    expect(thirdError).toBeVisible();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstnameInput = screen.getByPlaceholderText(/edd/i);
    const lastnameInput = screen.getByPlaceholderText(/Burke/i);
    const button = screen.getByRole( 'button', { value: /submit/i })

    userEvent.type(firstnameInput, "Spongebob");
    userEvent.type(lastnameInput, 'Squarepants');

    userEvent.click(button)

    const thirdError = screen.getByText(/Error: email must be a valid email address./i)
    
    expect(thirdError).toBeVisible();
   

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    userEvent.type(emailInput, 'SpongebobSquarepants')
    const button = screen.getByRole( 'button', { value: /submit/i })
    userEvent.click(button)

    const thirdError = screen.getByText(/Error: email must be a valid email address./i)

    expect(thirdError).toBeVisible();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const lastnameInput = screen.getByPlaceholderText(/Burke/i);


    const button = screen.getByRole( 'button', { value: /submit/i })
    userEvent.click(button)

    const secondError = screen.getByText(/Error: lastName is a required field./i);
    expect(secondError).toBeVisible();



});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const {getByText} = render(<ContactForm />)

    const firstnameInput = screen.getByPlaceholderText(/edd/i);
    const lastnameInput = screen.getByPlaceholderText(/Burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);

    const button = screen.getByRole( 'button', { value: /submit/i })

    userEvent.type(firstnameInput, "Spongebob");
    userEvent.type(lastnameInput, 'Squarepants');
    userEvent.type(emailInput, 'email@hotmail.com')

    userEvent.click(button)

    const firstnameRender = screen.getByTestId('firstnameDisplay');
    const lastnameRender =screen.getByTestId('lastnameDisplay');
    const emailRender = screen.getByTestId('emailDisplay');
    

    expect(firstnameRender).toBeVisible()
    expect(lastnameRender).toBeVisible()
    expect(emailRender).toBeVisible()
    

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstnameInput = screen.getByPlaceholderText(/edd/i);
    const lastnameInput = screen.getByPlaceholderText(/Burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const messageInput = screen.getByRole('textbox', {value: 'message'})

    const button = screen.getByRole( 'button', { value: /submit/i })

    userEvent.type(firstnameInput, "Spongebob");
    userEvent.type(lastnameInput, 'Squarepants');
    userEvent.type(emailInput, 'email@hotmail.com')
    userEvent.type(messageInput, 'insert message here')

    userEvent.click(button)

    const firstnameRender = screen.getByTestId('firstnameDisplay');
    const lastnameRender =screen.getByTestId('lastnameDisplay');
    const emailRender = screen.getByTestId('emailDisplay');
    const messageRender = screen.getByTestId('messageDisplay');

    expect(firstnameRender).toBeVisible()
    expect(lastnameRender).toBeVisible()
    expect(emailRender).toBeVisible()
    expect(messageRender).toBeVisible()

});