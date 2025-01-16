Nyaaya - Court Case Management System
Nyaaya is a cutting-edge web-based platform designed to modernize the Indian judicial system by addressing inefficiencies in case registration, document management, and progress tracking. By leveraging technology, Nyaaya aims to streamline processes for advocates, litigants, and court administration, fostering transparency and efficiency.

📜 Problem Statement
Over 5.02 crore cases are pending in Indian courts. Traditional offline systems are plagued by inefficiencies such as:

Prolonged case registration times.
Ineffective document management.
Lack of real-time tracking for litigants.
Our Solution
Nyaaya offers a user-friendly platform to:

Enable advocates to manage cases seamlessly.
Provide litigants with real-time case tracking and lawyer selection.
Facilitate court administrators in securely storing and managing evidence and judgments.
🔍 Features
Role-based Login: Separate modules for advocates, litigants, and administrators.
Case Filing and Tracking: End-to-end case lifecycle management.
Secure Document Uploads: Centralized repository with role-specific access.
Lawyer Profiles: Browse and connect with verified advocates.
Real-time Updates: Instant notifications for case progress.
🎯 Objectives
Enhance efficiency by minimizing manual work.
Centralize and secure case-related data.
Promote transparency and real-time communication.
Ensure accuracy through standardized processes.
Deliver an intuitive and user-friendly interface.
💡 System Design
Proposed Workflow
Advocates:
Register using bar credentials.
Manage cases and upload evidence.
Access case details via unique case numbers.
Litigants:
Track case progress.
Connect with advocates via the platform.
Access court-approved documents.
Court Administrators:
Authenticate and update case records.
Upload evidence and judgments securely.
🛠️ Technology Stack
Frontend
HTML, CSS, JavaScript
Bootstrap, ReactJS
Backend
Node.js, Express.js
Database
MongoDB
Tools
Visual Studio Code
💻 System Requirements
Software
Operating System: Windows 7/8/10
Development Tools: Node.js, Visual Studio Code
Hardware
Processor: Intel Pentium Dual Core (2.9 GHz or higher)
RAM: Minimum 2 GB
Hard Disk: Minimum 2 GB
📚 Literature Survey
Nyaaya draws inspiration from:

Russia: Early judiciary web portals for public awareness.
Ghana: Case filing and assignment systems.
Australia: Efforts to integrate fragmented systems into unified platforms.
🚀 How to Run
Prerequisites
Ensure Node.js and npm are installed on your machine.
Have MongoDB running on the default port (27017).
Step 1: Clone the Repository
git clone https://github.com/your-username/nyaaya.git
cd NyaayaG160
Step 2: Setup Frontend
Navigate to the frontend directory:
cd eportal
Install frontend dependencies:
npm install
Start the frontend server:
npm start
Open http://localhost:3000 in your browser to access the platform.
Step 3: Setup Backend
Open a new terminal and navigate to the backend directory:
cd NyaayaG160
cd server
Install backend dependencies:
npm install
Start the backend server:
node server.js
Ensure the backend is running on http://localhost:5000 (or as specified in the code).
Step 4: Configure Environment Variables
Create a .env file in the server directory and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/nyaaya
JWT_SECRET=your_secret_key
📊 Testing
Functional Testing: Validates user roles, case filings, and document uploads.
Integration Testing: Ensures seamless communication between frontend and backend.
🏁 Conclusion
Nyaaya addresses the inefficiencies of the current legal system by offering a streamlined, secure, and user-friendly digital platform. This solution enhances accountability, reduces delays, and ensures a better experience for all stakeholders in the judicial ecosystem.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

