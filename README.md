**Functionalities Implemented:**

1. User Dashboard – View assigned tasks, track progress, and get task insights.
2. Task Management – Create, update, and track tasks with due dates and priorities.
3. Automated Status Updates – Task status changes automatically based on the checklist.
4. Team Collaboration – Assign tasks to multiple users and track completion.
5. Priority & Progress Tracking – Categorize tasks by priority and monitor completion levels.
6. Task Report Downloads – Export task data for analysis and tracking.
7. Attachments Support – Add and access task-related file links easily.
8. Mobile Responsive UI – Seamless experience on desktop, tablet, and mobile.




Forntend
npm i axios moment react-hot-toast react-icons react-router-dom recharts

Backend
npm i express jsonwebtoken mongoose multer bcryptjs cors dotenv exceljs

Creating HEX Secret Key for jwt
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"