# CLARIX
### Bridging the invisible learning gaps through AI-driven, real-time conceptual mapping and personalizing learning paths for every student.

---

## 1. Problem Statement

### The Silent Academic Dropout Crisis

#### Problem Description

A significant number of students enter higher education without mastering foundational concepts. Traditional classroom models assume uniform learning pace and understanding, but in reality, learning is highly individual. Some students grasp concepts quickly, while others struggle silently.

In large classrooms, teachers cannot track individual conceptual clarity in real time. Assessment systems rely heavily on periodic exams that measure performance outcomes rather than continuous understanding. When a student fails to grasp a foundational concept, the gap often remains undetected.

These hidden gaps compound over time as advanced topics build on weak prerequisites. By the time the problem appears in exam results, months of learning have already been constructed on unstable foundations. This leads to declining confidence, disengagement, underperformance, and in severe cases, academic dropout.

Despite the abundance of online content, current platforms primarily deliver information passively. They do not dynamically adapt to each student's conceptual understanding.

> The real problem is not lack of content — it is the absence of a scalable, intelligent system that continuously monitors concept-level mastery and intervenes before academic failure becomes inevitable.

---

#### Target Users

| User Type | Description |
|-----------|-------------|
| **Primary — Students** | Students struggling with particular concepts, especially those aiming to master strong academic fundamentals. Students with limited access to personalized mentoring. |
| **Secondary — Teachers** | Teachers and professors who need tools to manage and track individual conceptual understanding in large classrooms. |
| **Institutional Stakeholders** | Colleges and universities aiming to reduce dropout rates and improve academic performance metrics. |

---

#### Existing Gaps

Existing education systems focus on content delivery and outcome measurement rather than continuous understanding assessment. There is a structural gap in:

- Concept-level intelligence
- Early detection of foundational weaknesses
- Dynamic learning adaptation
- Real-time academic intervention

> Current systems measure **marks**, not **mastery**. They identify failure *after* it occurs, rather than *preventing* it.

---

## 2. Problem Understanding & Approach

### Root Cause Analysis

The crisis stems from systemic structural limitations:

| # | Root Cause | Description |
|---|-----------|-------------|
| 1 | **One-Size-Fits-All Teaching** | Uniform pace ignores individual learning differences |
| 2 | **Marks-Based Evaluation** | Scores reflect outcomes, not conceptual understanding |
| 3 | **Delayed Gap Detection** | Weaknesses are discovered only after major exams |
| 4 | **No Concept-Level Visibility** | Students receive subject-level feedback instead of granular insights into specific weak concepts |
| 5 | **Lack of Adaptive Learning Flow** | Students progress linearly even if prerequisite concepts are not mastered |

These issues lead to compounded confusion, academic anxiety, and disengagement.

---

### Solution Strategy

CLARIX reframes learning as a **concept-level mastery problem** instead of a syllabus-completion problem.

**Our strategy:**
- Model subjects as structured knowledge graphs
- Continuously estimate student mastery at a concept level
- Detect weaknesses in real time *(detects gaps before exams)*
- Enforce prerequisite mastery before progression
- Dynamically adapt learning paths
- Provide teacher-level visibility with early intervention alerts

> The MVP demonstrates this strategy using **Calculus** as a proof of concept.

---

## 3. Proposed Solution

### Solution Overview

CLARIX is an AI-powered adaptive learning platform that functions as a **real-time academic intelligence system**.

Instead of relying solely on periodic exams, CLARIX continuously evaluates student interactions to:
- Map conceptual understanding
- Identify hidden knowledge gaps
- Personalize learning progression
- Prevent academic failure before it occurs

**The system integrates:**
- Knowledge Graph Initialization
- Real-time Interactive Learning Sessions & Assessments
- Quiz Engine (Mastery Estimation Engine)
- Gap Detector and Real-Time Gap Radar
- Adaptive Learning Path Generator
- Personalized Recommendation Engine
- Progress Tracking & Early Intervention Engine
- Student and Teacher Dashboards

---

### Core Idea

> Shift education from **reactive evaluation** to **proactive understanding detection**.

Rather than just exam performance, CLARIX shifts focus to deeper conceptual understanding. Each student has a **dynamic knowledge profile** that updates continuously. If mastery of a concept falls below a defined threshold, the system automatically:

- Flags the gap
- Reroutes the learning path
- Recommends targeted reinforcement
- Alerts educators if necessary

This ensures strong foundational learning before progression.

---

### Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **Concept Knowledge Graph** | Subjects structured as hierarchical concept nodes with prerequisite dependencies |
| 📝 **Diagnostic & Interactive Assessments** | Bite-sized quizzes mapped to specific concept nodes |
| ⚡ **Real-Time Mastery Estimation** | Scoring engine evaluates understanding using accuracy, attempts, and response time |
| 🔍 **Gap Detection Engine** | Concepts below mastery threshold are automatically flagged |
| 🛤️ **Adaptive Learning Paths** | Students cannot progress without mastering prerequisites |
| 🎯 **Personalized Recommendations** | Targeted exercises and resources suggested for weak concepts |
| 📊 **Student Dashboard** | Visual heatmaps displaying mastery levels across all concepts |
| 👩‍🏫 **Teacher Dashboard** | Class-level analytics highlighting widespread weaknesses and at-risk students |

---

## 4. System Architecture

### High-Level Flow

```
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
```

---

### Architecture Description

CLARIX follows a **modular, scalable architecture** designed to simulate real-time academic intelligence.

#### 1. Frontend Layer
Provides two interfaces:

- **Student Interface**
  - Take quizzes
  - View mastery heatmap
  - Receive adaptive recommendations
  - Track progress

- **Teacher Dashboard**
  - View class-level mastery analytics
  - Identify at-risk students
  - Monitor concept-wise performance trends

#### 2. Backend API Layer
Acts as the central controller and handles:
- Authentication
- Quiz submission processing
- Mastery score computation
- Concept prerequisite validation
- Adaptive path logic
- Dashboard data aggregation

#### 3. Mastery Estimation Engine *(Model Layer)*
The intelligence core of CLARIX. Calculates concept-level mastery using:
- Accuracy
- Number of attempts
- Response time
- *(Optional)* Confidence input

If mastery falls below threshold:
- Concept is flagged as weak
- Prerequisite logic blocks advanced progression
- Reinforcement is triggered

> This simulates a **knowledge tracing model**.

#### 4. Database Layer
Stores:
- Users
- Concepts (Knowledge Graph)
- Questions
- Quiz Attempts
- Student Concept Mastery State

> The database maintains a **dynamic knowledge profile** per student.

#### 5. Adaptive Response Layer
Based on mastery state, the system:
- Generates personalized learning paths
- Suggests targeted resources
- Updates student dashboard
- Triggers teacher alerts

---

## 5. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Structure, styling, dynamic quizzes, API calls, adaptive UI logic |
| **Backend** | Python (Flask) | API development, quiz processing, mastery calculation, prerequisite checks, adaptive routing |
| **ML / AI** | Rule-based Mastery Engine (Python) | Accuracy, attempts & response time for gap detection; extendable to advanced ML |
| **Deployment** | Netlify (Frontend), GitHub | Version control and frontend hosting |

---

## 6. Module-wise Development & Deliverables

### Checkpoint 1 — Research & Planning

**Deliverables:**
- Problem validation and gap analysis
- Defined system architecture
- Knowledge graph structure (Calculus concepts)
- Finalized tech stack
- MVP scope definition

---

## 7. End-to-End Workflow

```
1. User Onboarding
   Student signs up / logs in and selects subject (e.g., Calculus)
           ↓
2. Diagnostic Assessment
   Student takes a short quiz mapped to specific concept nodes
   (limits, derivatives, integrals)
           ↓
3. Response Capture
   System records accuracy, attempts, and response time per question
           ↓
4. Mastery Estimation
   Backend computes concept-level mastery score using the
   rule-based mastery engine
           ↓
5. Gap Detection
   Concepts falling below mastery threshold are flagged as weak
           ↓
6. Adaptive Path Validation
   System checks prerequisite mastery and reroutes student if necessary
           ↓
7. Personalized Recommendations
   Targeted practice questions or learning resources suggested for
   weak concepts
           ↓
8. Dashboard & Intervention
   Student sees mastery heatmap; teacher dashboard displays
   class-level insights and flags at-risk learners
```

---

## 8. Demo & Repository

| Resource | Link |
|----------|------|
| 🐙 **GitHub Repository** | [github.com/kanikasharma-18/Clarix](https://github.com/kanikasharma-18/Clarix) |
| 🌐 **Live Demo** | [github.com/kanikasharma-18/Clarix](https://clarix.onrender.com) |
| 🎥 **Demo Video** | [github.com/kanikasharma-18/Clarix](https://drive.google.com/drive/folders/1Aswa68cQiowD_NLRLgaOj3uCWYPl3tcr?usp=sharing) |

---

## 9. Hackathon Deliverables Summary

- ✅ Working MVP of CLARIX demonstrating adaptive, concept-level learning
- ✅ Interactive Quiz Engine mapped to a structured Calculus knowledge graph
- ✅ Real-time Mastery & Gap Detection Engine (rule-based intelligence layer)
- ✅ Adaptive Learning Path with prerequisite enforcement
- ✅ Student Dashboard with mastery heatmap visualization
- ✅ Teacher Dashboard with class-level analytics and risk insights
- ✅ Deployed frontend (Netlify) with complete documentation (Architecture + ER Diagram + README)

---

## 10. Team Roles & Responsibilities

| Name | Role | Responsibilities |
|------|------|-----------------|
| **Kanika Sharma** | Backend Lead | System logic & core development |
| **Avkash Singh** | Frontend & UX Lead | Quiz interface, system design |
| **Twish Choudhary** | Architecture, Data & Presentation Lead | Architecture design, data modeling, presentation |

---

## 15. Future Scope & Scalability

### Short-Term
- Expand from Calculus to multiple subjects (Physics, Chemistry, Programming)
- Integrate basic AI explanations using LLM APIs
- Improve analytics with better visualization (trend tracking, progress graphs)
- Add confidence-based and difficulty-weighted mastery scoring

### Long-Term
- Implement probabilistic Knowledge Tracing (Bayesian Knowledge Tracing)
- Institution-wide deployment with multi-class analytics
- Personalized learning profiles across semesters
- Integration with LMS platforms and university ERP systems

---

## 16. Known Limitations

- Current mastery engine is rule-based *(not fully ML-trained)*
- Limited to a single-subject MVP (Calculus)
- Small question bank restricts deeper mastery estimation
- Requires backend hosting for full-scale deployment

---

## 17. Impact

| Impact Area | Description |
|-------------|-------------|
| 🔍 **Early Detection** | Enables early identification of hidden learning gaps |
| 🛡️ **Proactive Intervention** | Prevents academic underperformance before it occurs |
| 👩‍🏫 **Teacher Empowerment** | Real-time classroom intelligence for educators |
| 🎓 **Mastery over Marks** | Promotes deep conceptual learning over score-chasing |

---

<div align="center">

**CLARIX** — *Know the gap. Close it before it widens.*

</div>
