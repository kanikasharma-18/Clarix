# Clarix
Bridging the invisible learning gaps through AI-driven, real-time conceptual mapping and personalizing learning paths for every student.

1 Problem Statement
The Silent Academic Dropout Crisis
 Problem Description
A significant number of students enter higher education without mastering foundational concepts. Traditional classroom models assume uniform learning pace and understanding, but in reality, learning is highly individual. Some students grasp concepts quickly, while others struggle silently.
In large classrooms, teachers cannot track individual conceptual clarity in real time. Assessment systems rely heavily on periodic exams that measure performance outcomes rather than continuous understanding. When a student fails to grasp a foundational concept the gap often remains undetected.
These hidden gaps compound over time as advanced topics build on weak prerequisites. By the time the problem appears in exam results, months of learning have already been constructed on unstable foundations. This leads to declining confidence, disengagement, underperformance, and in severe cases, academic dropout.
Despite the abundance of online content, current platforms primarily deliver information passively. They do not dynamically adapt to each student’s conceptual understanding.
The real problem is not lack of content — it is the absence of a scalable, intelligent system that continuously monitors concept-level mastery and intervenes before academic failure becomes inevitable.

 Target Users
 Primary Users: Students
Students struggling with particular concepts, especially those aiming to master strong academic fundamentals. Students with limited access to personalized mentoring.
 Secondary Users
Teachers and professors who need tools to manage and track individual conceptual understanding in large classrooms.
 Institutional Stakeholders
Colleges and universities aiming to reduce dropout rates and improve academic performance metrics.

 Existing Gaps
Existing education systems focus on content delivery and outcome measurement rather than continuous understanding assessment.
There is a structural gap in:
Concept-level intelligence
Early detection of foundational weaknesses
Dynamic learning adaptation
Real-time academic intervention
Current systems measure marks not mastery. They identify failure after it occurs, rather than preventing it.

2 Problem Understanding & Approach
 Root Cause Analysis
The crisis stems from systemic structural limitations:
1 One-Size-Fits-All Teaching
Uniform pace ignores individual learning differences.
2 Marks-Based Evaluation
Scores reflect outcomes, not conceptual understanding.
3  Delayed Gap Detection
Weaknesses are discovered only after major exams.
4 No Concept-Level Visibility
Students receive subject-level feedback instead of granular insights into specific weak concepts.
5 Lack of Adaptive Learning Flow
Students progress linearly even if prerequisite concepts are not mastered.
These issues lead to compounded confusion, academic anxiety, and disengagement.

Solution Strategy
CLARIX reframes learning as a concept-level mastery problem instead of a syllabus-completion problem.
Our strategy:
Model subjects as structured knowledge graphs
Continuously estimate student mastery at a concept level
Detect weaknesses in real time i.e. Detects gaps before exams.
Enforce prerequisite mastery before progression
Dynamically adapt learning paths
Provide teacher-level visibility with early intervention alerts
The MVP demonstrates this strategy using Calculus as a proof of concept.

3 Proposed Solution
 Solution Overview
CLARIX is an AI-powered adaptive learning platform that functions as a real-time academic intelligence system.
Instead of relying solely on periodic exams, CLARIX continuously evaluates student interactions to:
Map conceptual understanding
Identify hidden knowledge gaps
Personalize learning progression
Prevent academic failure before it occurs
The system integrates:
Knowledge Graph Initialization
Real-time Interactive Learning Session and assessments.
Quiz Engine (A mastery estimation engine)
Gap Detector and Real-Time Gap Radar
Adaptive Learning Path Generator
Personalized Recommendation Engine
Progress Tracking &  Early Intervention Engine
Student and teacher dashboards

 Core Idea
The core idea of CLARIX is to shift education from reactive evaluation to proactive understanding detection.
Rather than just exam performance we shift the focus on deeper conceptual understanding. 
Each student has a dynamic knowledge profile that updates continuously. If mastery of a concept falls below a defined threshold, the system automatically:
Flags the gap
Reroutes the learning path
Recommends targeted reinforcement
Alerts educators if necessary
This ensures strong foundational learning before progression.

 Key Features
 Concept Knowledge Graph
Subjects are structured as hierarchical concept nodes with prerequisite dependencies.
 Diagnostic & Interactive Assessments
Bite-sized quizzes map responses to specific concept nodes.
 Real-Time Mastery Estimation
A scoring engine evaluates understanding using accuracy, attempts, and response time.
 Gap Detection Engine
Concepts below mastery threshold are automatically flagged.
 Adaptive Learning Paths
Students cannot progress to advanced topics without mastering prerequisites.
 Personalized Recommendations
Targeted exercises and learning resources are suggested for weak concepts.
 Student Dashboard
Visual heatmaps display mastery levels across concepts.
 Teacher Dashboard
Class-level analytics highlight widespread weaknesses and at-risk students.

Here is your ready-to-copy README section for System Architecture and Database Design, fully aligned with CLARIX.

4 System Architecture
High-Level Flow
Student / Teacher
        ↓
Frontend (Web / App Interface)
        ↓
Backend API Server
        ↓
Mastery Estimation Engine
        ↓
Knowledge Graph & Database
        ↓
Adaptive Path Generator
        ↓
Personalized Response (Dashboard / Recommendation / Alert)


 Architecture Description
CLARIX follows a modular, scalable architecture designed to simulate real-time academic intelligence.
1 Frontend Layer
The frontend provides two interfaces:
Student Interface
Take quizzes
View mastery heatmap
Receive adaptive recommendations
Track progress
Teacher Dashboard
View class-level mastery analytics
Identify at-risk students
Monitor concept-wise performance trends

2 Backend API Layer
The backend acts as the central controller and handles:
Authentication
Quiz submission processing
Mastery score computation
Concept prerequisite validation
Adaptive path logic
Dashboard data aggregation

3 Mastery Estimation Engine (Model Layer)
This is the intelligence core of CLARIX.
It calculates concept-level mastery using:
Accuracy
Number of attempts
Response time
(Optional) Confidence input
If mastery falls below threshold:
Concept is flagged as weak
Prerequisite logic blocks advanced progression
Reinforcement is triggered
This simulates a knowledge tracing model.

4 Database Layer
Stores:
Users
Concepts (Knowledge Graph)
Questions
Quiz attempts
Student concept mastery state
The database maintains a dynamic knowledge profile per student.

5 Adaptive Response Layer
Based on mastery state, the system:
Generates personalized learning paths
Suggests targeted resources
Updates student dashboard
Triggers teacher alerts
