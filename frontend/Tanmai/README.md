# Food Donation Backend - Spring Boot

This is a Spring Boot backend application for managing food donation requests with OTP verification functionality.

## Features

- RESTful API for food donation applications
- OTP generation and verification
- Spring Security configuration
- CORS support for frontend integration
- H2 in-memory database for development
- Console logging of OTPs for demonstration

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── fooddonation/
│   │           ├── FoodDonationApplication.java
│   │           ├── config/
│   │           │   └── SecurityConfig.java
│   │           ├── controller/
│   │           │   └── DonationController.java
│   │           ├── model/
│   │           │   ├── DonationRequest.java
│   │           │   └── OtpVerificationRequest.java
│   │           └── service/
│   │               ├── DonationService.java
│   │               └── OtpService.java
│   └── resources/
│       ├── application.properties
│       └── static/
│           └── index.html
└── test/
    └── java/
        └── com/
            └── fooddonation/
                └── FoodDonationApplicationTests.java
```

## API Endpoints

### 1. Submit Application
- **URL:** `POST /api/submit-application`
- **Description:** Submit food donation application and generate OTP
- **Request Body:**
```json
{
    "name": "John Doe",
    "phone": "1234567890",
    "address": "123 Main St",
    "foodChoice": "canned-goods",
    "quantity": 4,
    "message": "Need food for family"
}
```

### 2. Verify OTP
- **URL:** `POST /api/verify-otp`
- **Description:** Verify the OTP sent to phone number
- **Request Body:**
```json
{
    "phone": "1234567890",
    "otp": "123456"
}
```

### 3. Save Donation
- **URL:** `POST /api/save-donation`
- **Description:** Save donation request after OTP verification
- **Request Body:** Same as submit application

## How to Run

1. **Prerequisites:**
   - Java 17 or higher
   - Maven 3.6 or higher

2. **Clone and Build:**
   ```bash
   mvn clean install
   ```

3. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the Application:**
   - API Base URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`
   - API Documentation: `http://localhost:8080`

## Configuration

The application uses H2 in-memory database for development. To use a different database, update the `application.properties` file:

```properties
# For MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/fooddonation
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

## Security

- CORS is enabled for all origins (configure for production)
- CSRF is disabled for API endpoints
- All API endpoints are publicly accessible

## OTP Functionality

- OTPs are 6-digit random numbers
- Generated OTPs are logged to console for demonstration
- In production, integrate with SMS service provider
- OTPs are stored in memory (use Redis for production)

## Frontend Integration

Update your React frontend to call these endpoints:

```javascript
// Submit application
const response = await fetch('http://localhost:8080/api/submit-application', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});

// Verify OTP
const otpResponse = await fetch('http://localhost:8080/api/verify-otp', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: phoneNumber, otp: enteredOtp })
});
```

## Development Notes

- OTPs are printed to console for testing
- Database is recreated on each restart (development mode)
- All endpoints return JSON responses
- Error handling is implemented for all endpoints

## Production Considerations

1. Replace H2 with production database
2. Implement proper SMS service integration
3. Add Redis for OTP storage with expiration
4. Configure proper CORS origins
5. Add authentication and authorization
6. Implement proper logging and monitoring
7. Add input validation and sanitization