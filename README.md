# Stock Management System# Stock Management System



A comprehensive full-stack application for managing stock and company data with modern Angular frontend, centralized API endpoints, and professional dashboard interface.A comprehensive full-stack application for managing stock and company data with modern Angular frontend, centralized API endpoints, and professional dashboard interface.



## 🏗️ Project Structure## 🏗️ Project Structure



``````

StockManagement/StockManagement/

├── frontend/                    # Angular Frontend Application├── frontend/                    # Angular Frontend Application

│   ├── src/app/                # Application source code│   ├── src/app/                # Application source code

│   │   ├── constants/          # API endpoints and environment config│   │   ├── constants/          # API endpoints and environment config

│   │   ├── services/           # HTTP and business logic services│   │   ├── services/           # HTTP and business logic services

│   │   ├── components/         # UI components│   │   ├── components/         # UI components

│   │   └── ...│   │   └── ...

│   ├── package.json            # Frontend dependencies│   ├── package.json            # Frontend dependencies

│   ├── angular.json            # Angular configuration│   ├── angular.json            # Angular configuration

│   └── ...│   └── ...

├── README.md                   # This file├── README.md                   # This file

├── .gitignore                  # Git ignore rules├── .gitignore                  # Git ignore rules

└── .git/                       # Git repository data└── .git/                       # Git repository data

``````



## 🚀 Frontend Features## 🚀 Frontend Features



### **Core Functionality**### **Core Functionality**

- ✨ **Modern Dashboard**: Professional sidebar navigation with responsive design- ✨ **Modern Dashboard**: Professional sidebar navigation with responsive design

- 🏢 **Company Management**: Complete CRUD operations with form validation- 🏢 **Company Management**: Complete CRUD operations with form validation

- 📊 **Stock Management**: Ready for stock data management (expandable)- 📊 **Stock Management**: Ready for stock data management (expandable)

- 📈 **Reports**: Framework for generating various reports- 📈 **Reports**: Framework for generating various reports

- 🔄 **API Integration**: Centralized endpoint management with environment support- 🔄 **API Integration**: Centralized endpoint management with environment support



### **Technical Features**### **Technical Features**

- 🎯 **Centralized API Constants**: All endpoints organized in constants files- 🎯 **Centralized API Constants**: All endpoints organized in constants files

- 🌍 **Environment Management**: Development, staging, and production configurations  - 🌍 **Environment Management**: Development, staging, and production configurations  

- 🔧 **HTTP Service**: Generic service for consistent API calls- 🔧 **HTTP Service**: Generic service for consistent API calls

- 🛡️ **Form Validation**: Advanced validation with custom validators- 🛡️ **Form Validation**: Advanced validation with custom validators

- 📱 **Responsive Design**: Works seamlessly across all devices- 📱 **Responsive Design**: Works seamlessly across all devices

- ⚡ **Mock Data Support**: Development mode with simulated API responses- ⚡ **Mock Data Support**: Development mode with simulated API responses



## 📋 Form Validation## 📋 Form Validation



### Company ID (Integer Only)### Company ID (Integer Only)

- **Type**: Number input with custom validation- **Type**: Number input with custom validation

- **Validation**: Positive integers only, no decimal values- **Validation**: Positive integers only, no decimal values

- **Input Restriction**: Keypress prevention for non-numeric characters- **Input Restriction**: Keypress prevention for non-numeric characters

- **Examples**: 1001, 2500, 9999- **Examples**: 1001, 2500, 9999



### Company Name### Company Name

- **Required**: Yes- **Required**: Yes

- **Minimum Length**: 2 characters- **Minimum Length**: 2 characters

- **Examples**: Apple Inc., Microsoft Corporation, Tesla Inc.- **Examples**: Apple Inc., Microsoft Corporation, Tesla Inc.



## 🛠️ Development Setup- 🔧 **HTTP Service**: Generic service for consistent API calls



### Prerequisites- 🛡️ **Form Validation**: Advanced validation with custom validators### Company ID

- Node.js (v18 or higher)

- npm (v9 or higher)- 📱 **Responsive Design**: Works seamlessly across all devices- **Required**: Yes

- Angular CLI (v20.3.8)

- ⚡ **Mock Data Support**: Development mode with simulated API responses- **Minimum Length**: 2 characters

### Frontend Setup

```bash- **Pattern**: Only letters and numbers allowed

# Navigate to frontend directory

cd frontend## 📋 Form Validation- **Examples**: AAPL, GOOGL, MSFT, TSLA



# Install dependencies

npm install

### Company ID (Integer Only)### Company Name

# Start development server

ng serve --port 4201- **Type**: Number input with custom validation- **Required**: Yes



# Build for production- **Validation**: Positive integers only, no decimal values- **Minimum Length**: 2 characters

ng build --configuration production

```- **Input Restriction**: Keypress prevention for non-numeric characters- **Examples**: Apple Inc., Google LLC, Microsoft Corporation



## 🌍 Environment Configuration- **Examples**: 1001, 2500, 9999



### Development Environment## API Integration

- API Base URL: `https://api-dev.example.com`

- Mock Data: ✅ Enabled### Company Name

- Logging: ✅ Enabled

- Features: All enabled- **Required**: YesThe application includes a `CompanyService` that handles API communication:



### Production Environment- **Minimum Length**: 2 characters

- API Base URL: `https://api.example.com`

- Mock Data: ❌ Disabled- **Examples**: Apple Inc., Microsoft Corporation, Tesla Inc.### Endpoints

- Logging: ❌ Disabled

- Features: All enabled- `POST /companies` - Submit new company data



## 📚 Usage Examples## 🏗️ Architecture- `GET /companies` - Retrieve all companies



### Basic API Endpoint Usage- `GET /companies/:id` - Get specific company by ID

```typescript

import { COMPANY_ENDPOINTS } from './constants';### **API Constants Structure**



// Direct endpoint usage```### API Configuration

const createUrl = COMPANY_ENDPOINTS.CREATE;

const getByIdUrl = COMPANY_ENDPOINTS.GET_BY_ID(123);src/app/constants/To use with a real API, update the `apiUrl` in the `CompanyService` class:

```

├── api-endpoints.constants.ts    # All API endpoints

### Service Usage

```typescript├── environment.constants.ts      # Environment configuration```typescript

import { CompanyService } from './services';

└── index.ts                     # Barrel exportsprivate readonly apiUrl = 'https://your-api-endpoint.com/companies';

// Inject service and use

this.companyService.submitCompany(companyData).subscribe(response => {``````

  console.log('Company created:', response);

});

```

### **Services Structure**### Demo Mode

### URL Building with Parameters

```typescript```Currently configured with a simulation that demonstrates the form functionality without requiring a real API endpoint.

import { buildApiUrl, COMPANY_ENDPOINTS } from './constants';

src/app/services/

const searchUrl = buildApiUrl(COMPANY_ENDPOINTS.SEARCH, {

  search: 'Apple',├── http.service.ts              # Generic HTTP service## Development Setup

  limit: 10,

  page: 1├── company.service.ts           # Company-specific operations

});

```└── index.ts                     # Service exports### Prerequisites



## 🎨 Frontend Architecture```- Node.js (v18 or higher)



### **API Constants Structure**- npm (v9 or higher)

```

frontend/src/app/constants/### **Available API Endpoints**- Angular CLI (v20.3.8)

├── api-endpoints.constants.ts    # All API endpoints

├── environment.constants.ts      # Environment configuration- **Company**: CRUD, search, bulk operations, import/export

└── index.ts                     # Barrel exports

```- **Stock**: Price data, history, portfolio, market data### Installation



### **Services Structure**- **Portfolio**: Management, analytics, risk analysis```bash

```

frontend/src/app/services/- **Reports**: Generation, export (PDF, Excel, CSV)# Install dependencies

├── http.service.ts              # Generic HTTP service

├── company.service.ts           # Company-specific operations- **User**: Authentication, profile, preferencesnpm install

└── index.ts                     # Service exports

```- **Dashboard**: Summary, statistics, widgets



### **Available API Endpoints**# Start development server

- **Company**: CRUD, search, bulk operations, import/export

- **Stock**: Price data, history, portfolio, market data## 🛠️ Development Setupng serve

- **Portfolio**: Management, analytics, risk analysis

- **Reports**: Generation, export (PDF, Excel, CSV)

- **User**: Authentication, profile, preferences

- **Dashboard**: Summary, statistics, widgets### Prerequisites# Open browser to http://localhost:4200



## 🎨 UI Components- Node.js (v18 or higher)```



### Dashboard Layout- npm (v9 or higher)

- **Header**: Application title and navigation

- **Sidebar**: Left navigation with menu items- Angular CLI (v20.3.8)### Building for Production

- **Content Area**: Dynamic page content

- **Responsive**: Mobile-friendly design```bash



### Company Management Page### Installation & Running# Build for production

- **Form**: Reactive forms with validation

- **Quick Actions**: View, import, export functionality  ```bashng build --prod

- **Success/Error States**: User feedback with styled messages

- **Loading States**: Spinner during API calls# Install dependencies



## 🔧 Development Commandsnpm install# Files will be generated in dist/ directory



```bash```

# Navigate to frontend first

cd frontend# Start development server



# Developmentng serve --port 4201## Project Structure

ng serve --port 4201          # Start dev server

ng build --configuration development  # Development build



# Production# Build for production```

ng build --configuration production   # Production build

ng build --configuration productionsrc/app/

# Testing & Quality

ng test                       # Run unit tests```├── app.ts              # Main application component with form logic

ng lint                       # Run linting

ng generate component name    # Generate component├── app.html            # Form template with validation

```

## 🌍 Environment Configuration├── app.css             # Comprehensive styling and responsive design

## 🚀 Deployment Status

├── app.config.ts       # Angular configuration with HttpClient

- ✅ **Development Build**: Ready

- ✅ **Production Build**: Ready  ### Development Environment└── app.routes.ts       # Application routing configuration

- ✅ **Code Committed**: Git repository initialized

- ✅ **API Constants**: Centralized and organized- API Base URL: `https://api-dev.example.com````

- ✅ **Type Safety**: Full TypeScript support

- ✅ **Project Structure**: Organized in frontend folder- Mock Data: ✅ Enabled



## 🔄 API Response Formats- Logging: ✅ Enabled## Key Components



### Success Response- Features: All enabled

```json

{### Company Interface

  "success": true,

  "message": "Company Apple Inc. (1001) has been successfully added!",### Production Environment```typescript

  "data": {

    "id": 1001,- API Base URL: `https://api.example.com`interface Company {

    "name": "Apple Inc.",

    "createdAt": "2025-10-30T00:00:00Z"- Mock Data: ❌ Disabled  id: string;      // Company ticker symbol

  }

}- Logging: ❌ Disabled  name: string;    // Full company name

```

- Features: All enabled}

### Error Response

```json```

{

  "success": false,## 📚 Usage Examples

  "message": "Failed to create company",

  "error": "Validation error: Company ID already exists"### Form Validation

}

```### Basic API Endpoint Usage- Real-time validation feedback



## 🔮 Future Plans```typescript- Error message display



### Backend Developmentimport { COMPANY_ENDPOINTS } from './constants';- Form state management

- 🚧 **API Server**: Node.js/Express or Python/FastAPI backend

- 🚧 **Database**: PostgreSQL or MongoDB for data persistence- Accessibility compliance

- 🚧 **Authentication**: JWT-based user authentication

- 🚧 **Real-time Updates**: WebSocket integration for live data// Direct endpoint usage



### Additional Featuresconst createUrl = COMPANY_ENDPOINTS.CREATE;### Responsive Design

- 📊 **Analytics Dashboard**: Advanced reporting and charts

- 📱 **Mobile App**: React Native or Flutter mobile applicationconst getByIdUrl = COMPANY_ENDPOINTS.GET_BY_ID(123);- Mobile-first approach

- 🔒 **Security**: Enhanced security measures and encryption

- 🌐 **Multi-tenant**: Support for multiple organizations```- Flexible layout system



## 🤝 Contributing- Touch-friendly interface



1. Fork the repository### Service Usage- Cross-browser compatibility

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3. Make changes in the appropriate directory (`frontend/` for UI changes)```typescript

4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

5. Push to the branch (`git push origin feature/AmazingFeature`)import { CompanyService } from './services';## Usage Instructions

6. Open a Pull Request



## 📄 License

// Inject service and use1. **Enter Company ID**: Input a valid stock ticker symbol (e.g., AAPL for Apple)

This project is licensed under the MIT License - see the LICENSE file for details.

this.companyService.submitCompany(companyData).subscribe(response => {2. **Enter Company Name**: Provide the full company name (e.g., Apple Inc.)

---

  console.log('Company created:', response);3. **Submit**: Click the "Submit Company" button to send data to the API

**🎯 Full-Stack Ready!** The frontend is complete and organized for future backend integration. The project structure supports scalable development with clear separation of concerns.
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