# Anonymous HealthCare

Anonymous HealthCare is an online platform designed to provide convenient and confidential healthcare services. This project aims to create a user-friendly system that offers various features to facilitate medical consultations, appointment scheduling, secure payments, access to health records, and information sharing within a secure and private environment.

## Features

### Online Chat and Messaging

- **Request for chat:** The system will enable users to request a chat session with a customer rep to solve navigation issues.
- **Request for video call:** The system will allow users to request a video call session with a doctor for virtual consultations.
- **See doctor profile:** The system will allow users to view the profiles of doctors, including their qualifications, specialties, and experience.
- **Chat Profile:** The system will allow the users to view the profile of the person they are chatting with as well as search others.
- **Book doctor appointment:** The system will allow users the option to schedule appointments with doctors.

### Payment

- **Online payment options:** The system offers various online payment methods, providing users with flexibility and convenience.
- **Payments history:** The system will allow users to access and review their past payments.
- **Invoice:** The system will generate invoices for transactions, providing detailed information about the payment
- **Secure payment processing:** The system ensures the protection of sensitive payment information during the transaction process, prioritizing the privacy and security of users' financial data.
- **Anonymous payment (only TrxID):** The system will allow users to make anonymous transactions, ensuring privacy and confidentiality.

### Doctor Page Options/ Search

- **Add review:** The system will allow users to create and submit reviews to doctors.
- **Search for doctors:** The system will allow users to search for specific queries or posts related to healthcare topics within the system.
- **Availability status:** The system will allow users to check if a particular doctor is available or not, patients can only book appointments if a doctor is available.
- **Filter search:** The system will provide filtering options to refine search results based on specific criteria, such as relevance, date, or category.
- **Add rating:** The system will allow users to give ratings to doctors.

### Patients Management

- **Store digital records:** The system will securely store and manage electronic records as an admin dashboard.
- **Patients profile management:** The system will allow admin to make a user as an admin.
- **Confirm patient booking:** The system will allow admin to confirm patient appointments after receiving payment.
- **Patient update profile:** The system will allow the patient to update their profile.
- **Delete user profile:** The system will allow the admin to have the option to delete their profile and associated data from the system.

#
## Installation and Setup

1. Clone the repository to your local machine.
2. Run npm i in the terminal of the project directory to install the required node modules.
3. Configure the database connection and other necessary settings present in the .env.example file in another .env file.
4. Run the system using the provided startup command or script.
5. Access the system through the provided URL or port number.

## Technologies Used

- Programming Language: [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- Web Stack: [MERN](https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,a%20client%2Dside%20JavaScript%20framework)
- Payment Gateway Integration: [PayPal](https://www.paypal.com/)
- Chat and Video Call Integration: [Socket.IO](https://socket.io/), [WebRTC](https://webrtc.org/)


## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license.
