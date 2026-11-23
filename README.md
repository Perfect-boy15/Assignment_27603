# Library Workspace

A React and Vite admin dashboard for reviewing connected companies, their documents, and their reported operating workflows.

## Features

- Switch between an individual company's workspace and a combined all-companies view.
- Search documents by title, company, ID, or owner and filter by document type.
- Open document details, including company, date, format, owner, and review status.
- Export the currently filtered document list as CSV.
- Compare company workflow steps, reported completion, and connection status.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to validate the application.

## Data note

The current dashboard uses sample company and document records defined in `src/App.jsx`. Document details are a preview only; connecting a backend and document storage service is required for live company data and opening original files.
