# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 - Update Agent table

Modify the `Agent` table to include a field for storing custom IDs.

**Team**: Backend

**Dependencies**: None

**Estimate**: 1h

**Acceptance Criteria**:

- Add a new field `customId` to the Agent table.
- `customId` should be string.
- `customId` field should be have a unique costraint.
- `customId` field should be nullable because there are existing `Agent` rows.

### Ticket 2 - Update Agent APIs

Modify the `Agent` APIs to allow CRUD operations to support the new `customId` field.

**Team**: Backend

**Dependencies**: Ticket 1

**Estimate**: 2h

**Acceptance Criteria**:

- `GET /agents` should include `customId` in the return object
- `POST /agents` and `PUT /agents` should allow to insert and modify the `customId` field
- `customId` should be trated as a nullable and API should check for unique costraint errors.

### Ticket 3 - Manage `customId` in Agent create/modify page

Allow app user to add or edit `customId` for an Agent in the specific forms, using updated APIs in Ticket 2.

**Team**: Frontend

**Dependencies**: Ticket 2

**Estimate**: 2h

**Acceptance Criteria**:

- Agent modify page should allow to input a custom ID
- Agent create page should allow to input a custom ID
- In both istances, after successfully submitting the form, the custom ID is succesfully stored for that Agent
- In both istances, form should validate input as string and check for error (eg. duplication costraint error)

### Ticket - Show `customId` in Agent view page

Add `customId` value in the UI showing an Agent information

**Team**: Frontend

**Dependencies**: Ticket 2 (best after Ticket 4)

**Estimate**: 45min

**Acceptance Criteria**:

- The UI showing info of an Agent, should succesfully show the `customId`.
- If `customId` is `null`, then show the text _None_ in italic

### Ticket 5

#### Show `customId` in `getShiftsByFacility`

Modify the `getShiftsByFacility` function to also retrieve the custom IDs of the associated Agents.

**Team**: Backend

**Dependencies**: Ticket 2

**Estimate**: 45min

**Acceptance Criteria**:

- `customId` should be included in the Agent metadata retrived from the API

### Ticket 6

#### Update PDF template with `customId`

When calling `generateReport` function, the generated PDF should include the `customId`

**Team**: Backend

**Dependencies**: Ticket 5

**Estimate**: 1h

**Acceptance Criteria**:

- Update the PDF template to show `customId` instead of Agent database `id`. Check that the PDF UI isn't affected by the change.
