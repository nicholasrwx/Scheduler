import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"));
});

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = await waitForElement(() =>
    getAllByTestId(container, "appointment")
  );
  const appointment = appointments[0];

  await waitForElement(() => fireEvent.click(getByAltText(appointment, "Add")));

  await waitForElement(() =>
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    })
  );

  await waitForElement(() =>
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
  );

  await waitForElement(() => fireEvent.click(getByText(appointment, "Save")));

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
});
