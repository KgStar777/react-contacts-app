import React from 'react';
import {
    render,
    screen,
    waitForElementToBeRemoved
} from "@testing-library/react";
import {Contacts} from "../pages/Contacts";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { users } from "../__fixtures__/users";


const handlers = [
    rest.get(`https://randomuser.me/api/?results=20`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                result: users,
            }),
        );
    }),
];


const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


test('contacts get data success', async () => {
    render(<Contacts/>);

    const loader = screen.getByTestId("contacts-loader")

    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();

    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();

    // screen.debug();
});