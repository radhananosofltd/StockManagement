# Stock Management UI

A modern Angular application for managing company data with a clean, user-friendly interface. This application allows users to input Company ID and Company Name data and submit it to an API endpoint.

## Features

- ✨ **Modern UI Design**: Clean, responsive form with gradient backgrounds and smooth animations
- 🔍 **Input Validation**: Real-time validation for Company ID and Company Name fields
- 🌐 **API Integration**: Built-in service for API communication with proper error handling
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessibility**: Focus management and screen reader support
- 🎯 **User Feedback**: Success and error messages with visual indicators
- ⚡ **Loading States**: Interactive loading spinner during form submission

## Form Fields

### Company ID
- **Required**: Yes
- **Minimum Length**: 2 characters
- **Pattern**: Only letters and numbers allowed
- **Examples**: AAPL, GOOGL, MSFT, TSLA

### Company Name
- **Required**: Yes
- **Minimum Length**: 2 characters
- **Examples**: Apple Inc., Google LLC, Microsoft Corporation

## API Integration

The application includes a `CompanyService` that handles API communication:

### Endpoints
- `POST /companies` - Submit new company data
- `GET /companies` - Retrieve all companies
- `GET /companies/:id` - Get specific company by ID

### API Configuration
To use with a real API, update the `apiUrl` in the `CompanyService` class:

```typescript
private readonly apiUrl = 'https://your-api-endpoint.com/companies';
```

### Demo Mode
Currently configured with a simulation that demonstrates the form functionality without requiring a real API endpoint.

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20.3.8)

### Installation
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser to http://localhost:4200
```

### Building for Production
```bash
# Build for production
ng build --prod

# Files will be generated in dist/ directory
```

## Project Structure

```
src/app/
├── app.ts              # Main application component with form logic
├── app.html            # Form template with validation
├── app.css             # Comprehensive styling and responsive design
├── app.config.ts       # Angular configuration with HttpClient
└── app.routes.ts       # Application routing configuration
```

## Key Components

### Company Interface
```typescript
interface Company {
  id: string;      // Company ticker symbol
  name: string;    // Full company name
}
```

### Form Validation
- Real-time validation feedback
- Error message display
- Form state management
- Accessibility compliance

### Responsive Design
- Mobile-first approach
- Flexible layout system
- Touch-friendly interface
- Cross-browser compatibility

## Usage Instructions

1. **Enter Company ID**: Input a valid stock ticker symbol (e.g., AAPL for Apple)
2. **Enter Company Name**: Provide the full company name (e.g., Apple Inc.)
3. **Submit**: Click the "Submit Company" button to send data to the API
4. **Reset**: Use the "Reset" button to clear the form and start over

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Company Apple Inc. (AAPL) has been successfully submitted!",
  "data": {
    "id": "AAPL",
    "name": "Apple Inc."
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Commands

```bash
# Start development server
ng serve

# Run tests
ng test

# Build for production
ng build

# Run linting
ng lint

# Generate new component
ng generate component component-name
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
