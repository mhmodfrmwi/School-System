# Learnova

## Admin Diagrams

### Flowchart
```mermaid
flowchart TD
    A[Admin Login] --> B[Dashboard]
    B --> C[Academic Management]
    B --> D[User Management]
    B --> E[Curriculum Management]
    B --> F[Scheduling]
    B --> G[System Configuration]
    
    C --> C1[Create Academic Year]
    C --> C2[Add Semesters]
    C --> C3[Manage Grades]
    C --> C4[Create Classes]
    
    D --> D1[Add Teachers]
    D --> D2[Add Students]
    D --> D3[Add Parents]
    D --> D4[Add Admins]
    D --> D5[Bulk Student Import]
    D --> D6[Assign Students to Classes]
    
    E --> E1[Create Subjects]
    E --> E2[Assign Subjects to Grades]
    E --> E3[Manage Curriculum Structure]
    
    F --> F1[Create Class Schedules]
    F --> F2[Assign Teachers to Classes]
    F --> F3[Manage Timetables]
    F --> F4[Check Schedule Conflicts]
    
    G --> G1[Update Profile]
    G --> G2[Configure System Settings]
    G --> G3[Backup & Restore]
    G --> G4[Manage Academic Calendar]
```

### Sequence Diagram: Student Creation
```mermaid
sequenceDiagram
    participant Admin
    participant Controller
    participant Service
    participant Model
    participant EmailService
    
    Admin->>Controller: Submit student data
    Controller->>Controller: Validate input
    Controller->>Service: generateAcademicNumber()
    Service->>Model: Query last student
    Model-->>Service: Return last academic number
    Service->>Service: Generate new number
    Service-->>Controller: New academic number
    Controller->>Model: Find academic year
    Model-->>Controller: Academic year record
    Controller->>Model: Find grade
    Model-->>Controller: Grade record
    Controller->>Model: Create student
    Model-->>Controller: New student
    Controller->>EmailService: Send verification
    EmailService-->>Controller: Confirmation
    Controller-->>Admin: Success response
```

### Sequence Diagram: Admin Creating a Class Schedule
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant ScheduleController
    participant Validation
    participant DB
    
    Admin->>UI: Fills schedule form
    UI->>ScheduleController: POST /schedules
    ScheduleController->>Validation: validateScheduleData()
    Validation-->>ScheduleController: Validation result
    
    alt Validation failed
        ScheduleController-->>UI: Show errors
    else Validation passed
        ScheduleController->>DB: Find class
        ScheduleController->>DB: Find subject
        ScheduleController->>DB: Find teacher
        ScheduleController->>DB: Find academic year
        ScheduleController->>DB: Find semester
        
        alt Any entity not found
            ScheduleController-->>UI: Show not found error
        else All found
            ScheduleController->>DB: Check schedule conflicts
            DB-->>ScheduleController: Conflict status
            
            alt Conflict exists
                ScheduleController-->>UI: Show conflict details
            else No conflict
                ScheduleController->>DB: Create schedule
                DB-->>ScheduleController: New schedule
                ScheduleController-->>UI: Show success
            end
        end
    end
    UI-->>Admin: Display result
```
### Sequence Diagram: Admin Assigning Teacher to Class
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant ClassTeacherController
    participant Service
    participant DB
    
    Admin->>UI: Selects class, subject, teacher
    UI->>ClassTeacherController: POST /class-teachers
    ClassTeacherController->>Service: validateAssignment()
    
    Service->>DB: Find class
    Service->>DB: Find subject
    Service->>DB: Find teacher
    Service->>DB: Find academic year
    Service->>DB: Get current semester
    
    alt Any entity not found
        Service-->>ClassTeacherController: Error
    else All found
        Service->>DB: Check existing assignment
        alt Already assigned
            Service-->>ClassTeacherController: Conflict error
        else
            Service->>DB: Create class-teacher assignment
            DB-->>Service: New assignment
            Service-->>ClassTeacherController: Success
        end
    end
    
    ClassTeacherController-->>UI: Response
    UI-->>Admin: Show result
```
### Sequence Diagram: Admin Creating Curriculum Structure (Grade-Subject-Semester)
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant CurriculumController
    participant Service
    participant DB
    
    Admin->>UI: Selects grade, subject, academic year, semester
    UI->>CurriculumController: POST /grade-subject-semesters
    CurriculumController->>Service: createCurriculumStructure()
    
    Service->>DB: Find grade
    Service->>DB: Find subject
    Service->>DB: Find academic year
    Service->>DB: Find semester
    
    alt Any entity not found
        Service-->>CurriculumController: Error
    else All found
        Service->>DB: Check existing GradeSubject
        alt GradeSubject exists
            Service->>Service: Use existing GradeSubject ID
        else 
            Service->>DB: Create GradeSubject
            DB-->>Service: New GradeSubject
        end
        
        Service->>DB: Check existing GradeSubjectSemester
        alt Exists
            Service-->>CurriculumController: Conflict error
        else
            Service->>DB: Create GradeSubjectSemester
            DB-->>Service: New record
            Service-->>CurriculumController: Success
        end
    end
    
    CurriculumController-->>UI: Response
    UI-->>Admin: Show result
```
### Sequence Diagram: Admin Bulk Student Import
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant StudentController
    participant Service
    participant DB
    participant EmailService
    
    Admin->>UI: Uploads CSV file
    UI->>StudentController: POST /students/bulk
    StudentController->>Service: processBulkImport(file)
    
    loop For each student record
        Service->>Service: Validate student data
        alt Invalid
            Service->>Service: Log error
        else Valid
            Service->>DB: Check duplicate (email/phone)
            alt Duplicate
                Service->>Service: Log duplicate
            else
                Service->>Service: Generate academic number
                Service->>DB: Find grade
                Service->>DB: Find academic year
                Service->>DB: Create student
                DB-->>Service: New student
                Service->>EmailService: Send verification
            end
        end
    end
    
    Service-->>StudentController: Import results
    StudentController-->>UI: Summary report
    UI-->>Admin: Show import summary
```
### Sequence Diagram: Class Schedule Creation Sequence
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant ScheduleController
    participant Validation
    participant DB
    
    Admin->>UI: Fills schedule form
    UI->>ScheduleController: POST /schedules
    ScheduleController->>Validation: validateScheduleData()
    Validation-->>ScheduleController: Validation result
    
    alt Validation failed
        ScheduleController-->>UI: Show errors
    else Validation passed
        ScheduleController->>DB: Find class
        ScheduleController->>DB: Find subject
        ScheduleController->>DB: Find teacher
        ScheduleController->>DB: Find academic year
        ScheduleController->>DB: Find semester
        
        alt Any entity not found
            ScheduleController-->>UI: Show not found error
        else All found
            ScheduleController->>DB: Check schedule conflicts
            DB-->>ScheduleController: Conflict status
            
            alt Conflict exists
                ScheduleController-->>UI: Show conflict details
            else No conflict
                ScheduleController->>DB: Create schedule
                DB-->>ScheduleController: New schedule
                ScheduleController-->>UI: Show success
            end
        end
    end
    UI-->>Admin: Display result
```
### Sequence Diagram: Admin Profile Update
```mermaid
sequenceDiagram
    participant Admin
    participant UI
    participant AuthController
    participant Service
    participant DB
    participant FS[File System]
    
    Admin->>UI: Updates profile + uploads image
    UI->>AuthController: PUT /admin/profile
    AuthController->>Service: updateAdminProfile(adminId, data, file)
    
    alt Password change requested
        Service->>DB: Get admin with password
        DB-->>Service: Admin record
        Service->>Service: Verify current password
        alt Incorrect
            Service-->>AuthController: Error
        else Correct
            Service->>Service: Hash new password
            Service->>DB: Update admin
        end
    end
    
    alt Profile image uploaded
        Service->>FS: Delete old image if exists
        Service->>FS: Save new image
        Service->>DB: Update image path
    end
    
    alt Phone update requested
        Service->>DB: Update phone
    end
    
    DB-->>Service: Updated admin
    Service-->>AuthController: Success
    AuthController-->>UI: Updated admin data
    UI-->>Admin: Show updated profile
```
### Entity State Diagram: Academic Year Lifecycle
```mermaid
stateDiagram-v2
    [*] --> New
    New --> Active: Activate
    Active --> Archived: End of year
    Archived --> [*]
    
    state Active {
        [*] --> Planning
        Planning --> ClassesCreated: Create classes
        ClassesCreated --> StudentsAssigned: Assign students
        StudentsAssigned --> Ongoing: Start semester
        Ongoing --> SemesterBreak: End semester
        SemesterBreak --> Ongoing: New semester
    }
    
    state Archived {
        [*] --> ReadOnly
        ReadOnly --> ReportsGenerated: Generate reports
        ReportsGenerated --> [*]
    }
```
### Class Diagram: Core Admin Functionality
```mermaid
classDiagram
    class AdminController {
        +login()
        +updateProfile()
        +getDashboardData()
    }
    
    class AcademicManager {
        +createAcademicYear()
        +createSemester()
        +createGrade()
        +createClass()
        +deleteAcademicYear()
    }
    
    class UserManager {
        +createTeacher()
        +createStudent()
        +createParent()
        +createAdmin()
        +assignStudentsToClasses()
        +bulkImportStudents()
    }
    
    class CurriculumManager {
        +createSubject()
        +createGradeSubject()
        +createGradeSubjectSemester()
        +deleteSubject()
    }
    
    class ScheduleManager {
        +createSchedule()
        +createClassTeacherAssignment()
        +checkScheduleConflicts()
        +getTimetable()
    }
    
    class SystemManager {
        +configureSettings()
        +manageAcademicCalendar()
        +backupSystem()
    }
    
    AdminController --> AcademicManager
    AdminController --> UserManager
    AdminController --> CurriculumManager
    AdminController --> ScheduleManager
    AdminController --> SystemManager
    
    ScheduleManager --> ConflictDetector
    UserManager --> BulkImporter
    CurriculumManager --> StructureValidator
```

## Teacher Diagrams

### Class Diagram
```mermaid
classDiagram
    class Teacher {
        +_id: ObjectId
        +fullName: String
        +email: String
        +password: String
        +isVerified: Boolean
        +subjectId: ObjectId
        +academicNumber: String
        +profileImage: String
        +phone: String
        +login()
        +updateProfile()
    }
    
    class Contest {
        +_id: ObjectId
        +title: String
        +teacherId: ObjectId
        +startDate: Date
        +endDate: Date
        +requirements: String
        +subjectId: ObjectId
        +createContest()
        +updateContest()
        +deleteContest()
    }
    
    class VirtualRoom {
        +_id: ObjectId
        +title: String
        +link: String
        +startTime: Date
        +duration: Number
        +teacherId: ObjectId
        +createVirtualRoom()
        +updateVirtualRoom()
    }
    
    class Material {
        +_id: ObjectId
        +title: String
        +type: String
        +file_url: String
        +uploaded_by: ObjectId
        +createMaterial()
        +deleteMaterial()
    }
    
    class Question {
        +_id: ObjectId
        +questionText: String
        +questionType: String
        +choices: [String]
        +answer: String
        +createQuestion()
        +updateQuestion()
    }
    
    Teacher "1" -- "*" Contest : creates
    Teacher "1" -- "*" VirtualRoom : creates
    Teacher "1" -- "*" Material : uploads
    Teacher "1" -- "*" Question : creates
    Contest "1" -- "*" ContestTeam : has
    VirtualRoom "1" -- "*" VirtualRoomAttendance : has
```
Sequence Diagram: Teacher Login
```mermaid
sequenceDiagram
    actor Teacher
    participant UI as Frontend
    participant AuthController
    participant TeacherModel
    participant TokenUtil
    
    Teacher->>UI: Enters email/password
    UI->>AuthController: POST /login {email, password}
    AuthController->>TeacherModel: findOne({email})
    TeacherModel-->>AuthController: Teacher data
    alt Invalid credentials
        AuthController-->>UI: 401 Unauthorized
    else Not verified
        AuthController-->>UI: 401 Verify account
    else Valid
        AuthController->>TokenUtil: signToken(teacherId)
        TokenUtil-->>AuthController: JWT Token
        AuthController-->>UI: 200 {token, teacher}
    end
    UI-->>Teacher: Shows success message
```
Sequence Diagram: Virtual Room Creation Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant VRController
    participant VirtualRoomModel
    participant GradeSubjectSemesterModel
    
    Teacher->>UI: Fills VR form
    UI->>VRController: POST /virtual-rooms (VR data)
    VRController->>GradeSubjectSemesterModel: findById(gradeSubjectSemesterId)
    GradeSubjectSemesterModel-->>VRController: GSS document
    VRController->>VirtualRoomModel: create(newVirtualRoom)
    VirtualRoomModel-->>VRController: Saved VR document
    VRController->>RewardService: updatePoints("Adding VR")
    VRController-->>UI: 201 Created (VR details)
    UI-->>Teacher: Shows success message
```
Sequence Diagram: Exam Score Upload Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant ScoreController
    participant ExcelParser
    participant SubjectScoreModel
    participant ScoreModel
    
    Teacher->>UI: Uploads Excel file
    UI->>ScoreController: POST /scores/upload (file)
    ScoreController->>ExcelParser: parseFile(file)
    ExcelParser-->>ScoreController: JSON data
    loop For each student
        ScoreController->>SubjectScoreModel: findOrCreate()
        ScoreController->>ScoreModel: createOrUpdate()
    end
    ScoreController-->>UI: 200 OK (results)
    UI-->>Teacher: Shows upload summary
```
Sequence Diagram: Material Creation Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant MaterialController
    participant MaterialModel
    participant GSSModel
    
    Teacher->>UI: Fills material form
    UI->>MaterialController: POST /materials (data)
    MaterialController->>GSSModel: findById(gradeSubjectSemesterId)
    GSSModel-->>MaterialController: GSS document
    MaterialController->>MaterialModel: create(newMaterial)
    MaterialModel-->>MaterialController: Saved material
    MaterialController->>RewardService: updatePoints("Adding Material")
    MaterialController-->>UI: 201 Created (material)
    UI-->>Teacher: Shows material preview
```
Sequence Diagram: Question Bank Management Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant QuestionController
    participant QuestionModel
    participant GSSModel
    
    Teacher->>UI: Creates new question
    UI->>QuestionController: POST /questions (question data)
    QuestionController->>GSSModel: findById(gradeSubjectSemesterId)
    GSSModel-->>QuestionController: GSS document
    QuestionController->>QuestionModel: create(newQuestion)
    QuestionModel-->>QuestionController: Saved question
    QuestionController->>RewardService: updatePoints("Adding Question")
    QuestionController-->>UI: 201 Created (question)
    UI-->>Teacher: Shows question in bank
```
Sequence Diagram: Attendance Management Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant AttendanceController
    participant AttendanceModel
    participant ClassModel
    
    Teacher->>UI: Requests class attendance
    UI->>AttendanceController: GET /attendance?classId=X&start=Y&end=Z
    AttendanceController->>ClassModel: findById(classId)
    ClassModel-->>AttendanceController: Class document
    AttendanceController->>AttendanceModel: find({classId, date range})
    AttendanceModel-->>AttendanceController: Attendance records
    AttendanceController-->>UI: 200 OK (attendance data)
    UI-->>Teacher: Displays attendance report
```
Sequence Diagram: Contest Creation Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant ContestController
    participant ContestModel
    participant ClassTeacherModel
    
    Teacher->>UI: Fills contest form
    UI->>ContestController: POST /contests (contest data)
    ContestController->>ClassTeacherModel: verifyAssignment(teacherId, subject, class)
    ClassTeacherModel-->>ContestController: Verification result
    ContestController->>ContestModel: create(newContest)
    ContestModel-->>ContestController: Saved contest
    ContestController->>RewardService: updatePoints("Adding Contest")
    ContestController-->>UI: 201 Created (contest details)
    UI-->>Teacher: Shows contest dashboard
```
Sequence Diagram: Profile Update Sequence
```mermaid
sequenceDiagram
    participant Teacher
    participant UI as Frontend
    participant ProfileController
    participant TeacherModel
    participant FileStorage
    
    Teacher->>UI: Updates profile + uploads image
    UI->>ProfileController: PUT /profile (data + file)
    ProfileController->>TeacherModel: findById(teacherId)
    TeacherModel-->>ProfileController: Teacher document
    alt Password change
        ProfileController->>TeacherModel: comparePassword(oldPassword)
        ProfileController->>TeacherModel: hashPassword(newPassword)
    end
    ProfileController->>FileStorage: uploadProfileImage(file)
    FileStorage-->>ProfileController: Image URL
    ProfileController->>TeacherModel: saveUpdates()
    TeacherModel-->>ProfileController: Updated teacher
    ProfileController-->>UI: 200 OK (updated profile)
    UI-->>Teacher: Shows updated profile
```
Entity-Relationship Diagram (ERD)
```mermaid
erDiagram
    TEACHER {
        ObjectId _id PK
        string fullName
        string email
        string password
        bool isVerified
        ObjectId subjectId FK
    }
    
    CONTEST {
        ObjectId _id PK
        string title
        ObjectId teacherId FK
        date startDate
        date endDate
        ObjectId subjectId FK
    }
    
    VIRTUAL-ROOM {
        ObjectId _id PK
        string title
        string link
        datetime startTime
        int duration
        ObjectId teacherId FK
    }
    
    MATERIAL {
        ObjectId _id PK
        string title
        string type
        string file_url
        ObjectId teacherId FK
    }
    
    QUESTION {
        ObjectId _id PK
        string questionText
        string questionType
        ObjectId teacherId FK
    }
    
    TEACHER ||--o{ CONTEST : creates
    TEACHER ||--o{ VIRTUAL-ROOM : conducts
    TEACHER ||--o{ MATERIAL : uploads
    TEACHER ||--o{ QUESTION : creates
    CONTEST ||--o{ CONTEST-TEAM : has
    VIRTUAL-ROOM ||--o{ VR-ATTENDANCE : has
```
