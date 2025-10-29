# Stock Management UI<<<<<<< HEAD

# Stock Management UI

A comprehensive Angular application for managing stock and company data with centralized API endpoints, modern dashboard interface, and professional form validation.

A modern Angular application for managing company data with a clean, user-friendly interface. This application allows users to input Company ID and Company Name data and submit it to an API endpoint.

## 🚀 Features

## Features

### **Core Functionality**

- ✨ **Modern Dashboard**: Professional sidebar navigation with responsive design- ✨ **Modern UI Design**: Clean, responsive form with gradient backgrounds and smooth animations

- 🏢 **Company Management**: Complete CRUD operations with form validation- 🔍 **Input Validation**: Real-time validation for Company ID and Company Name fields

- 📊 **Stock Management**: Ready for stock data management (expandable)- 🌐 **API Integration**: Built-in service for API communication with proper error handling

- 📈 **Reports**: Framework for generating various reports- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

- 🔄 **API Integration**: Centralized endpoint management with environment support- ♿ **Accessibility**: Focus management and screen reader support

- 🎯 **User Feedback**: Success and error messages with visual indicators

### **Technical Features**- ⚡ **Loading States**: Interactive loading spinner during form submission

- 🎯 **Centralized API Constants**: All endpoints organized in constants files

- 🌍 **Environment Management**: Development, staging, and production configurations  ## Form Fields

- 🔧 **HTTP Service**: Generic service for consistent API calls

- 🛡️ **Form Validation**: Advanced validation with custom validators### Company ID

- 📱 **Responsive Design**: Works seamlessly across all devices- **Required**: Yes

- ⚡ **Mock Data Support**: Development mode with simulated API responses- **Minimum Length**: 2 characters

- **Pattern**: Only letters and numbers allowed

## 📋 Form Validation- **Examples**: AAPL, GOOGL, MSFT, TSLA



### Company ID (Integer Only)### Company Name

- **Type**: Number input with custom validation- **Required**: Yes

- **Validation**: Positive integers only, no decimal values- **Minimum Length**: 2 characters

- **Input Restriction**: Keypress prevention for non-numeric characters- **Examples**: Apple Inc., Google LLC, Microsoft Corporation

- **Examples**: 1001, 2500, 9999

## API Integration

### Company Name

- **Required**: YesThe application includes a `CompanyService` that handles API communication:

- **Minimum Length**: 2 characters

- **Examples**: Apple Inc., Microsoft Corporation, Tesla Inc.### Endpoints

- `POST /companies` - Submit new company data

## 🏗️ Architecture- `GET /companies` - Retrieve all companies

- `GET /companies/:id` - Get specific company by ID

### **API Constants Structure**

```### API Configuration

src/app/constants/To use with a real API, update the `apiUrl` in the `CompanyService` class:

├── api-endpoints.constants.ts    # All API endpoints

├── environment.constants.ts      # Environment configuration```typescript

└── index.ts                     # Barrel exportsprivate readonly apiUrl = 'https://your-api-endpoint.com/companies';

``````



### **Services Structure**### Demo Mode

```Currently configured with a simulation that demonstrates the form functionality without requiring a real API endpoint.

src/app/services/

├── http.service.ts              # Generic HTTP service## Development Setup

├── company.service.ts           # Company-specific operations

└── index.ts                     # Service exports### Prerequisites

```- Node.js (v18 or higher)

- npm (v9 or higher)

### **Available API Endpoints**- Angular CLI (v20.3.8)

- **Company**: CRUD, search, bulk operations, import/export

- **Stock**: Price data, history, portfolio, market data### Installation

- **Portfolio**: Management, analytics, risk analysis```bash

- **Reports**: Generation, export (PDF, Excel, CSV)# Install dependencies

- **User**: Authentication, profile, preferencesnpm install

- **Dashboard**: Summary, statistics, widgets

# Start development server

## 🛠️ Development Setupng serve



### Prerequisites# Open browser to http://localhost:4200

- Node.js (v18 or higher)```

- npm (v9 or higher)

- Angular CLI (v20.3.8)### Building for Production

```bash

### Installation & Running# Build for production

```bashng build --prod

# Install dependencies

npm install# Files will be generated in dist/ directory

```

# Start development server

ng serve --port 4201## Project Structure



# Build for production```

ng build --configuration productionsrc/app/

```├── app.ts              # Main application component with form logic

├── app.html            # Form template with validation

## 🌍 Environment Configuration├── app.css             # Comprehensive styling and responsive design

├── app.config.ts       # Angular configuration with HttpClient

### Development Environment└── app.routes.ts       # Application routing configuration

- API Base URL: `https://api-dev.example.com````

- Mock Data: ✅ Enabled

- Logging: ✅ Enabled## Key Components

- Features: All enabled

### Company Interface

### Production Environment```typescript

- API Base URL: `https://api.example.com`interface Company {

- Mock Data: ❌ Disabled  id: string;      // Company ticker symbol

- Logging: ❌ Disabled  name: string;    // Full company name

- Features: All enabled}

```

## 📚 Usage Examples

### Form Validation

### Basic API Endpoint Usage- Real-time validation feedback

```typescript- Error message display

import { COMPANY_ENDPOINTS } from './constants';- Form state management

- Accessibility compliance

// Direct endpoint usage

const createUrl = COMPANY_ENDPOINTS.CREATE;### Responsive Design

const getByIdUrl = COMPANY_ENDPOINTS.GET_BY_ID(123);- Mobile-first approach

```- Flexible layout system

- Touch-friendly interface

### Service Usage- Cross-browser compatibility

```typescript

import { CompanyService } from './services';## Usage Instructions



// Inject service and use1. **Enter Company ID**: Input a valid stock ticker symbol (e.g., AAPL for Apple)

this.companyService.submitCompany(companyData).subscribe(response => {2. **Enter Company Name**: Provide the full company name (e.g., Apple Inc.)

  console.log('Company created:', response);3. **Submit**: Click the "Submit Company" button to send data to the API

});4. **Reset**: Use the "Reset" button to clear the form and start over

```

## API Response Format

### URL Building with Parameters

```typescript### Success Response

import { buildApiUrl, COMPANY_ENDPOINTS } from './constants';```json

{

const searchUrl = buildApiUrl(COMPANY_ENDPOINTS.SEARCH, {  "success": true,

  search: 'Apple',  "message": "Company Apple Inc. (AAPL) has been successfully submitted!",

  limit: 10,  "data": {

  page: 1    "id": "AAPL",

});    "name": "Apple Inc."

```  }

}

## 🎨 UI Components```



### Dashboard Layout### Error Response

- **Header**: Application title and navigation```json

- **Sidebar**: Left navigation with menu items{

- **Content Area**: Dynamic page content  "success": false,

- **Responsive**: Mobile-friendly design  "message": "Error message describing what went wrong"

}

### Company Management Page```

- **Form**: Reactive forms with validation

- **Quick Actions**: View, import, export functionality  ## Browser Support

- **Success/Error States**: User feedback with styled messages

- **Loading States**: Spinner during API calls- Chrome (latest)

- Firefox (latest)

## 🔧 Development Commands- Safari (latest)

- Edge (latest)

```bash- Mobile browsers (iOS Safari, Chrome Mobile)

# Development

ng serve --port 4201          # Start dev server## Development Commands

ng build --configuration development  # Development build

```bash

# Production# Start development server

ng build --configuration production   # Production buildng serve



# Testing & Quality# Run tests

ng test                       # Run unit testsng test

ng lint                       # Run linting

ng generate component name    # Generate component# Build for production

```ng build



## 📦 Project Structure# Run linting

ng lint

```

src/app/# Generate new component

├── constants/                # API endpoints and environment configng generate component component-name

│   ├── api-endpoints.constants.ts```

│   ├── environment.constants.ts

│   └── index.ts## Contributing

├── services/                 # HTTP and business logic services

│   ├── http.service.ts1. Fork the repository

│   ├── company.service.ts2. Create a feature branch

│   └── index.ts3. Make your changes

├── components/               # UI components4. Add tests if applicable

│   ├── dashboard.component.ts5. Submit a pull request

│   ├── sidebar.component.ts

│   ├── company-page.component.ts## License

│   └── home-page.component.ts

├── app.routes.ts            # Application routingThis project is licensed under the MIT License.

├── app.config.ts            # Angular configuration=======

└── main.ts                  # Application bootstrap# StockManagement

```StockManagement

>>>>>>> f76d16e96b2617be0f9f1b20b500dbbe18bb1f9b

## 🚀 Deployment Status

- ✅ **Development Build**: Ready
- ✅ **Production Build**: Ready  
- ✅ **Code Committed**: Git repository initialized
- ✅ **API Constants**: Centralized and organized
- ✅ **Type Safety**: Full TypeScript support

## 🔄 API Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Company Apple Inc. (1001) has been successfully added!",
  "data": {
    "id": 1001,
    "name": "Apple Inc.",
    "createdAt": "2025-10-30T00:00:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to create company",
  "error": "Validation error: Company ID already exists"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎯 Ready for Production!** This application is fully functional with centralized API management, professional UI design, and comprehensive validation systems.