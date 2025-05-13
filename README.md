# Bean There Coffee Shop Review and Recommendation Application

## Overview

This project is a web application designed for coffee enthusiasts to discover, review, and receive personalized recommendations for coffee shops. The application leverages FastAPI for the backend, MongoDB for data management, and React.js for the frontend, providing a seamless user experience.

## Features

- **User Authentication**: Users can create accounts, log in, and manage their profiles.
- **Coffee Shop Discovery**: Users can browse a curated list of coffee shops with detailed profiles.
- **Personalized Recommendations**: The application provides tailored coffee shop suggestions based on user preferences and past reviews.
- **Responsive Design**: The frontend is built with React.js, ensuring a responsive and interactive user interface.

## Installation

### Backend

1. Navigate to the `backend` directory.
2. Create a virtual environment and activate it.
3. Install the required dependencies using the following command:

   ```
   pip install -r requirements.txt
   ```

4. Set up your MongoDB connection string in the `.env` file based on the `.env.example` template.
5. Run the FastAPI application:

   ```
   python -m uvicorn app.main:app --reload
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install the required dependencies using npm:

   ```
   npm install
   ```

3. Start the React application:

   ```
   npm run dev
   ```

## Usage

- Access the frontend application in your web browser at `http://localhost:3000`.
- Use the application to explore coffee shops, submit reviews, and receive recommendations.
