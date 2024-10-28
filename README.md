# FinTracker

FinTracker is a comprehensive finance tracking application designed to help users manage their financial transactions efficiently. With features like real-time data visualization, CSV import/export capabilities, and user authentication, FinTracker provides an intuitive and user-friendly experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **User Authentication**: Secure sign-up and login using Google authentication.
- **CRUD Operations**: 
  - Create new transactions.
  - Read and view all existing transactions in a user-friendly table.
  - Update existing transactions easily.
  - Delete transactions with a confirmation dialog.
- **Data Visualization**: 
  - Interactive graphs and pie charts to visualize expenses by category, helping users understand their spending patterns.
  - Monthly and yearly expense trends for better financial planning.
- **CSV Import/Export**:
  - Import transactions from CSV files to quickly add multiple entries.
  - Export transaction data to CSV for offline access and record-keeping.
- **Responsive Design**: Mobile-friendly interface that adjusts to various screen sizes, ensuring a seamless user experience across devices.
- **Real-time Database**: Utilizes Firestore for real-time updates, allowing users to see changes instantly.
- **Customizable Categories**: Users can create and manage their own categories for expenses, tailoring the app to their needs.

## Technologies Used

- **Frontend**: React, Ant Design, Chart.js (for graphs and charts)
- **Backend**: Firebase (Firestore, Authentication)
- **Hosting**: Firebase Hosting or Vercel
- **Additional Libraries**: 
  - `react-toastify` for notifications
  - `papaparse` for CSV parsing

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Firebase project set up with Firestore and Authentication enabled

### Usage
- Sign Up / Log In: Use the Google authentication to create an account or log in.
- Add Transactions: Use the provided form to add new transactions, specifying the amount, category, and description.
- View Transactions: All transactions are displayed in a user-friendly table format.
- Delete Transactions: Remove transactions using the delete button next to each entry.
- Graphs and Charts: Navigate to the statistics page to view pie charts and graphs representing your spending habits.
- Import/Export CSV:
- Use the import feature to upload CSV files containing transactions.
- Export your transaction data to CSV for offline use.

### Contributing
- Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or features you would like to see.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


### Acknowledgements
   - React
   - Firebase
   - Ant Design
   - Chart.js
   - PapaParse