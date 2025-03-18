# LinkWhiz

## Project Overview

LinkWhiz is a URL shortening service designed to simplify the process of sharing long URLs. It allows users to create short, manageable links that can be easily shared across various platforms. The service is particularly useful for social media, email marketing, and any situation where character count is limited. LinkWhiz aims to provide a user-friendly interface and robust functionality for managing and tracking URLs.

### Target Audience

LinkWhiz is ideal for:

- Marketers looking to track link performance.
- Businesses wanting to simplify their URLs for branding purposes.
- Individuals who frequently share links and want to keep them concise.

## Features

- **User Authentication**: Secure login and signup processes to protect user data.
- **URL Creation and Management**: Users can create, edit, and delete their shortened URLs.
- **Click Tracking**: Monitor how many times each link has been clicked, providing valuable insights into user engagement.
- **Device and Location Statistics**: Analyze where clicks are coming from and what devices are being used.
- **Custom Short Links**: Users can create personalized short links for better branding.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/linkwhiz.git
   cd linkwhiz
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the database using Supabase**:

   - Create a new project in Supabase.
   - Obtain your Supabase URL and API key.
   - Set the following environment variables in your `.env` file:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_KEY=your_supabase_key
     ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Troubleshooting

- If you encounter issues during installation, ensure that Node.js and npm are installed on your machine.
- Check your `.env` file for correct Supabase credentials.

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. Here are some examples of how to use the application:

### Creating a Short Link

1. Navigate to the "Create Link" page.
2. Enter the long URL you wish to shorten.
3. Click the "Create" button to generate your short link.

### API Usage

You can interact with the API directly using tools like Postman or cURL. Here are some example requests:

- **Create a new URL**:

  ```bash
  curl -X POST http://localhost:3000/urls -H "Content-Type: application/json" -d '{"longUrl": "https://example.com"}'
  ```

- **Get all URLs**:
  ```bash
  curl -X GET http://localhost:3000/urls
  ```

## Components

- **Create_link.jsx**: This component provides a form for users to input their long URLs and create short links. It handles form validation and displays success or error messages.
- **LinksCard.jsx**: Displays individual links with options to edit or delete. It shows the original URL, the shortened link, and click statistics.
- **device_stats.jsx**: A component that visualizes device usage statistics for the shortened links.
- **error.jsx**: Displays error messages in a user-friendly format.
- **header.jsx**: The main header component that includes navigation links and branding.
- **loader.jsx**: A loading spinner component that indicates when data is being fetched.
- **location-stats.jsx**: Displays statistics related to user locations, helping to understand where the clicks are coming from.
- **login.jsx**: A component for user login, including form validation and error handling.
- **signup.jsx**: A component for user registration, allowing new users to create an account.

## Hooks

- **use-fetch.jsx**: A custom hook that simplifies data fetching from APIs. It manages loading states and errors, making it easier to handle asynchronous operations in components.

### Example Usage

```javascript
const { data, loading, error } = useFetch("/api/urls");
```

## Database

The application uses Supabase as its backend database. The following files handle API interactions:

- **apiAuth.js**: Contains functions for user authentication, including login and signup.
- **apiClicks.js**: Manages click tracking for shortened URLs, storing click data in the database.
- **apiUrls.js**: Handles URL creation, retrieval, and deletion.
- **supabase.js**: Initializes the Supabase client and provides methods for interacting with the database.

### Database Schema

- **Users**: Stores user information, including email and password.
- **URLs**: Contains the original long URLs, shortened links, and click statistics.

## Pages

- **Auth.jsx**: The authentication page for login and signup, providing a seamless user experience.
- **Dashboard.jsx**: The main dashboard where users can manage their links, view statistics, and access other features.
- **Landing.jsx**: The landing page for new users, providing an overview of the service and encouraging signups.
- **Link.jsx**: Displays details of a specific shortened link, including click statistics and options to edit or delete.
- **Redirect.jsx**: Handles redirection from short links to the original URLs, ensuring a smooth user experience.

## Conclusion

This README provides an overview of the LinkWhiz project, including its features, installation instructions, and detailed descriptions of components, hooks, and pages. For further information, refer to the codebase or Supabase documentation. We welcome contributions and feedback from the community to improve the project further.
