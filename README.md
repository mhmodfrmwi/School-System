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
### Academic Year Lifecycle State Diagram
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
