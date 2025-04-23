import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {

                    /////////////////////////////////////////////////////////////Student////////////////////////////////////////////////////////

                    //Nav
                    SearchStudentPage: "Search Student Page",
                    Logout: "Logout",
                    EditProfile: "Edit Profile",
                    NoMatches: " No matches found pages",
                    "routes": {
                        "grades": "Grades",
                        "grades/assignment": "Assignments",
                        "grades/exam": "Exams",
                        "schedule": "Schedule",
                        "schedule/exam": "Exam Schedule",
                        "library": "Library",
                        "motivation": "Motivation",
                        "activities": "Activities",
                        "activities/detailes": "Activity Details",
                        "activities/prizes": "Prizes",
                        "activities/contests": "Contests",
                        "virtualrooms": "Virtual Rooms",
                        "allcourses": "All Courses",
                        "attendance": "Attendance"
                    },
                    //Sidebar
                    KhatabSchool: "Khatab School",
                    Home: "Home",
                    Motivation: "Motivation",
                    Courses: "Courses",
                    Absence: "Absence",
                    Schedule: "Schedule",
                    GradeManagements: "Grade Managements",
                    Activities: "Activities",
                    Library: "Library",
                    SearchMangerPage: "Search Manger Page",
                    //Footer
                    LearnGrawSuccess: "Learn,Graw,Success",
                    EmpowerGrowth: "Empower Growth",
                    InspireLearning: "Inspire Learning",
                    DiscoverKowledge: "Discover Kowledge",
                    ImagineMore: "Imagine More",
                    Unlock: "Unlock",
                    DreamBig: "Dream Big",
                    ExploreIdeas: "Explore Ideas",
                    AchieveGreatness: "Achieve Greatness",
                    //Edit Profile
                    editProfile: {
                        title: "Edit Profile",
                        profileImageAlt: "Profile Image",
                        firstName: "First Name",
                        lastName: "Last Name",
                        gender: "Gender",
                        genderMale: "Male",
                        genderFemale: "Female",
                        phoneNumber: "Phone Number",
                        email: "Email",
                        role: "Role",
                        saveButton: "Save Changes",
                        changePasswordTitle: "Change Password",
                        currentPassword: "Current Password",
                        newPassword: "New Password",
                        confirmPassword: "Confirm New Password",
                        otpCode: "OTP Verification Code",
                        changePasswordButton: "Update Password",
                    },
                    //Dashboard
                    dashboard: {
                        profileImageAlt: "Student Profile Image",
                        presentIconAlt: "Present Icon",
                        presentToday: "You were present today!",
                        greenLevel: "Green Level",
                        diamondLevel: "Diamond Level",
                        goldLevel: "Gold Level",
                        awardIconAlt: "Award Icon",
                        learningStreak: "Learning Streak",
                        days: "days",
                        yourScore: "Your Score",
                        quickMenu: "Quick Menu",
                        mainCategories: "Main Categories",
                        continueReading: "Continue Reading",
                        recommendedToWatch: "Recommended To Watch",
                        continueButton: "Continue",
                        watchNow: "Watch Now",
                        type: "Type",
                        onlineAssignments: "Online Assignments",
                        exams: "Exams",
                        courseMaterials: "Course Materials",
                        reportCards: "Report Cards",
                        mailbox: "Mailbox",
                        assessments: "Assessments",
                        activities: "Activities",
                        virtualClassroom: "Virtual Classroom",
                        announcements: "Announcements",
                        videoLectures: "Video Lectures",
                        spellingLesson: "Spelling - Learn How To Spell Letters",
                        farmingLesson: "Lesson 1 - How to Grow and Take Care of Your Farm",
                        adaptationLesson: "Adaptation - About Bears Life",
                        atomVideo: "What is an atom?",
                        spellingVideo: "Let's improve our Spelling!"
                    },
                    menu: {
                        motivation: "Motivation",
                        courses: "Courses",
                        absence: "Absence",
                        schedule: "Schedule",
                        grades: "Grades",
                        activities: "Activities",
                        library: "Library"
                    },
                    subjects: {
                        english: "English",
                        arabic: "Arabic",
                        science: "Science"
                    },
                    //Motivation

                    motivation: {
                        aboutScore: "About Your Score",
                        newWayTitle: "The New Way of Learning",
                        newWayDesc: "With the Score System, Learning is full of entertainment and fun. For the first time, your interaction with different school activities will give you rewards, discounts, and exclusive offers for our members in many famous places and shops.",
                        whyTitle: "Why?",
                        whyDesc: "When you interact with different learning objects and activates, you will earn points and start competing with your colleagues based on the score of each one, exactly as if you are competing with them in a game.",
                        scoreIllustration: "Score Illustration",
                        profileFrame: "Profile Frame",
                        scheduleIcon: "Schedule Icon",
                        score: "Score",
                        forAllSemesters: "for all semesters",
                        activitiesTitle: "Number of Activities",
                        activitiesDesc: "The number of activities you interact with, for example, the number of discussions you participate in, the number of video lectures you view, the number of assignments you solve, the number of messages you send, and so on.",
                        weightTitle: "Weight",
                        weightDesc: "Each activity you do has a defined weight, for example, the weight of solving an assignment of 40 questions is definitely different from the weight of sending a message to your teacher and so on.",
                        gradeTitle: "Grade (If Applicable)",
                        gradeDesc: "In the exams or homework assignments, for example, the grade/mark you get will affect your score, so if you get the full mark you will get the maximum number of points for this exam/homework.",
                        timeTitle: "Time (If Applicable)",
                        timeDesc: "The faster you respond to your activities in Classera, the more points you get. For example, if you got a homework that is launched on Monday and is open until Thursday, if you submit it on Monday you will get up to 25% percent increase in your points, and if you submit it just before the deadline you will not get any extra bonus.",
                        summaryTitle: "Summary Of Your Score",
                        summaryDesc: "Every member starts his/her journey with a green membership card. In each semester, you will start earning points from the first day. Your final score at the end of the semester will determine the type of card you deserve to use throughout the next semester as recognition for your efforts.",
                        range1: "0 and 250",
                        range2: "251 to 400",
                        range3: "401 or more",
                        cardText: " Card.",
                        summaryPoint1: "If your points are between",
                        summaryPoint2: "in your school, you will be eligible for the Learnova",
                        scoreFactors: "Your score is based on many factors, below are the four main factors that affect your score."
                    },
                    badges: {
                        green: "Green",
                        gold: "Golden",
                        diamond: "Diamond"
                    },
                    table: {
                        weightsLimits: "Weights & Limits",
                        topStudents: "Top Students",
                        fullName: "Full Name",
                        academicNumber: "Academic Number",
                        totalPoints: "Total Points",
                        badge: "Badge",
                        module: "Module",
                        activity: "Activity",
                        points: "Points",
                        comments: "Comments",
                        examsHomework: "Exams, Homework Assignments and Activities",
                        eachQuestion: "For each question you solve",
                        points5: "5 points",
                        messages: "Messages",
                        eachMessage: "For each message you end or reply to",
                        messageComment: "Your score is based on the number of recipients who read your message. More reads = more points. If no one reads it, you get no points.",
                        courseMaterials: "Course Materials",
                        eachDownload: "For each course material you download",
                        virtualClassrooms: "Virtual Classrooms",
                        eachClass: "For each smart class you attend"
                    },
                    points: {
                        title: "Points Summary",
                        todayPoints: "Points Earned Today",
                        semesterPoints: "Your Score for this Semester",
                        allPoints: "Score for all semesters"
                    },
                    //Courses
                    courses: {
                        "allSubjects": "All Subjects",
                        "noSubjectsTitle": "No Subjects Available",
                        "noSubjectsMessage": "It looks like there are no subjects assigned to you at the moment. Please check back later.",
                        "noSubjectsAlt": "No Subjects Illustration",
                        "lastUpdate": "Last Update",
                        "startButton": "Start",
                    },
                    videoSection: {
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "main": {
                            "title": "Video Lectures",
                            "allTab": "All",
                            "bookmarksTab": "Bookmarks",
                            "noVideos": "No video materials available for this subject.",
                            "noBookmarks": "You haven't bookmarked any videos yet.",
                            "page": "Page",
                            "of": "of",
                            "loading": "Loading..."
                        },
                        "material": {
                            "type": "Type",
                            "view": "View",
                            "download": "Download"
                        }
                    },
                    materialSection: {
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "main": {
                            "title": "Course Material",
                            "allTab": "All",
                            "bookmarksTab": "Bookmarks",
                            "noMaterials": "No PDF materials available for this subject.",
                            "noBookmarks": "You haven't bookmarked any material yet.",
                            "page": "Page",
                            "of": "of",
                            "loading": "Loading..."
                        },
                        "material": {
                            "type": "Type",
                            "view": "View",
                            "download": "Download"
                        },
                        "error": {
                            "title": "Error!",
                            "confirmButton": "OK"
                        }
                    },
                    materialDetails: {
                        "header": {
                            "backButton": "Back"
                        },
                        "details": {
                            "description": "Description",
                            "type": "Type",
                            "uploadedBy": "Uploaded By",
                            "uploadDate": "Upload Date",
                            "download": "Download",
                            "downloadButton": "Download Material",
                            "noFile": "No file available for this material."
                        },
                        "errors": {
                            "title": "Error!",
                            "confirmButton": "OK",
                            "noMaterial": {
                                "title": "No Material Details Available",
                                "message": "It looks like there are no details available for this material.",
                                "backButton": "Go Back"
                            }
                        },
                        "mediaTypes": {
                            "youtube": "YouTube Video",
                            "pdf": "PDF Document",
                            "googleDoc": "Google Document",
                            "googleDrive": "Google Drive File"
                        }
                    },
                    virtualRooms: {
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "main": {
                            "title": "Virtual Rooms",
                            "allTab": "All",
                            "completedTab": "Completed",
                            "missedTab": "Missed",
                            "noRooms": "No virtual rooms available for this subject.",
                            "noCompleted": "No completed virtual rooms available for this subject.",
                            "noMissed": "No missed virtual rooms available for this subject.",
                            "loading": "Loading...",
                            "page": "Page",
                            "of": "of",
                            "teacher": "Teacher",
                            "duration": "Duration"
                        },
                        "roomStatus": {
                            "attended": "Attended",
                            "missed": "Missed",
                            "completed": "Completed",
                            "enter": "Enter"
                        },
                        "errors": {
                            "title": "Error!",
                            "confirmButton": "OK"
                        }
                    },
                    examResults: {
                        "header": {
                            "title": "Exam Result",
                            "backButton": "Back"
                        },
                        "summary": {
                            "totalMarks": "Total Marks",
                            "percentage": "Percentage",
                            "status": "Status",
                            "pass": "Pass",
                            "fail": "Fail"
                        },
                        "questions": {
                            "question": "Question",
                            "points": "Points",
                            "noAnswers": "No answers were submitted.",
                            "correctAnswer": "Correct Answer"
                        },
                        "errors": {
                            "title": "Error!",
                            "message": "An error occurred while loading the exam result.",
                            "noResult": "No Exam Result",
                            "noResultMessage": "No exam result was found.",
                            "backButton": "Go Back"
                        }
                    },
                    exam: {
                        "header": {
                            "backButton": "Back"
                        },
                        "timer": {
                            "timeLeft": "Time Left",
                            "timeUp": "Time's Up! Exam Auto-Submitted"
                        },
                        "questions": {
                            "question": "Question",
                            "marks": "Marks",
                            "submitButton": "Submit Exam",
                            "submitting": "Submitting..."
                        },
                        "alerts": {
                            "incompleteExam": {
                                "title": "Incomplete Exam",
                                "message": "Please answer all questions before submitting.",
                                "confirmButton": "OK"
                            },
                            "noActiveSession": {
                                "title": "No Active Session",
                                "message": "Either the exam is already submitted or the session has expired.",
                                "confirmButton": "OK"
                            },
                            "submitted": {
                                "title": "Exam Submitted!",
                                "message": "Your score is {{score}}",
                                "confirmButton": "OK"
                            },
                            "alreadySubmitted": {
                                "title": "Already Submitted",
                                "message": "Your exam was already submitted. Returning to exam list.",
                                "confirmButton": "OK"
                            },
                            "error": {
                                "title": "Error!",
                                "message": "Failed to submit exam",
                                "confirmButton": "OK"
                            }
                        },
                        "errors": {
                            "noQuestions": "No exam questions found."
                        }
                    },
                    "exams": {
                        "alerts": {
                            "error": {
                                "title": "Error!",
                                "message": "Failed to start the exam.",
                                "confirmButton": "OK"
                            },
                            "notStarted": {
                                "title": "Not Started!",
                                "message": "The exam has not started yet.",
                                "confirmButton": "OK"
                            },
                            "examEnded": {
                                "title": "Exam Ended!",
                                "message": "The exam has already ended.",
                                "confirmButton": "OK"
                            },
                            "sessionExpired": {
                                "title": "Session Expired!",
                                "message": "You cannot enter this exam as the session has expired.",
                                "confirmButton": "OK"
                            },
                            "activeSession": {
                                "title": "Warning!",
                                "message": "You already have an active session. Resuming your previous exam.",
                                "confirmButton": "Proceed"
                            }
                        },
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "main": {
                            "title": "Exams",
                            "loading": "Loading...",
                            "allTab": "All",
                            "upcomingTab": "Upcoming",
                            "completedTab": "Completed",
                            "missedTab": "Missed",
                            "page": "Page",
                            "of": "of",
                            "noExams": {
                                "all": "No exams available",
                                "upcoming": "No upcoming exams available",
                                "completed": "No completed exams available",
                                "missed": "No missed exams available"
                            },
                            "examCard": {
                                "description": "Description",
                                "createdBy": "Created By",
                                "duration": "Duration",
                                "minutes": "minutes",
                                "startTime": "Start Time",
                                "endTime": "End Time",
                                "notStartedTooltip": "The exam has not started yet",
                                "endedTooltip": "The exam has already ended",
                                "offline": "Offline",
                                "view": "View",
                                "notStarted": "Not Started",
                                "ended": "Exam Ended",
                                "start": "Start Exam"
                            }
                        }
                    },
                    "assignments": {
                        "alerts": {
                            "error": {
                                "title": "Error!",
                                "message": "An error occurred",
                                "confirmButton": "OK"
                            }
                        },
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "main": {
                            "title": "Assignments",
                            "loading": "Loading...",
                            "allTab": "All",
                            "submittedTab": "Submitted",
                            "pendingTab": "Pending",
                            "missedTab": "Missed",
                            "page": "Page",
                            "of": "of",
                            "noAssignments": "No assignments available",
                            "assignmentCard": {
                                "description": "Description",
                                "createdBy": "Created By",
                                "dueDate": "Due Date",
                                "missed": "Missed",
                                "viewSubmission": "View Submission",
                                "submitAssignment": "Submit Assignment"
                            }
                        }
                    }
                    ,
                    "assignment": {
                        "view": {
                            "noAssignment": "No Assignment",
                            "noAssignmentFound": "The requested assignment could not be found",
                            "dueDate": "Due Date",
                            "enterAnswer": "Enter your answer here...",
                            "submitAssignment": "Submit Assignment",
                            "viewSubmission": "View Submission",
                            "back": "Back",
                            "error": {
                                "title": "Error!",
                                "emptySubmission": "Please enter your submission text",
                                "confirmButton": "OK"
                            },
                            "success": {
                                "title": "Success!",
                                "submitted": "Assignment submitted successfully",
                                "confirmButton": "OK"
                            }
                        }
                    }
                    ,
                    "submission": {
                        "view": {
                            "title": "Submission Details",
                            "noSubmission": "No Submission",
                            "noSubmissionFound": "You have not submitted anything for this assignment yet",
                            "yourGrade": "Your Grade",
                            "notGraded": "Not graded yet",
                            "dueDate": "Due Date",
                            "yourSubmission": "Your Submission",
                            "back": "Back",
                            "error": {
                                "title": "Error!",
                                "confirmButton": "OK"
                            }
                        }
                    }
                    ,
                    "questionBank": {
                        "title": "Question Bank",
                        "sidebar": {
                            "videoLectures": "Video Lectures",
                            "courseMaterial": "Course Material",
                            "virtualRooms": "Virtual Rooms",
                            "assignments": "Assignments",
                            "exams": "Exams",
                            "questionBank": "Question Bank"
                        },
                        "tabs": {
                            "all": "All",
                            "bookmarks": "Bookmarks"
                        },
                        "messages": {
                            "noQuestions": "No questions available for this subject",
                            "noBookmarks": "You haven't bookmarked any questions yet",
                            "loading": "Loading...",
                            "teacher": "Teacher",
                            "questionType": "Question Type"
                        },
                        "pagination": {
                            "page": "Page",
                            "of": "of"
                        },
                        "error": {
                            "title": "Error!",
                            "confirmButton": "OK"
                        }
                    }
                    ,
                    "questionDetails": {
                        "title": "Question Details",
                        "back": "Back",
                        "type": "Type",
                        "choices": "Choices",
                        "showAnswer": "Show Answer",
                        "hideAnswer": "Hide Answer",
                        "answer": "Answer",
                        "noDetails": "No question details available",
                        "error": {
                            "title": "Error!",
                            "confirmButton": "OK"
                        }
                    }
                    ,
                    //Attendance
                    "attendance": {
                        "title": "Attendance Level",
                        "present": "Present",
                        "absent": "Absent",
                        "academicNumber": "Academic Number",
                        "notAvailable": "N/A",
                        "weekNavigation": {
                            "previous": "Previous Week",
                            "next": "Next Week"
                        },
                        "days": {
                            "sunday": "Sunday",
                            "monday": "Monday",
                            "tuesday": "Tuesday",
                            "wednesday": "Wednesday",
                            "thursday": "Thursday",
                            "friday": "Friday",
                            "saturday": "Saturday"
                        }
                    }
                    ,
                    //Schedule
                    "examSchedule": {
                        "title": "Upcoming Smart Classes",
                        "weeklySchedule": "Weekly Schedule",
                        "examSchedule": "Exam Schedule",
                        "noSchedules": "No exam schedules found",
                        "headers": {
                            "subject": "Subject",
                            "examDate": "Exam Date",
                            "startTime": "Start Time",
                            "endTime": "End Time"
                        }
                    }
                    ,
                    "schedule": {
                        "title": "Upcoming Smart Classes",
                        "weeklySchedule": "Weekly Schedule",
                        "examSchedule": "Exam Schedule",
                        "noSchedule": {
                            "title": "No Schedule Available",
                            "message": "It looks like there are no scheduled classes available at the moment"
                        },
                        "days": {
                            "sunday": "Sunday",
                            "monday": "Monday",
                            "tuesday": "Tuesday",
                            "wednesday": "Wednesday",
                            "thursday": "Thursday",
                            "friday": "Friday",
                            "saturday": "Saturday"
                        },
                        "duration": {
                            "hour": "hour",
                            "hours": "hours",
                            "minute": "minute",
                            "minutes": "minutes",
                            "and": "and"
                        }
                    }
                    ,
                    //Grades
                    "grades": {
                        "title": "Your Grades",
                        "header": {
                            "title": "Take a Look at your Grades",
                            "subtitle": "Great Achievements"
                        },
                        "cards": {
                            "currentSemester": "Current Semester",
                            "allYears": "All Years",
                            "viewGrades": "View Grades"
                        },
                        "performance": {
                            "title": "Performance Evolution Over Semesters",
                            "noData": "Not enough data to display performance evolution"
                        }
                    }
                    ,
                    "gradesSemester": {
                        "title": "Grades for Semester",
                        "back": "Back",
                        "noDegrees": "No degrees available for this semester",
                        "headers": {
                            "subjectName": "Subject Name",
                            "midtermDegree": "Midterm Degree",
                            "maxMidtermDegree": "Max Midterm Degree",
                            "finalDegree": "Final Degree",
                            "maxFinalDegree": "Max Final Degree",
                            "subjectScore": "Subject Score",
                            "maxSubjectScore": "Max Subject Score"
                        }
                    }
                    ,
                    "gradesAllYears": {
                        "title": "Grades for All Years",
                        "back": "Back",
                        "academicYear": "Academic Year",
                        "noDegreesTerm": "No degrees available for this term",
                        "noDegreesYear": "No degrees available for this academic year",
                        "headers": {
                            "subjectName": "Subject Name",
                            "midtermDegree": "Midterm Degree",
                            "maxMidtermDegree": "Max Midterm Degree",
                            "finalDegree": "Final Degree",
                            "maxFinalDegree": "Max Final Degree",
                            "subjectScore": "Subject Score",
                            "maxSubjectScore": "Max Subject Score"
                        }
                    }
                    ,
                    //Activites
                    "activities": {
                        "title": "Activities",
                        "tabs": {
                            "schoolHubs": "School Hubs",
                            "contests": "Contests"
                        },
                        "hubCard": {
                            "registrationStart": "Contest Registration Start:",
                            "registrationEnd": "Contest Ends:",
                            "contestDate": "Contest Date:",
                            "details": "Details",
                            "prizes": "Prizes",
                            "join": "Join",
                            "disjoin": "Disjoin",
                            "noHubs": "No school hubs available",
                            "noHubsMessage": "It seems like there are no school hubs available at the moment. Please check back later."
                        },
                        "errors": {
                            "title": "Error",
                            "default": "An error occurred"
                        }
                    }
                    ,

                    "activityDetails": {
                        "title": "Activities",
                        "tabs": {
                            "details": "Details",
                            "prizes": "Prizes"
                        },
                        "sections": {
                            "location": "Location",
                            "details": "Details"
                        },
                        "notFound": "No activity found"
                    },
                    "errors": {
                        "title": "Error",
                        "default": "An error occurred"
                    }
                    ,
                    "activityPrizes": {
                        "title": "Activities",
                        "tabs": {
                            "details": "Details",
                            "prizes": "Prizes"
                        },
                        "prizeLevel": "Level ",
                        "notFound": "No activity found"
                    }
                    ,
                    "contests": {
                        "title": "Activities",
                        "tabs": {
                            "schoolHubs": "School Hubs",
                            "contests": "Contests"
                        },
                        "table": {
                            "headers": {
                                "title": "Title",
                                "teacher": "Teacher",
                                "subject": "Subject",
                                "startDate": "Start Date",
                                "endDate": "End Date",
                                "teamMembers": "Num of team members",
                                "requirements": "Requirements",
                                "action": "Action"
                            },
                            "noData": "No contests available",
                            "notAvailable": "N/A",
                            "enter": "Enter"
                        },
                        "messages": {
                            "noTeam": "You haven't join a team yet."
                        },
                        "errors": {
                            "title": "Error",
                            "default": "An error occurred"
                        }
                    }
                    ,
                    "teamDetails": {
                        "title": "Team Details",
                        "teamName": "Team Name",
                        "contest": "Contest",
                        "teammates": "Teammates",
                        "leader": "(Leader)",
                        "deleteTeam": "Delete Team",
                        "editTeam": "Edit Team",
                        "back": "Back",
                        "deleteConfirmation": {
                            "title": "Are you sure?",
                            "text": "You won't be able to revert this!",
                            "confirm": "Yes, delete it!",
                            "successTitle": "Deleted!",
                            "successText": "Your team has been deleted.",
                            "errorTitle": "Error!"
                        },
                        "notAvailable": "N/A"
                    },
                    "editTeam": {
                        "title": "Edit Your Team",
                        "back": "Back",
                        "teamName": "Team Name",
                        "teamMembers": "Team Members",
                        "leader": "(Leader)",
                        "selectMember": "Select Member",
                        "remove": "Remove",
                        "addMember": "+ Add Member",
                        "saveChanges": "Save Changes",
                        "limitReached": "Limit Reached!",
                        "maxMembers": "The team cannot have more than {{max}} members.",
                        "success": {
                            "title": "Success!",
                            "text": "Team updated successfully! 🎉"
                        },
                        "error": {
                            "title": "Error!",
                            "text": "An error occurred while updating the team."
                        }
                    },
                    "createTeam": {
                        "title": "Create Your Team",
                        "back": "Back",
                        "teamName": "Team Name",
                        "teamMembers": "Team Members",
                        "selectMember": "Select Member",
                        "noStudents": "No students available",
                        "remove": "Remove",
                        "addMember": "+ Add Member",
                        "submit": "Submit",
                        "success": {
                            "title": "Success!",
                            "text": "Team created successfully! 🎉",
                            "confirmButton": "OK"
                        },
                        "error": {
                            "title": "Error!",
                            "text": "Failed to create team. Please try again.",
                            "confirmButton": "OK"
                        }
                    },
                    "library": {
                        "title": "Your Literary Journey Starts Here",
                        "books": "Books",
                        "videos": "Videos"
                    },
                    "libraryBooks": {
                        "subjectsTitle": "Subjects",
                        "all": "All",
                        "public": "Public",
                        "libraryTitle": "Library",
                        "publicLibraryTitle": "Public Library",
                        "materialsTitle": " Materials",
                        "noBooks": "No books available at the moment.",
                        "noPublicBooks": "No books available in the public library at the moment.",
                        "noMaterials": "No materials available for",
                        "noMaterials2": " at the moment.",
                        "loading": "Loading...",
                        "filters": {
                            "allGrades": "All Grades",
                            "allSemesters": "All Semesters",
                            "grade": "Grade ",
                            "semester": "Semester"
                        },
                        "general": "General"
                    },
                    "libraryVideos": {
                        "subjectsTitle": "Subjects",
                        "all": "All",
                        "public": "Public",
                        "libraryTitle": "Video Library",
                        "publicLibraryTitle": "Public Video Library",
                        "materialsTitle": " Videos",
                        "noVideos": "No videos available at the moment.",
                        "noPublicVideos": "No videos available in the public library at the moment.",
                        "noMaterials": "No videos available for",
                        "noMaterials2": " at the moment.",
                        "loading": "Loading...",
                        "filters": {
                            "allGrades": "All Grades",
                            "allSemesters": "All Semesters",
                            "grade": "Grade ",
                            "semester": "Semester "
                        },
                        "general": "General"
                    },
                    "libraryItem": {
                        "title": "Item Details",
                        "description": "Description",
                        "author": "Author",
                        "grade": "Grade",
                        "subject": "Subject",
                        "semester": "Semester",
                        "academicYear": "Academic Year",
                        "type": "Type",
                        "uploadedBy": "Uploaded By",
                        "download": "Download",
                        "downloadMaterial": "Download Material",
                        "unknown": "Unknown",
                        "na": "N/A",
                        "back": "Back",
                        "noSupport": "Your browser does not support the video tag.",
                    },

                    /////////////////////////////////////////////teacher////////////////////////////////////////////////////////////////

                    //navbar
                    SearchTeacherPage: "Search Teacher Page",
                    //sidebar
                    sidebart: {
                        Dashboard: "Dashboard",
                        GeneralVirtualRooms: "General Virtual Rooms"
                    },
                    //dashboard
                    dashboardteacher: {
                        Mailbox: "Mailbox",
                        DiscussionRooms: "Discussion Rooms",
                        CustomLibraries: "Custom Libraries",
                        AcademicCalendar: "Academic Calendar",
                        Welcome: "Welcome",
                        mainCategories: "mainCategories",
                        notify: "NOTIFICATIONS CENTER",
                        VirtualClassrooms: "Virtual Classrooms",
                        contentvr: "You don’t have any new virtual classrooms today.",
                    },
                    //motivation
                    motivationteacher: {
                        motidesc: "Every member starts his/her journey with a green membership card. In each semester, you will start earning points from the first day. Your final score at the end of the semester will determine the type of card you deserve to use throughout the next semester as recognition for your efforts.",
                        content01: "If your points are between",
                        content02: "in your school, you will be eligible for the Learnova",
                        content03: "Green",
                        content04: "Card.",
                        content05: "0 and 250",
                        content11: "If your points are between Golden ",
                        content12: " in your school, you will be eligible for the Learnova ",
                        content13: "Golden ",
                        content14: " Card.",
                        content15: "251 to 400 ",
                        content21: "If your points are ",
                        content22: " in your school, you will be eligible for the Learnova ",
                        content23: "Diamond ",
                        content24: " Card.",
                        content25: "401 or more ",
                        TopTeachers: "Top Teachers",
                        Subject: "Subject",
                    },
                    //courses
                    coursest: {
                        AllCourses: "All Courses",
                        CurrentCourse: "Current Courses",
                        Search: "Search...",
                    },
                    //addmateial
                    addmaterial: {
                        Exams: "Exams",
                        Assignments: "Assignments",
                        QuestionBank: "Question Bank",
                        VirtualRoom: "Virtual Room",
                        CourseMaterial: "Course Material",
                        VideoLectures: "Video Lectures",
                        Total: "Total",
                    },
                    tablesheader: {
                        Materials: "All Materials",
                        Title: "Title",
                        Description: "Description",
                        Type: "Type",
                        FileUrl: "FileUrl",
                        Actions: "Actions",
                        ViewFile: " View File",
                        EditMaterial: "Edit Material",
                        Update: "Update",
                        UploadMaterial: "UploadMaterial",
                        Upload: "Upload",
                        Link: "Link",
                        Duration: "Duration",
                        StartTime: "Start Time",
                        EditVirtualRooms: "Edit Virtual Rooms",
                        UploadVirtualRooms: " Upload Virtual Rooms ",
                        Answer: "Answer",
                        Question: "Question",
                        allquestions: "All Questions For This Subject",
                        Myquestions: " My questions",
                        AllQuestions: "All Questions ",
                        questionType: "question Type",
                        Essay: "Essay",
                        ShortAnswer: "Short Answer",
                        TrueFalse: "True/False",
                        MultipleChoice: "Multiple Choice",
                        Choices: "Choices",
                        CorrectAnswer: "Correct Answer",
                        SelectAnswer: "Select Correct Answer",
                        UploadQuestion: "Upload Question",
                        EditQuestion: "Edit Question",

                    },
                    assignmentt: {
                        MyAssignment: "My Assignment",
                        Due: "Due",
                        Marks: "Marks",
                        NoAssignments: "No Assignments Found",
                        desc: " It seems like there are no Assignments available at the moment.",
                        Submissions: "Submissions",
                        Status: "Status",
                        SubmissionDate: "Submission Date",
                        StudentName: "Student Name",
                        NoSubmissions: "No Submissions Found",
                        descs: "It seems like there are no Submissions available at the moment",
                        SubmissionDetails: "Submission Details",
                        Submittedby: "Submitted by",
                        SubmissionText: "Submission Text",
                        Submission: "Submission ",
                        Assignment: "Assignment",
                        Save: "Save",
                        Cancel: "Cancel",
                        Grade: "Grade",
                        EditGrade: "Edit Grade",
                        UpdateAssignment: "Update Assignment",
                        UploadAssignment: "Upload Assignment",
                    },
                    examst: {
                        MyExams: "My Exams",
                        End: "End Time",
                        Start: "Start Time",
                        Duration: "Duration",
                        GeneralInformation: "General Information",
                        Grade: "Grade",
                        Subject: "Subject",
                        Options: "Options",
                        ExamQuestions: "Exam Questions",
                        noExamsFound: "No Exams Found",
                        noExamsDescription: "It seems like there are no exams available at the moment",
                        ExamResults: "Exam Results ",
                        Percentage: "Percentage",
                        commaseparated: "comma-separated ,",
                        AddQuestion: "Add Question",
                        CreateExam: "Create Exam",
                        UpdateExam: "Update Exam",

                    },
                    attendans: {
                        AcademicNumber: "Academic Number",
                        Class: "Class",
                        SubmitAttendance: "Submit Attendance",
                        TakeAttendance: "Take Attendance",
                        AttendanceReport: "Attendance Report",
                        AttendanceSummary: " Attendance Summary",
                        GenerateReport: " Generate Report",
                        "AttendanceDetails":" Attendance Details for",
                        "AcademicNumberr":"Academic Number",
                        "Classs":"Class",
                        "TotalAbsences":"Total Absences",
                        "TotalAttendances":"Total Attendances",
                        "Date":"Date",
                        "Status":"Status",
                    },
                    schaduel: {
                        Saturday: "Saturday",
                        Friday: "Friday",
                        Thursday: "Thursday",
                        Wednesday: "Wednesday",
                        Tuesday: "Tuesday",
                        Monday: "Wednesday",
                        Sunday: "Sunday",
                        ExportPDF: "Export as PDF",
                        ExamsSchedule: "Exams Schedule",
                        WeeklySchedule: "Weekly Schedule",
                    },
                    gradest: {
                        ExamScores: "Exam Scores",
                        AcademicYear: "Academic Year",
                        ExportCSV: "Export to CSV",
                        UploadFile: "Go to Upload File",
                        GetStudentsGrades: "Get Students Grades",
                        Choosefile: "Choose a file",
                        UploadGradesFile: "Upload Grades File",
                        Gradestudents: "Grades For Students",
                        Selectexamtype: "  Select exam type",
                        FinalDegree: "Final Degree",
                        StudentExamResults: "Student Exam Results",
                        DeleteAllData: "Delete All Data",
                        ExportData: "Export Data",
                        UploadUpdate: "Upload & Update",

                    },
                    activitiest: {
                        AddContest: "Add Contest",
                        Participants: "Participants",
                        EditContest: "Edit Contest",
                    },
                    libraryt: {
                        AddLibraryItem: "Add Library Item",
                        AddItem: "Add Item",
                        LibraryMaterials: "Library Materials",
                        AllMaterialsLibrary: "All Materials in Library  ",
                        GeneralLibrary: "General Library",
                        TeacherLibrary: "Teacher Library",
                        Library: "Library",
                        EditMaterial: "Edit Material",

                    },
                    //////////////////////////////////////////manager/////////////////////////////////////
                    dashboardm: {
                        AbsenceStatistics: "Absence Statistics ",
                        GradesStatistics: "Grades Statistics ",
                        GradesAbsenceStatistics: "Grades And Absence Statistics  ",
                        Ranks: "Ranks",
                        TopStudents: "Top Students ",
                        TopTeachers: "Top Teachers ",
                        Subject: "Subject",
                        Badge: "Badge",
                        TotalPoints: " Total Points",
                        Grade: "Grade",
                        AcademicNumber: "Academic Number ",
                        Name: "Name",
                        Rank: "Rank",

                    },
                    schoolhubs: {
                        AddSchoolHubs: "Add School Hubs ",
                        Class: "Class",
                        Grade: "Grade",
                        Email: "Email",
                        Phone: "Phone",
                        AddPrize: "Add Prize",
                        EditSchoolHub: "Edit School Hub",
                        "phdetails":"Enter school hub details",
                        "phlocation":"Enter school hub location",
                        "phtitle":"Enter school hub title",
                        "level":"Level",
                        "prize":"Prize"
                    },
                    attendanse: {
                        Classes: "Classes",
                        Search: "Search by class or grade...",
                        ClassData: "Class Data",
                        Noattendance: "No attendance records found",
                    },
                    schedulem: {
                        Time: "Time",
                        Addothersubjects: "Add other subjects",
                        EndTime: "End Time",
                        StartTime: "Start Time",
                        ExamDate: "Exam Date",
                        Subject: "Subject",
                        Grade: "Grade",
                        Semester: "Semester",
                        AcademicYear: "Academic Year",
                        AddExamSchedule: "Add Exam Schedule",
                        Edit: "Edit Exam Schedule",
                        ExamScheduleDetails: "   Exam Schedule Details ",
                        DeleteSchedule: " Delete Schedule  ",
                        ExamSchedule: " Exam Schedules",
                    },
                    gradesm: {
                        TotalDegree: "Total Degree",
                        FinalDegree: "Final Degree",
                        MidtermDegree: "Midterm Degree",
                        AcademicNumber: "Academic Number",
                        StudentName: "Student Name",
                        ExporttoCSV: "Export to CSV",
                        Nodatafound: "No data found for the given criteria.",
                        NoResultsFound: "No Results Found",
                        Search: "Search",
                        Subject: "Subject",
                        Class: "Class",
                        Grade: "Grade",
                        SearchResults: "Search for Results",
                        Grades: "Grades",
                        Resultsfor: "Results for"
                    },

                    ////////////////////////////////Admin//////////////////////////////////////////////////////////

                    //Nav
                    SearchAdminPage: "Search Admin Page",
                    //Dashboard
                    "dashboardadmin": {
                        "overview": "Overview",
                        "statistics": "Statistics of users",
                        "calendar": "Calendar",
                        "users": {
                            "students": "Students",
                            "teachers": "Teachers",
                            "parents": "Parents",
                            "manager": "Manager",
                            "admin": "Admin",
                            "terms": "Terms",
                            "courses": "Courses",
                            "schedule": "Schedule"
                        },
                        "charts": {
                            "students": "Students",
                            "teachers": "Teachers",
                            "percentage": "Percentage Of Users By Type",
                            "female": "Female",
                            "male": "Male"
                        },
                        "errors": {
                            "network": "NetworkError: Failed to fetch Some data. Please check your connection.",
                            "token": "Token is required! Please log in again."
                        }
                    },
                    //Sidebar
                    "sidebar": {
                        "dashboard": "Dashboard",
                        "members": "Members",
                        "termManagement": "Term Management",
                        "courseManagement": "Course Management",
                        "academicYear": "Academic Year",
                        "gradeManagement": "Grade Management",
                        "scheduleManagement": "Schedule Management",
                        "logout": "Logout",
                        "noCurrentTerm": "No current term available",
                        "noTerms": "No terms available",
                        "schoolName": "Khatab School",
                        "loading": "Loading...",
                    },
                    //basicform
                    AllMembers: "All Members",
                    //header
                    "Header": {
                        "exportCSV": "Export CSV",
                        "selectFilter": "Select Filter",
                        "filterOptions": {
                            "name": "Name",
                            "gender": "Gender",
                            "email": "Email",
                            "subject": "Subject",
                            "Class": "Class",
                            "Teacher": "Teacher",
                            "AcademicYear": "Academic Year ",
                        },
                    },
                    "studentHeader": {
                        "add": "Add Student",
                        "searchPlaceholder": "Search for a student by name or gender"
                    },
                    "teacherHeader": {
                        "add": "Add Teacher",
                        "searchPlaceholder": "Search for a teacher by name , email , gender or subject ",
                        "searchPlaceholder1": "Search for a class teacher by class, subject, teacher, or academic year"
                    },
                    "parentHeader": {
                        "add": "Add Parent",
                        "searchPlaceholder": "Search for a parent by name , email or gender"
                    },
                    "managerHeader": {
                        "add": "Add Manager",
                        "searchPlaceholder": "Search for a manager by name , email or gender"
                    },
                    "adminHeader": {
                        "add": "Add Admin",
                        "searchPlaceholder": "Search for a admin by name , email or gender"
                    },
                    //table
                    "tableHeaders": {
                        "name": "Name",
                        "email": "Email",
                        "gender": "Gender",
                        "phone": "Phone",
                        "actions": "Actions",
                        "Class": "Class",
                        "StudentID": "Student ID",
                        "AcademicNumber": "Academic Number",
                        "subject": "Subject",
                        "teacher": "Teacher",
                        "AcademicYear": "Academic Year "
                    },
                    "adminTable": {
                        "deleteConfirmation": "Are you sure you want to delete this admin?",
                        "noAdminsFound": {
                            "title": "No Admin Found",
                            "description": "It seems like there are no admins in the database at the moment."
                        }
                    },
                    "parentTable": {
                        "deleteConfirmation": "Are you sure you want to delete this parent?",
                        "noParentsFound": {
                            "title": "No Parent Found",
                            "description": "It seems like there are no parentS in the database at the moment."
                        }
                    },
                    "managerTable": {
                        "deleteConfirmation": "Are you sure you want to delete this manager?",
                        "noManagersFound": {
                            "title": "No Manager Found",
                            "description": "It seems like there are no managers in the database at the moment."
                        }
                    },
                    "studentTable": {
                        "deleteConfirmation": "Are you sure you want to delete this student?",
                        "noStudentsFound": {
                            "title": "No Student Found",
                            "description": "It seems like there are no students in the database at the moment."
                        }
                    },
                    "teacherTable": {
                        "deleteConfirmation": "Are you sure you want to delete this teacher?",
                        "deleteConfirmation1": "Are you sure you want to delete this Class teacher?",
                        "noTeachersFound": {
                            "title": "No Teacher Found",
                            "description": "It seems like there are no teachers in the database at the moment.",
                            "title1": "No Class Teacher Found",
                            "description1": "It seems like there are no class teachers in the database at the moment."
                        }
                    },
                    "formLabels": {
                        "fullName": "Full Name",
                        "email": "Email Address",
                        "emailAddress": "Email Address",
                        "gender": "Gender",
                        "password": "Password",
                        "phoneNumber": "Phone Number",
                        "phone": "Phone Number",
                        "subject": "Subject",
                        "dateOfBirth": "Date of Birth",
                        "grade": "Grade",
                        "address": "Address",
                        "StudentName": " Student Name",
                        "SelectStudentID": "Select StudentID",
                        "UploadStudents": " Upload Students ",
                        "UploadExcelFile": " Upload Excel File "
                    },
                    "placeholders": {
                        "fullName": "Enter full name",
                        "email": "Enter email address",
                        "password": "Enter password",
                        "password1": "Enter new password (leave blank to keep current password)",
                        "phoneNumber": "Enter phone number",
                        "enter": "Enter",
                        "SaveChanges": "Save Changes",
                        "Updating": "Updating...",
                    },
                    "genderOptions": {
                        "select": "Select Gender",
                        "male": "Male",
                        "female": "Female",
                    },
                    "gradeOptions": {
                        "select": "Select Grade"
                    },
                    "subjectOptions": {
                        "select": "Select Subject",
                        "loading": "Loading subjects..."
                    },
                    "validation": {
                        "requiredFields": "Please fill in all the fields.",
                        "phoneValidation": "Phone number must be exactly 11 digits.",
                        "errorMessage": "Something went wrong. Please try again.",
                        "emailValidation": "Email already exists. Please use another email.",
                        "addsuccessstudent": "Student added successfully!",
                        "nodata": "No data found in the uploaded file",
                        "addsuccessstudents": "students added successfully!",
                        "addsuccessstudents1": "students added successfully. Waiting for",
                        "addsuccessstudents2": " students to be added.",
                        "addfailstudents": "Failed to add the following students",
                    },
                    "datatype": {
                        "AcademicData": "Academic Data",
                        "PersonalData": "Personal Data"
                    },
                    "teacherdata": {
                        "Teacher": "Teacher",
                        "SelectTeacher": "Select Teacher",
                        "Class": "Class",
                        "SelectClass": "Select Class",
                        "SubmitAcademicData": "Submit Academic Data",
                        "AssignTeacherInfo": " Assign Teacher Info",
                        "AssignTeacher": "Assign Teacher",
                        "Addanother": "Add another",
                        "SelectGrade": "Select Grade",
                        "grade": "grade",
                        "Subject": "Subject",
                        "Selectsubject": " Select subject",
                        "NoTeacherAssigned": "No Teacher Assigned",
                        "NoGrade": "No Grade",
                        "Classnotfound": "Class not found",
                        "ClassAcademicYear": "Class-Academic Year",
                        "SelectTeacherSubject": "Select Teacher-Subject",
                        "SelectClassAcademicYear": "Select Class-Academic Year",
                        "TeacherSubject": " Teacher-Subject",
                    },
                    "edit": {
                        "admin": "Edit Admin",
                        "manager": "Edit Manager",
                        "parent": "Edit Parent",
                        "student": "Edit Student",
                        "teacher": "Edit Teacher",
                        "classteacher": "Edit Class Teacher",
                        "UpdateStudent": "Update Student"
                    },
                    //term
                    "termHeader": {
                        "title": "Terms",
                        "addButton": "Add Term"
                    },
                    "termList": {
                        "noAcademicYear": "No Academic Year Available",
                        "noSemester": "No Semester Available",
                        "deleteConfirmation": "Are you sure you want to delete this term?",
                        "semesterNames": {
                            "Semester 1": "Semester 1",
                            "Semester 2": "Semester 2",
                        },
                        "emptyState": {
                            "title": "No Terms Found",
                            "description": "It seems like there are no Terms available at the moment. Please check back later or add new terms."
                        }
                    },
                    "termForm": {
                        "title": "Add Term",
                        "labels": {
                            "termName": "Term Name",
                            "academicYear": "Academic Year"
                        },
                        "placeholders": {
                            "selectTerm": "Select Term",
                            "selectYear": "Select Year",
                            "noYearsAvailable": "No academic years available"
                        },
                        "options": {
                            "semester1": "Semester 1",
                            "semester2": "Semester 2"
                        },
                        "submitButton": "Add Term",
                        "errorMessage": "An error occurred. Please try again."
                    },
                    "editTermForm": {
                        "title": "Edit Term",
                        "labels": {
                            "selectTerm": "Select Term",
                            "selectAcademicYear": "Select Academic Year"
                        },
                        "placeholders": {
                            "selectTerm": "-- Select Term --",
                            "selectAcademicYear": "-- Select Academic Year --"
                        },
                        "options": {
                            "semester1": "Semester 1",
                            "semester2": "Semester 2"
                        },
                        "submitButton": "Update Term",
                        "errorMessages": {
                            "requiredFields": "Please fill in all fields",
                            "updateFailed": "Failed to update term"
                        }
                    },
                    //subjects
                    "subjectsList": {
                        "deleteConfirmation": "Are you sure you want to delete this subject?",
                        "deleteSuccess": "Subject deleted successfully!",
                        "emptyState": {
                            "title": "No Subjects Found",
                            "description": "It seems like there are no subjects available at the moment. Please check back later or add new subjects."
                        },
                        "subjectNames": {
                            "Arabic": "Arabic",
                            "English": "English",
                            "Math": "Math",
                            "Science": "Science",
                            "History": "History"
                        }
                    },
                    "subjectsHeader": {
                        "title": "Subjects",
                        "addButton": "Add Subject"
                    },
                    "addSubject": {
                        "title": "Add Subject",
                        "labels": {
                            "subjectName": "Enter Subject Name"
                        },
                        "placeholders": {
                            "subjectName": "Enter subject name"
                        },
                        "buttons": {
                            "submit": "Add Subject"
                        },
                        "messages": {
                            "success": "Subject added successfully!"
                        }
                    }, "subjectManagement": {
                        "tabs": {
                            "add": {
                                "title": "Add Subject",
                                "number": "1"
                            },
                            "assign": {
                                "title": "Assign Subject",
                                "number": "2"
                            }
                        }
                    },
                    "subjectHeader": {
                        "title": "Subjects",
                        "buttons": {
                            "export": "Export CSV",
                            "add": "Add Subject"
                        },
                        "filters": {
                            "default": "Select Filter",
                            "term": "Term",
                            "grade": "Grade"
                        },
                        "search": {
                            "placeholder": "Search by term or grade"
                        }
                    },
                    "assignSubject": {
                        "title": "Assign Subject",
                        "labels": {
                            "subject": "Select Subject",
                            "grade": "Select Grade",
                            "semester": "Select Semester"
                        },
                        "placeholders": {
                            "subject": "-- Select Subject --",
                            "grade": "-- Select Grade --",
                            "semester": "-- Select Semester --"
                        },
                        "buttons": {
                            "submit": "Assign Subject",
                            "loading": "Loading..."
                        },
                        "errors": {
                            "requiredFields": "Please fill in all fields"
                        }
                    },
                    "assignedSubjects": {
                        "tableHeaders": {
                            "subject": "Subject",
                            "grade": "Grade",
                            "term": "Term",
                            "actions": "Actions"
                        },
                        "emptyState": {
                            "title": "No Subjects Found",
                            "description": "It seems like there are no subjects in the database at the moment."
                        },
                        "deleteConfirmation": "Are you sure you want to delete this subject?",
                        "unknownGrade": "Unknown"
                    },
                    "editAssignedSubject": {
                        "title": "Edit Assigned Subject",
                        "labels": {
                            "subject": "Select Subject",
                            "grade": "Select Grade",
                            "semester": "Select Semester"
                        },
                        "placeholders": {
                            "subject": "-- Select Subject --",
                            "grade": "-- Select Grade --",
                            "semester": "-- Select Semester --"
                        },
                        "buttons": {
                            "submit": "Update Subject"
                        },
                        "messages": {
                            "requiredFields": "Please fill in all fields",
                            "success": "Subject updated successfully",
                            "error": "Failed to update subject"
                        }
                    },
                    "editSubject": {
                        "title": "Edit Subject",
                        "labels": {
                            "subjectName": "Enter Subject Name"
                        },
                        "placeholders": {
                            "subjectName": "Enter subject name"
                        },
                        "buttons": {
                            "submit": "Save Changes"
                        },
                        "messages": {
                            "success": "Subject updated successfully",
                            "error": "Failed to update subject"
                        }
                    },
                    //academic year
                    "academicYear": {
                        "form": {
                            "title": "Add Academic Year",
                            "labels": {
                                "startYear": "Start Year",
                                "endYear": "End Year"
                            },
                            "placeholders": {
                                "startYear": "Start Year (e.g., 2023)",
                                "endYear": "End Year (e.g., 2024)"
                            },
                            "buttons": {
                                "add": "Add Year",
                                "update": "Update Year"
                            }
                        },
                        "editForm": {
                            "title": "Edit Year"
                        },
                        "list": {
                            "title": "All Years",
                            "addButton": "Add Year",
                            "deleteConfirmation": "Are you sure you want to delete this academic year?",
                            "emptyState": {
                                "title": "No Academic Years Found",
                                "description": "It seems like there are no academic years available at the moment. Please check back later or add new academic years."
                            }
                        }
                    },
                    //schedule
                    "scheduleAdmin": {
                        "header": {
                            "title": "Schedule",
                            "export": "Export CSV",
                            "add": "Add Schedule",
                            "filter": {
                                "select": "Select Filter",
                                "subject": "Subject",
                                "day": "Day",
                                "time": "Time"
                            },
                            "search": "Search for a schedule by subject, day, or time"
                        },
                        "table": {
                            "columns": {
                                "subject": "Subject Name",
                                "teacher": "Teacher",
                                "grade": "Grade",
                                "day": "Day",
                                "from": "From",
                                "to": "To",
                                "actions": "Actions"
                            },
                            "noData": {
                                "title": "No Schedules Found",
                                "message": "It seems like there are no schedules in the database at the moment."
                            },
                            "deleteConfirm": "Are you sure you want to delete this schedule?"
                        },
                        "form": {
                            "addTitle": "Add Schedule",
                            "editTitle": "Update Schedule",
                            "fields": {
                                "academicYear": "Academic Year",
                                "semester": "Semester Name",
                                "subject": "Subject Name",
                                "teacher": "Teacher Name",
                                "grade": "Grade",
                                "class": "Class",
                                "day": "Day",
                                "from": "From",
                                "to": "To"
                            },
                            "placeholders": {
                                "selectAcademicYear": "Select Academic Year",
                                "selectSemester": "Select semester",
                                "selectSubject": "Select subject",
                                "selectTeacher": "Select teacher",
                                "selectGrade": "Select grade",
                                "selectClass": "Select class",
                                "selectDay": "Select day"
                            },
                            "days": {
                                "monday": "Monday",
                                "tuesday": "Tuesday",
                                "wednesday": "Wednesday",
                                "thursday": "Thursday",
                                "friday": "Friday"
                            },
                            "submit": {
                                "add": "Add Schedule",
                                "update": "Update Schedule"
                            },
                            "messages": {
                                "successAdd": "Schedule added successfully!",
                                "successUpdate": "Schedule updated successfully!",
                                "noChanges": "No changes detected.",
                                "error": "An error occurred"
                            }
                        }
                    },
                    //grade
                    "grade": {
                        "gradeNames": {
                            "Grade 1": "Grade 1",
                            "Grade 2": "Grade 2",
                            "Grade 3": "Grade 3",
                            "Grade 4": "Grade 4",
                            "Grade 5": "Grade 5",
                            "Grade 6": "Grade 6",
                            "Grade 7": "Grade 7",
                            "Grade 8": "Grade 8",
                            "Grade 9": "Grade 9",
                            "Grade 10": "Grade 10",
                            "Grade 11": "Grade 11",
                            "Grade 12": "Grade 12"
                          },
                        "header": {
                            "title": "Grades",
                            "add": "Add Grade"
                        },
                        "toggle": {
                            "add": "Add Grade",
                            "assign": "Assign Grade"
                        },
                        "form": {
                            "addTitle": "Add Grade",
                            "editTitle": "Edit Grade",
                            "assignTitle": "Assign Grade",
                            "editAssignTitle": "Edit Assigned Grade",
                            "fields": {
                                "gradeName": "Grade Name",
                                "selectGrade": "Select Grade",
                                "academicYear": "Academic Year",
                                "enterName": "Enter Grade Name"
                            },
                            "placeholders": {
                                "enterName": "Enter grade name",
                                "selectGrade": "-- Select Grade --",
                                "selectYear": "-- Select Academic Year --"
                            },
                            "buttons": {
                                "add": "Add Grade",
                                "save": "Save Changes",
                                "assign": "Assign Grade",
                                "update": "Update Grade"
                            },
                            "messages": {
                                "successAdd": "Grade added successfully!",
                                "successUpdate": "Grade updated successfully",
                                "successAssign": "Grade assigned successfully",
                                "error": "Please fill in all fields",
                                "deleteConfirm": "Are you sure you want to delete this grade?",
                                "noGrades": "No Grades Found",
                                "noGradesMessage": "It seems like there are no grades available at the moment. Please check back later or add new grades."
                            }
                        },
                        "table": {
                            "columns": {
                                "grade": "Grade",
                                "academicYear": "Academic Year",
                                "actions": "Actions"
                            },
                            "unknown": "Unknown",
                            "loading": "Loading...",
                            "error": "Error loading data"
                        }
                    },





                }
            },
            ar: {
                translation: {
                    ////////////////////////////////////////Student//////////////////////////////////////////////////////////////////

                    //Nav
                    SearchStudentPage: "البحث في صفحة الطالب",
                    Logout: "تسجيل الخروج",
                    EditProfile: "تعديل الملف الشخصي",
                    NoMatches: "لم يتم العثور على صفحات مطابقة",
                    "routes": {
                        "grades": "الدرجات",
                        "grades/assignment": "الواجبات",
                        "grades/exam": "الامتحانات",
                        "schedule": "الجدول",
                        "schedule/exam": "جدول الامتحانات",
                        "library": "المكتبة",
                        "motivation": "التحفيز",
                        "activities": "الأنشطة",
                        "activities/detailes": "تفاصيل النشاط",
                        "activities/prizes": "الجوائز",
                        "activities/contests": "المسابقات",
                        "virtualrooms": "الغرف الافتراضية",
                        "allcourses": "جميع المواد",
                        "attendance": "الحضور"
                    },
                    //Sidebar
                    KhatabSchool: "مدرسة خطاب",
                    Home: "الصفحة الرئيسية",
                    Motivation: "التحفيز",
                    Courses: "المواد",
                    Absence: "الغياب",
                    Schedule: "الجدول",
                    GradeManagements: "الدرجات",
                    Activities: "الأنشطة",
                    Library: "المكتبة",
                    SearchMangerPage: "بحث فى صفح المدير",
                    //Footer
                    LearnGrawSuccess: "تعلّم، نمُ، نجاح",
                    EmpowerGrowth: "تمكين النمو",
                    InspireLearning: "إلهام التعلم",
                    DiscoverKowledge: "اكتشف المعرفة",
                    ImagineMore: "تخيّل المزيد",
                    Unlock: "افتح الإمكانيات",
                    DreamBig: "احلم بشكل كبير",
                    ExploreIdeas: "استكشِف الأفكار",
                    AchieveGreatness: "حقق العظمة",
                    //Edit Profile
                    editProfile: {
                        title: "تعديل الملف الشخصي",
                        profileImageAlt: "صورة الملف الشخصي",
                        firstName: "الاسم الأول",
                        lastName: "الاسم الأخير",
                        gender: "الجنس",
                        genderMale: "ذكر",
                        genderFemale: "أنثى",
                        phoneNumber: "رقم الهاتف",
                        email: "البريد الإلكتروني",
                        role: "الدور",
                        saveButton: "حفظ التغييرات",
                        changePasswordTitle: "تغيير كلمة المرور",
                        currentPassword: "كلمة المرور الحالية",
                        newPassword: "كلمة المرور الجديدة",
                        confirmPassword: "تأكيد كلمة المرور الجديدة",
                        otpCode: "رمز التحقق OTP",
                        changePasswordButton: "تحديث كلمة المرور",
                    },
                    //Dashboard
                    dashboard: {
                        profileImageAlt: "صورة الطالب الشخصية",
                        presentIconAlt: "أيقونة الحضور",
                        presentToday: "لقد حضرت اليوم!",
                        greenLevel: "المستوى الأخضر",
                        diamondLevel: "المستوى الماسي",
                        goldLevel: "المستوى الذهبي",
                        awardIconAlt: "أيقونة الجائزة",
                        learningStreak: "سلسلة التعلم",
                        days: "أيام",
                        yourScore: "نقاطك",
                        quickMenu: "القائمة السريعة",
                        mainCategories: "الفئات الرئيسية",
                        continueReading: "واصل القراءة",
                        recommendedToWatch: "مقترح للمشاهدة",
                        continueButton: "واصل",
                        watchNow: "شاهد الآن",
                        type: "النوع",
                        onlineAssignments: "الواجبات عبر الإنترنت",
                        exams: "الامتحانات",
                        courseMaterials: "مواد الدورة",
                        reportCards: "كشوف الدرجات",
                        mailbox: "صندوق البريد",
                        assessments: "التقييمات",
                        activities: "الأنشطة",
                        virtualClassroom: "الفصول الافتراضية",
                        announcements: "الإعلانات",
                        videoLectures: "المحاضرات المرئية",
                        spellingLesson: "الهجاء - تعلم كيفية تهجئة الحروف",
                        farmingLesson: "الدرس 1 - كيفية زراعة ورعاية مزرعتك",
                        adaptationLesson: "التكيف - عن حياة الدببة",
                        atomVideo: "ما هو الذرة؟",
                        spellingVideo: "لنحسن تهجئتنا!"
                    },
                    menu: {
                        motivation: "التحفيز",
                        courses: "الكورسات",
                        absence: "الحضور",
                        schedule: "الجدول",
                        grades: "الدرجات",
                        activities: "الأنشطة",
                        library: "المكتبة"
                    },
                    subjects: {
                        english: "الإنجليزية",
                        arabic: "العربية",
                        science: "العلوم"
                    },
                    //Motivation

                    motivation: {
                        aboutScore: "حول نقاطك",
                        newWayTitle: "طريقة التعلم الجديدة",
                        newWayDesc: "مع نظام النقاط، يصبح التعلم مليئًا بالترفيه والمتعة. لأول مرة، ستمنحك تفاعلاتك مع الأنشطة المدرسية المختلفة مكافآت وخصومات وعروضًا حصرية لأعضائنا في العديد من الأماكن والمحلات المشهورة.",
                        whyTitle: "لماذا؟",
                        whyDesc: "عندما تتفاعل مع عناصر التعلم المختلفة والأنشطة، ستحصل على نقاط وتبدأ في التنافس مع زملائك بناءً على نقاط كل واحد، تمامًا كما لو كنت تتنافس معهم في لعبة.",
                        scoreIllustration: "رسم توضيحي للنقاط",
                        profileFrame: "إطار الصورة الشخصية",
                        scheduleIcon: "أيقونة الجدول",
                        score: "النقاط",
                        forAllSemesters: "لجميع الفصول الدراسية",
                        activitiesTitle: "عدد الأنشطة",
                        activitiesDesc: "عدد الأنشطة التي تتفاعل معها، على سبيل المثال عدد المناقشات التي تشارك فيها، عدد المحاضرات المرئية التي تشاهدها، عدد الواجبات التي تحلها، عدد الرسائل التي ترسلها، وهكذا.",
                        weightTitle: "الوزن",
                        weightDesc: "كل نشاط تقوم به له وزن محدد، على سبيل المثال، وزن حل واجب من 40 سؤالًا يختلف بالتأكيد عن وزن إرسال رسالة إلى معلمك وهكذا.",
                        gradeTitle: "الدرجة (إن وجدت)",
                        gradeDesc: "في الاختبارات أو الواجبات المنزلية، على سبيل المثال، ستؤثر الدرجة/العلامة التي تحصل عليها على نقاطك، لذلك إذا حصلت على العلامة الكاملة فستحصل على الحد الأقصى من النقاط لهذا الاختبار/الواجب.",
                        timeTitle: "الوقت (إن وجد)",
                        timeDesc: "كلما استجبت لأنشطتك في كلاسيرا بشكل أسرع، كلما حصلت على نقاط أكثر. على سبيل المثال، إذا حصلت على واجب منزلي تم إطلاقه يوم الاثنين ومفتوح حتى يوم الخميس، إذا قمت بتسليمه يوم الاثنين فستحصل على زيادة تصل إلى 25٪ في نقاطك، وإذا قمت بتسليمه قبل الموعد النهائي مباشرة فلن تحصل على أي مكافأة إضافية.",
                        summaryTitle: "ملخص نقاطك",
                        summaryDesc: "يبدأ كل عضو رحلته ببطاقة عضوية خضراء. في كل فصل دراسي، ستبدأ في كسب النقاط من اليوم الأول. ستحدد نقاطك النهائية في نهاية الفصل الدراسي نوع البطاقة التي تستحق استخدامها طوال الفصل الدراسي التالي كاعتراف بجهودك.",
                        range1: "0 و 250",
                        range2: "251 إلى 400",
                        range3: "401 أو أكثر",
                        cardText: " بطاقة.",
                        summaryPoint1: "إذا كانت نقاطك بين ",
                        summaryPoint2: "في مدرستك، فستكون مؤهلاً للحصول على بطاقة ليرنوفا ",
                        scoreFactors: "تعتمد نقاطك على العديد من العوامل، فيما يلي العوامل الأربعة الرئيسية التي تؤثر على نقاطك."
                    },
                    badges: {
                        green: "أخضر",
                        gold: "ذهبي",
                        diamond: "ماسي"
                    },
                    table: {
                        weightsLimits: "الأوزان والحدود",
                        topStudents: "أفضل الطلاب",
                        fullName: "الاسم الكامل",
                        academicNumber: "الرقم الأكاديمي",
                        totalPoints: "إجمالي النقاط",
                        badge: "الشارة",
                        module: "الوحدة",
                        activity: "النشاط",
                        points: "النقاط",
                        comments: "ملاحظات",
                        examsHomework: "الاختبارات والواجبات المنزلية والأنشطة",
                        eachQuestion: "لكل سؤال تحله",
                        points5: "5 نقاط",
                        messages: "الرسائل",
                        eachMessage: "لكل رسالة ترسلها أو ترد عليها",
                        messageComment: "تعتمد نقاطك على عدد المستلمين الذين يقرؤون رسالتك. المزيد من القراء = المزيد من النقاط. إذا لم يقرأها أحد، فلن تحصل على أي نقاط.",
                        courseMaterials: "مواد الدورة",
                        eachDownload: "لكل مادة دراسية تقوم بتنزيلها",
                        virtualClassrooms: "الفصول الافتراضية",
                        eachClass: "لكل فصل ذكي تحضره"
                    },
                    points: {
                        title: "ملخص النقاط",
                        todayPoints: "النقاط المكتسبة اليوم",
                        semesterPoints: "نقاطك لهذا الفصل",
                        allPoints: "النقاط لجميع الفصول"
                    },
                    //Courses
                    courses: {
                        "allSubjects": "جميع المواد",
                        "noSubjectsTitle": "لا توجد مواد متاحة",
                        "noSubjectsMessage": "يبدو أنه لا توجد مواد مخصصة لك في الوقت الحالي. يرجى التحقق لاحقًا.",
                        "noSubjectsAlt": "رسم توضيحي لعدم وجود مواد",
                        "lastUpdate": "آخر تحديث",
                        "startButton": "ابدأ",
                    },
                    videoSection: {
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الامتحانات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "main": {
                            "title": "محاضرات الفيديو",
                            "allTab": "الكل",
                            "bookmarksTab": "المحفوظات",
                            "noVideos": "لا توجد مواد فيديو متاحة لهذا المقرر.",
                            "noBookmarks": "لم تقم بحفظ أي فيديوهات بعد.",
                            "page": "صفحة",
                            "of": "من",
                            "loading": "جاري التحميل..."
                        },
                        "material": {
                            "type": "النوع",
                            "view": "عرض",
                            "download": "تحميل"
                        }
                    },
                    materialSection: {
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الامتحانات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "main": {
                            "title": "المواد الدراسية",
                            "allTab": "الكل",
                            "bookmarksTab": "المحفوظات",
                            "noMaterials": "لا توجد مواد PDF متاحة لهذا المقرر.",
                            "noBookmarks": "لم تقم بحفظ أي مواد بعد.",
                            "page": "صفحة",
                            "of": "من",
                            "loading": "جاري التحميل..."
                        },
                        "material": {
                            "type": "النوع",
                            "view": "عرض",
                            "download": "تحميل"
                        },
                        "error": {
                            "title": "خطأ!",
                            "confirmButton": "موافق"
                        }
                    },
                    materialDetails: {
                        "header": {
                            "backButton": "رجوع"
                        },
                        "details": {
                            "description": "الوصف",
                            "type": "النوع",
                            "uploadedBy": "تم الاضافة بواسطة",
                            "uploadDate": "تاريخ الاضافة",
                            "download": "تحميل",
                            "downloadButton": "تحميل المادة",
                            "noFile": "لا يوجد ملف متاح لهذه المادة."
                        },
                        "errors": {
                            "title": "خطأ!",
                            "confirmButton": "موافق",
                            "noMaterial": {
                                "title": "لا توجد تفاصيل للمادة",
                                "message": "يبدو أنه لا توجد تفاصيل متاحة لهذه المادة.",
                                "backButton": "العودة"
                            }
                        },
                        "mediaTypes": {
                            "youtube": "فيديو يوتيوب",
                            "pdf": "ملف PDF",
                            "googleDoc": "مستند جوجل",
                            "googleDrive": "ملف جوجل درايف"
                        }
                    },
                    virtualRooms: {
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الامتحانات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "main": {
                            "title": "الغرف الافتراضية",
                            "allTab": "الكل",
                            "completedTab": "المكتملة",
                            "missedTab": "المفقودة",
                            "noRooms": "لا توجد غرف افتراضية متاحة لهذا المقرر.",
                            "noCompleted": "لا توجد غرف افتراضية مكتملة لهذا المقرر.",
                            "noMissed": "لا توجد غرف افتراضية مفقودة لهذا المقرر.",
                            "loading": "جاري التحميل...",
                            "page": "صفحة",
                            "of": "من",
                            "teacher": "المعلم",
                            "duration": "المدة"
                        },
                        "roomStatus": {
                            "attended": "حضرت",
                            "missed": "فوتت",
                            "completed": "مكتملة",
                            "enter": "ادخل"
                        },
                        "errors": {
                            "title": "خطأ!",
                            "confirmButton": "موافق"
                        }
                    },
                    examResults: {
                        "header": {
                            "title": "نتيجة الامتحان",
                            "backButton": "رجوع"
                        },
                        "summary": {
                            "totalMarks": "إجمالي الدرجات",
                            "percentage": "النسبة المئوية",
                            "status": "الحالة",
                            "pass": "ناجح",
                            "fail": "راسب"
                        },
                        "questions": {
                            "question": "سؤال",
                            "points": "النقاط",
                            "noAnswers": "لم يتم تقديم إجابات.",
                            "correctAnswer": "الإجابة الصحيحة"
                        },
                        "errors": {
                            "title": "خطأ!",
                            "message": "حدث خطأ أثناء تحميل نتيجة الامتحان.",
                            "noResult": "لا توجد نتيجة",
                            "noResultMessage": "لم يتم العثور على نتيجة للامتحان.",
                            "backButton": "العودة"
                        }
                    },
                    exam: {
                        "header": {
                            "backButton": "رجوع"
                        },
                        "timer": {
                            "timeLeft": "الوقت المتبقي",
                            "timeUp": "انتهى الوقت! تم إرسال الامتحان تلقائياً"
                        },
                        "questions": {
                            "question": "سؤال",
                            "marks": "الدرجات",
                            "submitButton": "إرسال الامتحان",
                            "submitting": "جاري الإرسال..."
                        },
                        "alerts": {
                            "incompleteExam": {
                                "title": "امتحان غير مكتمل",
                                "message": "الرجاء الإجابة على جميع الأسئلة قبل الإرسال.",
                                "confirmButton": "موافق"
                            },
                            "noActiveSession": {
                                "title": "لا توجد جلسة نشطة",
                                "message": "إما أن الامتحان قد تم إرساله بالفعل أو انتهت الجلسة.",
                                "confirmButton": "موافق"
                            },
                            "submitted": {
                                "title": "تم إرسال الامتحان!",
                                "message": "درجتك هي {{score}}",
                                "confirmButton": "موافق"
                            },
                            "alreadySubmitted": {
                                "title": "تم الإرسال مسبقاً",
                                "message": "لقد قمت بإرسال الامتحان بالفعل. العودة إلى قائمة الامتحانات.",
                                "confirmButton": "موافق"
                            },
                            "error": {
                                "title": "خطأ!",
                                "message": "فشل في إرسال الامتحان",
                                "confirmButton": "موافق"
                            }
                        },
                        "errors": {
                            "noQuestions": "لا توجد أسئلة امتحان."
                        }
                    },
                    "exams": {
                        "alerts": {
                            "error": {
                                "title": "خطأ!",
                                "message": "فشل بدء الامتحان.",
                                "confirmButton": "موافق"
                            },
                            "notStarted": {
                                "title": "لم يبدأ بعد!",
                                "message": "الامتحان لم يبدأ بعد.",
                                "confirmButton": "موافق"
                            },
                            "examEnded": {
                                "title": "انتهى الامتحان!",
                                "message": "الامتحان انتهى بالفعل.",
                                "confirmButton": "موافق"
                            },
                            "sessionExpired": {
                                "title": "انتهت الجلسة!",
                                "message": "لا يمكنك الدخول لهذا الامتحان لأن الجلسة انتهت.",
                                "confirmButton": "موافق"
                            },
                            "activeSession": {
                                "title": "تحذير!",
                                "message": "لديك جلسة نشطة بالفعل. سيتم استئناف الامتحان السابق.",
                                "confirmButton": "متابعة"
                            }
                        },
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الامتحانات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "main": {
                            "title": "الامتحانات",
                            "loading": "جاري التحميل...",
                            "allTab": "الكل",
                            "upcomingTab": "القادمة",
                            "completedTab": "المكتملة",
                            "missedTab": "الفائتة",
                            "page": "صفحة",
                            "of": "من",
                            "noExams": {
                                "all": "لا توجد امتحانات متاحة",
                                "upcoming": "لا توجد امتحانات قادمة",
                                "completed": "لا توجد امتحانات مكتملة",
                                "missed": "لا توجد امتحانات فائتة"
                            },
                            "examCard": {
                                "description": "الوصف",
                                "createdBy": "أنشئ بواسطة",
                                "duration": "المدة",
                                "minutes": "دقائق",
                                "startTime": "وقت البدء",
                                "endTime": "وقت الانتهاء",
                                "notStartedTooltip": "الامتحان لم يبدأ بعد",
                                "endedTooltip": "الامتحان انتهى بالفعل",
                                "offline": "غير متصل",
                                "view": "عرض",
                                "notStarted": "لم يبدأ",
                                "ended": "انتهى الامتحان",
                                "start": "بدء الامتحان"
                            }
                        }
                    },
                    "assignments": {
                        "alerts": {
                            "error": {
                                "title": "خطأ!",
                                "message": "حدث خطأ ما",
                                "confirmButton": "موافق"
                            }
                        },
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الامتحانات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "main": {
                            "title": "الواجبات",
                            "loading": "جاري التحميل...",
                            "allTab": "الكل",
                            "submittedTab": "المقدمة",
                            "pendingTab": "المعلقة",
                            "missedTab": "الفائتة",
                            "page": "صفحة",
                            "of": "من",
                            "noAssignments": "لا توجد واجبات متاحة",
                            "assignmentCard": {
                                "description": "الوصف",
                                "createdBy": "أنشئ بواسطة",
                                "dueDate": "موعد التسليم",
                                "missed": "فائت",
                                "viewSubmission": "عرض التسليم",
                                "submitAssignment": "تسليم الواجب"
                            }
                        }
                    }
                    ,
                    "assignment": {
                        "view": {
                            "noAssignment": "لا يوجد واجب",
                            "noAssignmentFound": "الواجب المطلوب غير موجود",
                            "dueDate": "تاريخ الاستحقاق",
                            "enterAnswer": "أدخل إجابتك هنا...",
                            "submitAssignment": "تسليم الواجب",
                            "viewSubmission": "عرض التسليم",
                            "back": "رجوع",
                            "error": {
                                "title": "خطأ!",
                                "emptySubmission": "الرجاء إدخال نص التسليم",
                                "confirmButton": "حسناً"
                            },
                            "success": {
                                "title": "نجاح!",
                                "submitted": "تم تسليم الواجب بنجاح",
                                "confirmButton": "حسناً"
                            }
                        }
                    }
                    ,
                    "submission": {
                        "view": {
                            "title": "تفاصيل التسليم",
                            "noSubmission": "لا يوجد تسليم",
                            "noSubmissionFound": "لم تقم بتسليم أي شيء لهذا الواجب بعد",
                            "yourGrade": "درجتك",
                            "notGraded": "لم يتم التقييم بعد",
                            "dueDate": "تاريخ الاستحقاق",
                            "yourSubmission": "تسليمك",
                            "back": "رجوع",
                            "error": {
                                "title": "خطأ!",
                                "confirmButton": "حسناً"
                            }
                        }
                    }
                    ,
                    "questionBank": {
                        "title": "بنك الأسئلة",
                        "sidebar": {
                            "videoLectures": "محاضرات الفيديو",
                            "courseMaterial": "المواد الدراسية",
                            "virtualRooms": "الغرف الافتراضية",
                            "assignments": "الواجبات",
                            "exams": "الاختبارات",
                            "questionBank": "بنك الأسئلة"
                        },
                        "tabs": {
                            "all": "الكل",
                            "bookmarks": "المحفوظات"
                        },
                        "messages": {
                            "noQuestions": "لا توجد أسئلة متاحة لهذا المقرر",
                            "noBookmarks": "لم تقم بحفظ أي أسئلة بعد",
                            "loading": "جاري التحميل...",
                            "teacher": "المعلم",
                            "questionType": "نوع السؤال"
                        },
                        "pagination": {
                            "page": "صفحة",
                            "of": "من"
                        },
                        "error": {
                            "title": "خطأ!",
                            "confirmButton": "حسناً"
                        }
                    }
                    ,
                    "questionDetails": {
                        "title": "تفاصيل السؤال",
                        "back": "رجوع",
                        "type": "النوع",
                        "choices": "الاختيارات",
                        "showAnswer": "عرض الإجابة",
                        "hideAnswer": "إخفاء الإجابة",
                        "answer": "الإجابة",
                        "noDetails": "لا توجد تفاصيل للسؤال متاحة",
                        "error": {
                            "title": "خطأ!",
                            "confirmButton": "حسناً"
                        }
                    }
                    ,
                    //Attendance
                    "attendance": {
                        "title": "مستوى الحضور",
                        "present": "حاضر",
                        "absent": "غائب",
                        "academicNumber": "الرقم الأكاديمي",
                        "notAvailable": "غير متاح",
                        "weekNavigation": {
                            "previous": "الأسبوع السابق",
                            "next": "الأسبوع التالي"
                        },
                        "days": {
                            "sunday": "الأحد",
                            "monday": "الإثنين",
                            "tuesday": "الثلاثاء",
                            "wednesday": "الأربعاء",
                            "thursday": "الخميس",
                            "friday": "الجمعة",
                            "saturday": "السبت"
                        }
                    }
                    ,
                    //Schedule

                    "examSchedule": {
                        "title": "الفصول الذكية القادمة",
                        "weeklySchedule": "الجدول الأسبوعي",
                        "examSchedule": "جدول الامتحانات",
                        "noSchedules": "لا توجد جداول امتحانات متاحة",
                        "headers": {
                            "subject": "المادة",
                            "examDate": "تاريخ الامتحان",
                            "startTime": "وقت البدء",
                            "endTime": "وقت الانتهاء"
                        }
                    }
                    ,

                    "schedule": {
                        "title": "الفصول الذكية القادمة",
                        "weeklySchedule": "الجدول الأسبوعي",
                        "examSchedule": "جدول الامتحانات",
                        "noSchedule": {
                            "title": "لا يوجد جدول متاح",
                            "message": "يبدو أنه لا توجد حصص مجدولة متاحة حالياً"
                        },
                        "days": {
                            "sunday": "الأحد",
                            "monday": "الإثنين",
                            "tuesday": "الثلاثاء",
                            "wednesday": "الأربعاء",
                            "thursday": "الخميس",
                            "friday": "الجمعة",
                            "saturday": "السبت"
                        },
                        "duration": {
                            "hour": "ساعة",
                            "hours": "ساعات",
                            "minute": "دقيقة",
                            "minutes": "دقائق",
                            "and": "و"
                        }
                    }
                    ,
                    //Grades
                    "grades": {
                        "title": "درجاتك",
                        "header": {
                            "title": "اطلع على درجاتك",
                            "subtitle": "إنجازات رائعة"
                        },
                        "cards": {
                            "currentSemester": "الفصل الحالي",
                            "allYears": "كل السنوات",
                            "viewGrades": "عرض الدرجات"
                        },
                        "performance": {
                            "title": "تطور الأداء عبر الفصول",
                            "noData": "لا توجد بيانات كافية لعرض تطور الأداء"
                        }
                    }
                    ,
                    "gradesSemester": {
                        "title": "الدرجات للفصل الدراسي",
                        "back": "رجوع",
                        "noDegrees": "لا توجد درجات متاحة لهذا الفصل الدراسي",
                        "headers": {
                            "subjectName": "اسم المادة",
                            "midtermDegree": "درجة منتصف الفصل",
                            "maxMidtermDegree": "الدرجة الكاملة لمنتصف الفصل",
                            "finalDegree": "درجة نهاية الفصل",
                            "maxFinalDegree": "الدرجة الكاملة لنهاية الفصل",
                            "subjectScore": "مجموع الدرجات",
                            "maxSubjectScore": "المجموع الكامل"
                        }
                    }
                    ,
                    "gradesAllYears": {
                        "title": "الدرجات لجميع السنوات",
                        "back": "رجوع",
                        "academicYear": "السنة الأكاديمية",
                        "noDegreesTerm": "لا توجد درجات متاحة لهذا الفصل",
                        "noDegreesYear": "لا توجد درجات متاحة لهذه السنة الأكاديمية",
                        "headers": {
                            "subjectName": "اسم المادة",
                            "midtermDegree": "درجة منتصف الفصل",
                            "maxMidtermDegree": "الدرجة الكاملة لمنتصف الفصل",
                            "finalDegree": "درجة نهاية الفصل",
                            "maxFinalDegree": "الدرجة الكاملة لنهاية الفصل",
                            "subjectScore": "مجموع الدرجات",
                            "maxSubjectScore": "المجموع الكامل"
                        }
                    },
                    //Activites

                    "activities": {
                        "title": "الأنشطة",
                        "tabs": {
                            "schoolHubs": "مراكز المدرسة",
                            "contests": "المسابقات"
                        },
                        "hubCard": {
                            "registrationStart": "بداية التسجيل:",
                            "registrationEnd": "نهاية التسجيل:",
                            "contestDate": "موعد المسابقة:",
                            "details": "التفاصيل",
                            "prizes": "الجوائز",
                            "join": "انضم",
                            "disjoin": "انسحب",
                            "noHubs": "لا توجد مراكز مدرسية متاحة",
                            "noHubsMessage": "يبدو أنه لا توجد مراكز مدرسية متاحة حالياً. يرجى التحقق لاحقاً."
                        },
                        "errors": {
                            "title": "خطأ",
                            "default": "حدث خطأ ما"
                        }
                    }
                    ,
                    "activityDetails": {
                        "title": "تفاصيل النشاط",
                        "tabs": {
                            "details": "التفاصيل",
                            "prizes": "الجوائز"
                        },
                        "sections": {
                            "location": "الموقع",
                            "details": "التفاصيل"
                        },
                        "notFound": "لم يتم العثور على نشاط"
                    },
                    "errors": {
                        "title": "خطأ",
                        "default": "حدث خطأ ما"
                    }
                    ,

                    "activityPrizes": {
                        "title": "الأنشطة",
                        "tabs": {
                            "details": "التفاصيل",
                            "prizes": "الجوائز"
                        },
                        "prizeLevel": "المستوى ",
                        "notFound": "لم يتم العثور على نشاط"
                    },

                    "contests": {
                        "title": "الأنشطة",
                        "tabs": {
                            "schoolHubs": "مراكز المدرسة",
                            "contests": "المسابقات"
                        },
                        "table": {
                            "headers": {
                                "title": "العنوان",
                                "teacher": "المعلم",
                                "subject": "المادة",
                                "startDate": "تاريخ البدء",
                                "endDate": "تاريخ الانتهاء",
                                "teamMembers": "عدد أعضاء الفريق",
                                "requirements": "المتطلبات",
                                "action": "إجراء"
                            },
                            "noData": "لا توجد مسابقات متاحة",
                            "notAvailable": "غير متاح",
                            "enter": "دخول"
                        },
                        "messages": {
                            "noTeam": "لم تنضم إلى فريق بعد"
                        },
                        "errors": {
                            "title": "خطأ",
                            "default": "حدث خطأ ما"
                        }
                    }
                    , "teamDetails": {
                        "title": "تفاصيل الفريق",
                        "teamName": "اسم الفريق",
                        "contest": "المسابقة",
                        "teammates": "أعضاء الفريق",
                        "leader": "(قائد)",
                        "deleteTeam": "حذف الفريق",
                        "editTeam": "تعديل الفريق",
                        "back": "رجوع",
                        "deleteConfirmation": {
                            "title": "هل أنت متأكد؟",
                            "text": "لن تتمكن من التراجع عن هذا!",
                            "confirm": "نعم، احذفه!",
                            "successTitle": "تم الحذف!",
                            "successText": "تم حذف فريقك بنجاح.",
                            "errorTitle": "خطأ!"
                        },
                        "notAvailable": "غير متاح"
                    },
                    "editTeam": {
                        "title": "تعديل فريقك",
                        "back": "رجوع",
                        "teamName": "اسم الفريق",
                        "teamMembers": "أعضاء الفريق",
                        "leader": "(قائد)",
                        "selectMember": "اختر عضو",
                        "remove": "إزالة",
                        "addMember": "+ إضافة عضو",
                        "saveChanges": "حفظ التغييرات",
                        "limitReached": "تم الوصول للحد الأقصى!",
                        "maxMembers": "لا يمكن أن يحتوي الفريق على أكثر من {{max}} أعضاء.",
                        "success": {
                            "title": "نجاح!",
                            "text": "تم تحديث الفريق بنجاح! 🎉"
                        },
                        "error": {
                            "title": "خطأ!",
                            "text": "حدث خطأ أثناء تحديث الفريق."
                        }
                    },
                    "createTeam": {
                        "title": "إنشاء فريقك",
                        "back": "رجوع",
                        "teamName": "اسم الفريق",
                        "teamMembers": "أعضاء الفريق",
                        "selectMember": "اختر عضو",
                        "noStudents": "لا يوجد طلاب متاحين",
                        "remove": "إزالة",
                        "addMember": "+ إضافة عضو",
                        "submit": "إرسال",
                        "success": {
                            "title": "نجاح!",
                            "text": "تم إنشاء الفريق بنجاح! 🎉",
                            "confirmButton": "حسناً"
                        },
                        "error": {
                            "title": "خطأ!",
                            "text": "فشل في إنشاء الفريق. يرجى المحاولة مرة أخرى.",
                            "confirmButton": "حسناً"
                        }
                    },
                    //Library
                    "library": {
                        "title": "رحلتك الأدبية تبدأ من هنا",
                        "books": "الكتب",
                        "videos": "الفيديوهات"
                    },
                    "libraryBooks": {
                        "subjectsTitle": "المواد",
                        "all": "الكل",
                        "public": "عام",
                        "libraryTitle": "المكتبة",
                        "publicLibraryTitle": "المكتبة العامة",
                        "materialsTitle": "مواد ",
                        "noBooks": "لا توجد كتب متاحة حالياً.",
                        "noPublicBooks": "لا توجد كتب متاحة في المكتبة العامة حالياً.",
                        "noMaterials": "لا توجد مواد متاحة لـ",
                        "noMaterials2": "حالياً.",
                        "loading": "جاري التحميل...",
                        "filters": {
                            "allGrades": "كل الصفوف",
                            "allSemesters": "كل الفصول",
                            "grade": "الصف ",
                            "semester": "الفصل "
                        },
                        "general": "عام"
                    },
                    "libraryVideos": {
                        "subjectsTitle": "المواد",
                        "all": "الكل",
                        "public": "عام",
                        "libraryTitle": "مكتبة الفيديوهات",
                        "publicLibraryTitle": "مكتبة الفيديوهات العامة",
                        "materialsTitle": "فيديوهات ",
                        "noVideos": "لا توجد فيديوهات متاحة حالياً.",
                        "noPublicVideos": "لا توجد فيديوهات متاحة في المكتبة العامة حالياً.",
                        "noMaterials": "لا توجد فيديوهات متاحة لـ ",
                        "noMaterials2": "حالياً.",
                        "loading": "جاري التحميل...",
                        "filters": {
                            "allGrades": "كل الصفوف",
                            "allSemesters": "كل الفصول",
                            "grade": "الصف ",
                            "semester": "الفصل "
                        },
                        "general": "عام"
                    },
                    "libraryItem": {
                        "title": "تفاصيل العنصر",
                        "description": "الوصف",
                        "author": "المؤلف",
                        "grade": "الصف",
                        "subject": "المادة",
                        "semester": "الفصل",
                        "academicYear": "السنة الدراسية",
                        "type": "النوع",
                        "uploadedBy": "مرفوع بواسطة",
                        "download": "تحميل",
                        "downloadMaterial": "تحميل المادة",
                        "unknown": "غير معروف",
                        "na": "غير متوفر",
                        "back": "رجوع",
                        "noSupport": "لا يدعم متصفحك علامة الفيديو.",
                    },
                    ////////////////////////////////////////////////teacher//////////////////////////////////////////////////////////////////

                    //navbar
                    SearchTeacherPage: "البحث في صفحة المدرس",
                    //sidebar
                    sidebart: {
                        Dashboard: "الصفحة الرئيسية",
                        GeneralVirtualRooms: "الغرف الافتراضية العامة"
                    },
                    //dashboard
                    dashboardteacher: {
                        Mailbox: "صندوق البريد",
                        DiscussionRooms: "غرف النقاش",
                        mainCategories: "العناصر الرئيسية",
                        CustomLibraries: "المكتبات المخصصة",
                        AcademicCalendar: "التقويم الأكاديمي",
                        Welcome: "اهلا",
                        notify: "مركز الإشعارات",
                        VirtualClassrooms: "الغرف الافتراضية  ",
                        contentvr: "لا توجد فصول دراسية افتراضية جديدة اليوم.",
                    },
                    //motivation
                    motivationteacher: {
                        motidesc: "يبدأ كل عضو رحلته ببطاقة عضوية خضراء. في كل فصل دراسي، ستبدأ بجمع النقاط من اليوم الأول. نتيجتك النهائية في نهاية الفصل الدراسي ستحدد نوع البطاقة التي تستحق استخدامها خلال الفصل الدراسي التالي تقديرًا لجهودك.",
                        content01: "إذا كانت نقاطك بين 0 و250 في مدرستك، تكون مؤهلة لبطاقة Learnova.",
                        content02: " ",
                        content03: " ",
                        content04: " ",
                        content05: " ",
                        content11: "إذا كانت نقاطك تتراوح بين 251 إلى 400 في مدرستك، فسوف تكون مؤهلاً للحصول على بطاقة Learnova الذهبية.",
                        content12: " ",
                        content13: " ",
                        content14: " ",
                        content15: " ",
                        content21: "إذا كانت نقاطك 401 أو أكثر في مدرستك، فسوف تكون مؤهلاً للحصول على بطاقة Learnova الماسية. ",
                        content22: " ",
                        content23: " ",
                        content24: "  .",
                        content25: " ",
                        TopTeachers: "أفضل المعلمين",
                        Subject: "المادة",
                    },
                    //courses 
                    coursest: {
                        AllCourses: "كل المواد",
                        CurrentCourse: "المواد الحالية",
                        Search: "ابحث...",
                    },
                    //addmateial
                    addmaterial: {
                        Exams: "امتحانات",
                        Assignments: "واجبات",
                        QuestionBank: "بنك أسئلة",
                        VirtualRoom: "غرفة افتراضية",
                        CourseMaterial: "محاضرات PDF",
                        VideoLectures: "محاضرات فيديو",
                        Total: "المجموع",
                    },
                    tablesheader: {
                        Materials: "جميع المقررات للمحتوى",
                        Title: "العنوان",
                        Description: "الوصف",
                        Type: "النوع",
                        FileUrl: "عنوان الملف",
                        Actions: "الإجراءات",
                        ViewFile: "اعرض الملف",
                        EditMaterial: "تحرير المحتوى",
                        Update: "تحديث",
                        UploadMaterial: "اضافة المحتوى",
                        Upload: "اضافة",
                        Link: "الرابط",
                        Duration: "مدة الجلسة",
                        StartTime: "وقت البدأ",
                        EditVirtualRooms: "تحرير الغرف الافتراضية",
                        UploadVirtualRooms: "اضافة الغرف الافتراضية",
                        Answer: "الاجابة",
                        Question: "السؤال",
                        allquestions: "جميع الاسئلة لهذه المادة",
                        Myquestions: "أسألتى",
                        AllQuestions: "جميع الاسئلة",
                        questionType: "نوع السؤال",
                        Essay: "مقتال",
                        ShortAnswer: "اجابة مختصرة",
                        TrueFalse: "صح /خطأ",
                        MultipleChoice: "اختيار من متعدد",
                        Choices: "الاختيارات",
                        CorrectAnswer: "الاجابة الصحيحة",
                        SelectAnswer: "اختر الاجابة الصحيحة",
                        UploadQuestion: "اضافة السؤال",
                        EditQuestion: "تحرير السؤال",

                    },
                    assignmentt: {
                        MyAssignment: "واجباتى",
                        Due: "موعد الانتهاء",
                        Marks: "الدرجة",
                        NoAssignments: "لا يوجد واجبات",
                        desc: " لا يوجد واجبات متاحة فى هذا الوقت على هذا المحتوى.",
                        Submissions: "التقديمات",
                        Status: "الحالة",
                        SubmissionDate: "موعد التقديم",
                        StudentName: "اسم الطالب",
                        NoSubmissions: "لا يوجد تقديمات",
                        descs: "لا يوجد تقديمات لهذا الواجب فى هذا الوقت",
                        SubmissionDetails: "تفاصيل التقديم",
                        Submittedby: "مقدم بواسطة",
                        SubmissionText: "التقديم",
                        Submission: "التقديم",
                        Assignment: "الواجب",
                        Save: "حفظ",
                        Cancel: "الغاء",
                        Grade: "الدرجة",
                        EditGrade: "تعديل الدرجة ",
                        UpdateAssignment: "تعديل الواجب",
                        UploadAssignment: "اضافة الواجب"

                    },
                    examst: {
                        MyExams: "امتحاناتى",
                        End: "نهاية الوقت",
                        Start: "بداية الوقت",
                        Duration: "مدة الامتحان",
                        GeneralInformation: "تفاصيل المتحان",
                        Grade: "الصف",
                        Subject: "المادة",
                        Options: "الاختيارات",
                        ExamQuestions: "اسئلة الامتحان",
                        noExamsFound: "لا يوجد امتحانات",
                        noExamsDescription: "لا يوجد امتحانات متاحة فى هذا الوقت",
                        ExamResults: "نتيجة الامتحان ",
                        Percentage: "النسبة المئوية",
                        commaseparated: "افصل بفصلة ,",
                        AddQuestion: "اضف سؤال اخر",
                        CreateExam: "إنشاء امتحان",
                        UpdateExam: "تحرير الامتحان",

                    },
                    attendans: {
                        AcademicNumber: "الرقم الاكاديمي",
                        Class: "الفصل",
                        SubmitAttendance: "إرسال الحضور",
                        TakeAttendance: "تسجيل الحضور",
                        AttendanceReport: "تقرير الحضور",
                        AttendanceSummary: " ملخص الحضور",
                        GenerateReport: "انشاء التقرير",
                        "AttendanceDetails":" تفاصيل الحضور ل",
                        "AcademicNumberr":"الرقم الاكاديمي",
                        "Classs":"الفصل",
                        "TotalAbsences":"إجمالي الغيابات",
                        "TotalAttendances":"إجمالي الحضور",
                        "Date":"التاريخ",
                        "Status":"الحاله",
                    },
                    schaduel: {
                        Saturday: "السبت",
                        Friday: "الجمعة",
                        Thursday: "الخميس",
                        Wednesday: "الاربعاء",
                        Tuesday: "الثلاثاء",
                        Monday: "الاثنين",
                        Sunday: "الاحد",
                        ExportPDF: "تصدير بصيغة PDF",
                        ExamsSchedule: "جدول الامتحانات",
                        WeeklySchedule: "الجدول الاسبوعى ",

                    },
                    gradest: {
                        ExamScores: "درجات الامتحان",
                        AcademicYear: "السنة الدراسية",
                        ExportCSV: "تصدير إلى CSV",
                        UploadFile: "   تحميل الملف",
                        GetStudentsGrades: "احصل على درجات الطلاب",
                        Choosefile: "اختر ملفًا",
                        UploadGradesFile: "تحميل ملف الدرجات",
                        Gradestudents: "درجات الطلاب",
                        Selectexamtype: "اختر نوع الامتحان",
                        FinalDegree: "الدرجة النهائية",
                        StudentExamResults: "نتائج الامتحان",
                        DeleteAllData: "حذف جميع البيانات",
                        ExportData: "تصدير البيانات",
                        UploadUpdate: "تعديل واضافة",
                    },
                    activitiest: {
                        AddContest: "اضافة مسابقة",
                        Participants: "المشتركين",
                        EditContest: "تحرير المسابقة",
                    },
                    libraryt: {
                        AddLibraryItem: "إضافة عناصر المكتبة",
                        AddItem: "اضافة عنصر جديد",
                        LibraryMaterials: "عناصر المكتبة ",
                        AllMaterialsLibrary: "جميع عناصر المكتبة",
                        GeneralLibrary: "المكتبة العامة",
                        TeacherLibrary: "مكتبة المدرس",
                        Library: "المكتبة",
                        EditMaterial: "تعديل المحتوى",
                    },

                    //////////////////////////////////////////manager/////////////////////////////////////
                    dashboardm: {
                        AbsenceStatistics: "إحصائيات الغياب",
                        GradesStatistics: "إحصائيات الدرجات",
                        GradesAbsenceStatistics: "إحصائيات الدرجات والغياب",
                        Ranks: "الترتيب",
                        TopStudents: "أفضل الطلاب",
                        TopTeachers: "أفضل المعلمين",
                        Subject: "المادة",
                        Badge: "الشارة",
                        TotalPoints: "إجمالي النقاط",
                        Grade: "الصف",
                        AcademicNumber: "الرقم الأكاديمي",
                        Name: "الاسم",
                        Rank: "الترتيب",

                    },
                    schoolhubs: {
                        AddSchoolHubs: "اضافة مركز مدرسي",
                        Class: "الفصل",
                        Grade: "الصف",
                        Email: "الايميل",
                        Phone: "رقم التليفون",
                        AddPrize: "اضافة جائزة اخرى",
                        EditSchoolHub: "تعديل المركز المدرسي",
                        "phdetails":"أدخل تفاصيل مركز المدرسة",
                        "phlocation":"أدخل موقع مركز المدرسة",
                        "phtitle":"أدخل عنوان مركز المدرسة",
                        "level":"المستوي",
                        "prize":"جائزه"

                    },
                    attendanse: {
                        Classes: "الفصول",
                        Search: "ابحث بواسطة الفصل او الصف ...",
                        ClassData: "بيانات الفصل",
                        Noattendance: "لا يوجد غياب مسجل على هذا التاريخ",
                    },
                    schedulem: {
                        Time: "الوقت",
                        Addothersubjects: "اضافة مادة اخرى",
                        EndTime: " وقت الانتهاء",
                        StartTime: "وقت البدأ",
                        ExamDate: "تاريخ الامتحان",
                        Subject: "المادة",
                        Grade: "الصف",
                        Semester: "الترم",
                        AcademicYear: "السنة الدراسية",
                        AddExamSchedule: "اضافة جدول الامتحان",
                        Edit: "تحرير جدول الامتحان",
                        ExamScheduleDetails: " تفاصيل جدول الامتحان ",
                        DeleteSchedule: "حذف جدول الامتحان ",
                        ExamSchedule: " جدول الامتحانات",
                    },
                    gradesm: {
                        TotalDegree: "الدرجة الكلية",
                        FinalDegree: "الدرجة النهائية",
                        MidtermDegree: "درجة منتصف الفصل الدراسي",
                        AcademicNumber: "الرقم الأكاديمي",
                        StudentName: "اسم الطالب",
                        ExporttoCSV: "تصدير إلى CSV",
                        Nodatafound: "لم يتم العثور على بيانات للمعايير المحددة.",
                        NoResultsFound: "لم يتم العثور على نتائج",
                        Search: "بحث",
                        Subject: "المادة",
                        Class: "الفصل",
                        Grade: "الصف",
                        SearchResults: "نتائج البحث",
                        Grades: "الدرجات",
                        Resultsfor: "نتيجة"
                    },
                    ///////////////////////////////////////////////////Admin///////////////////////////////////////////

                    //Nav
                    SearchAdminPage: "البحث في صفحة المشرف",
                    //Dashboard
                    "dashboardadmin": {
                        "overview": "نظرة عامة",
                        "statistics": "إحصائيات المستخدمين",
                        "calendar": "التقويم",
                        "users": {
                            "students": "الطلاب",
                            "teachers": "المعلمين",
                            "parents": "أولياء الأمور",
                            "manager": "المدير",
                            "admin": "المشرف",
                            "terms": "الفصول",
                            "courses": "الكورسات",
                            "schedule": "الجدول"
                        },
                        "charts": {
                            "students": "الطلاب",
                            "teachers": "المعلمين",
                            "percentage": "نسبة المستخدمين حسب النوع",
                            "female": "إناث",
                            "male": "ذكور"
                        },
                        "errors": {
                            "network": "خطأ في الشبكة: فشل في جلب بعض البيانات. يرجى التحقق من اتصالك بالإنترنت.",
                            "token": "مطلوب توكن! يرجى تسجيل الدخول مرة أخرى."
                        }
                    },
                    //sidebar
                    "sidebar": {
                        "dashboard": "لوحة التحكم",
                        "members": "الأعضاء",
                        "termManagement": "إدارة الفصول",
                        "courseManagement": "إدارة الكورسات",
                        "academicYear": "السنة الأكاديمية",
                        "gradeManagement": "إدارة الصفوف",
                        "scheduleManagement": "إدارة الجدول",
                        "logout": "تسجيل الخروج",
                        "noCurrentTerm": "لا يوجد فصل دراسي حالياً",
                        "noTerms": "لا توجد فصول متاحة",
                        "schoolName": "مدرسة الخطاب",
                        "loading": "جاري التحميل...",
                    },
                    //basicform
                    AllMembers: "كل الأعضاء"
                    ,
                    //header
                    "Header": {
                        "exportCSV": "تصدير CSV",
                        "selectFilter": "اختر تصفية",
                        "filterOptions": {
                            "name": "الاسم",
                            "gender": "النوع",
                            "email": "الايميل",
                            "subject": "الماده",
                            "Class": "الفصل",
                            "Teacher": "المدرس",
                            "AcademicYear": "الرقم ألاكاديمي",
                        },
                    },
                    "studentHeader": {
                        "add": "إضافة طالب",
                        "searchPlaceholder": "ابحث عن طالب بالاسم أو النوع"
                    },
                    "teacherHeader": {
                        "add": "إضافة مدرس",
                        "searchPlaceholder": "ابحث عن مدرس بالاسم أو البريد الإلكتروني او النوع او الماده",
                        "searchPlaceholder1": "ابحث عن معلم صف حسب الفصل أو المادة أو المعلم أو السنة الدراسية"
                    },
                    "parentHeader": {
                        "add": "إضافة ولي أمر",
                        "searchPlaceholder": " ابحث عن ولي أمر بالاسم أو البريد الإلكتروني او النوع"
                    },
                    "managerHeader": {
                        "add": "إضافة مدير",
                        "searchPlaceholder": " ابحث عن مدير بالاسم أو البريد الإلكتروني او النوع"
                    },
                    "adminHeader": {
                        "add": "إضافة مشرف",
                        "searchPlaceholder": " ابحث عن مشرف بالاسم أو البريد الإلكتروني او النوع"
                    },
                    //table
                    "tableHeaders": {
                        "name": "الاسم",
                        "email": "البريد الإلكتروني",
                        "gender": "النوع",
                        "phone": "الهاتف",
                        "actions": "الإجراءات",
                        "Class": "الصف",
                        "StudentID": "معرف الطالب",
                        "AcademicNumber": "الرقم الاكاديمي ",
                        "subject": "الماده",
                        "teacher": "المدرس",
                        "AcademicYear": "السنه الاكاديميه"
                    },
                    "adminTable": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا المشرف؟",
                        "noAdminsFound": {
                            "title": "لا يوجد مشرفون",
                            "description": "يبدو أنه لا يوجد مشرفون في قاعدة البيانات حالياً."
                        }
                    },
                    "parentTable": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا الولي ألامر",
                        "noParentsFound": {
                            "title": "لا يوجد أولياء امور",
                            "description": "يبدو أنه لا يوجد أولياء أمور في قاعدة البيانات حالياً."
                        }
                    },
                    "managerTable": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا المدير",
                        "noManagersFound": {
                            "title": "لا يوجد مديرين",
                            "description": "يبدو أنه لا يوجد مديرين في قاعدة البيانات حالياً."
                        }
                    },
                    "studentTable": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا الطالب",
                        "noStudentsFound": {
                            "title": "لا يوجد طلبه",
                            "description": "يبدو أنه لا يوجد طلبه في قاعدة البيانات حالياً."
                        }
                    },
                    "teacherTable": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا المدرس",
                        "deleteConfirmation1": "هل أنت متأكد أنك تريد حذف هذا المعلم صف",
                        "noTeachersFound": {
                            "title": "لا يوجد مدرسون",
                            "description": "يبدو أنه لا يوجد مدرسون في قاعدة البيانات حالياً.",
                            "title1": " لا يوجد مدرسون صف",
                            "description1": "يبدو أنه لا يوجد مدرسون صف  في قاعدة البيانات حالياً."
                        }
                    },
                    "formLabels": {
                        "fullName": "الاسم الكامل",
                        "email": "البريد الإلكتروني",
                        "emailAddress": "البريد الإلكتروني",
                        "gender": "النوع",
                        "password": "كلمة المرور",
                        "phoneNumber": "رقم الهاتف",
                        "phone": "رقم الهاتف",
                        "subject": "الماده ",
                        "dateOfBirth": "تاريخ الميلاد",
                        "grade": "الصف",
                        "address": "العنوان",
                        "StudentName": " اسم الطالب",
                        "SelectStudentID": "اختر معرف الطالب",
                        "UploadStudents": "تحميل الطلاب",
                        "UploadExcelFile": "تحميل ملف اكسل"
                    },
                    "placeholders": {
                        "fullName": "أدخل الاسم الكامل",
                        "email": "أدخل البريد الإلكتروني",
                        "password": "أدخل كلمة المرور",
                        "password1": "أدخل كلمة المرور الجديدة (اتركها فارغة للاحتفاظ بكلمة المرور الحالية)",
                        "phoneNumber": "أدخل رقم الهاتف",
                        "enter": "أدخل",
                        "SaveChanges": "حفظ التغيرات",
                        "Updating": "جارٍ التحديث...",
                    },
                    "genderOptions": {
                        "select": "اختر النوع",
                        "male": "ذكر",
                        "female": "أنثى"
                    },
                    "gradeOptions": {
                        "select": "اختر الصف"
                    },
                    "subjectOptions": {
                        "select": "اختر الماده",
                        "loading": "تحميل المواد ...."
                    },
                    "validation": {
                        "requiredFields": "يرجى ملء جميع الحقول.",
                        "phoneValidation": "يجب أن يتكون رقم الهاتف من 11 رقمًا.",
                        "errorMessage": "حدث خطأ. يرجى المحاولة مرة أخرى.",
                        "emailValidation": "البريد الإلكتروني موجود بالفعل. يُرجى استخدام بريد إلكتروني آخر.",
                        "addsuccessstudent": "تم إضافة الطالب بنجاح !",
                        "nodata": "لم يتم العثور على أي بيانات في الملف الذي تم تحميله",
                        "addsuccessstudents": "تمت إضافة الطلاب بنجاح.  ",
                        "addsuccessstudents1": "تمت إضافة الطلاب بنجاح. في انتظار",
                        "addsuccessstudents2": " الطلاب المراد إضافتهم.",
                        "addfailstudents": "فشل في إضافة الطلاب التاليين",
                    },
                    "datatype": {
                        "AcademicData": "البيانات الأكاديميه",
                        "PersonalData": "البيانات الشخصيه"
                    },
                    "teacherdata": {
                        "Teacher": "المدرس",
                        "SelectTeacher": "اختر المدرس",
                        "Class": "الفصل",
                        "SelectClass": "اختر الفصل",
                        "SubmitAcademicData": "أرسل البيانات ألاكاديميه",
                        "AssignTeacherInfo": "تعيين معلومات المعلم",
                        "AssignTeacher": "تعيين المعلم",
                        "Addanother": "أضف آخر",
                        "SelectGrade": "اختر الصف",
                        "grade": "الصف",
                        "Subject": "الماده",
                        "Selectsubject": "اختر الماده",
                        "NoTeacherAssigned": "لم يتم تعيين معلم",
                        "NoGrade": "لا صف",
                        "Classnotfound": "لم يتم العثور على الفصل",
                        "ClassAcademicYear": "الفصل - السنه الدراسيه",
                        "SelectTeacherSubject": "اختر المدرس - الماده",
                        "SelectClassAcademicYear": "اختر الفصل - السنه الدراسيه",
                        "TeacherSubject": "المدرس - الماده",
                    },
                    "edit": {
                        "admin": "تعديل المشرف",
                        "manager": "تعديل المدير",
                        "parent": " تعديل ولي ألامر",
                        "student": " تعديل الطالب",
                        "teacher": " تعديل المدرس",
                        "classteacher": " تعديل صف المدرس",
                        "UpdateStudent": "تحديث الطالب"
                    },
                    //term
                    "termHeader": {
                        "title": "الفصل الدراسي",
                        "addButton": "إضافة فصل دراسي"
                    },
                    "termList": {
                        "noAcademicYear": "لا يوجد سنة أكاديمية متاحة",
                        "noSemester": "لا يوجد فصل دراسي متاح",
                        "semesterNames": {
                            "Semester 1": "الفصل الدراسي الأول",
                            "Semester 2": "الفصل الدراسي الثاني",
                        },
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا الفصل الدراسي؟",
                        "emptyState": {
                            "title": "لا توجد فصول دراسية",
                            "description": "يبدو أنه لا توجد فصول دراسية متاحة حالياً. يرجى التحقق لاحقاً أو إضافة فصول جديدة."
                        }
                    },
                    "termForm": {
                        "title": "إضافة فصل دراسي",
                        "labels": {
                            "termName": "اسم الفصل الدراسي",
                            "academicYear": "السنة الأكاديمية"
                        },
                        "placeholders": {
                            "selectTerm": "اختر الفصل الدراسي",
                            "selectYear": "اختر السنة",
                            "noYearsAvailable": "لا توجد سنوات أكاديمية متاحة"
                        },
                        "options": {
                            "semester1": "الفصل الدراسي الأول",
                            "semester2": "الفصل الدراسي الثاني"
                        },
                        "submitButton": "إضافة فصل دراسي",
                        "errorMessage": "حدث خطأ. يرجى المحاولة مرة أخرى."
                    },
                    "editTermForm": {
                        "title": "تعديل الفصل الدراسي",
                        "labels": {
                            "selectTerm": "اختر الفصل الدراسي",
                            "selectAcademicYear": "اختر السنة الأكاديمية"
                        },
                        "placeholders": {
                            "selectTerm": "-- اختر الفصل الدراسي --",
                            "selectAcademicYear": "-- اختر السنة الأكاديمية --"
                        },
                        "options": {
                            "semester1": "الفصل الدراسي الأول",
                            "semester2": "الفصل الدراسي الثاني"
                        },
                        "submitButton": "تحديث الفصل الدراسي",
                        "errorMessages": {
                            "requiredFields": "يرجى ملء جميع الحقول",
                            "updateFailed": "فشل تحديث الفصل الدراسي"
                        }
                    },
                    //subjects
                    "subjectsList": {
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذا المقرر؟",
                        "deleteSuccess": "تم حذف المقرر بنجاح!",
                        "emptyState": {
                            "title": "لا توجد مقررات دراسية",
                            "description": "يبدو أنه لا توجد مقررات دراسية متاحة حالياً. يرجى التحقق لاحقاً أو إضافة مقررات جديدة."
                        },
                        "subjectNames": {
                            "Arabic": "اللغة العربية",
                            "English": "اللغة الإنجليزية",
                            "Math": "الرياضيات",
                            "Science": "العلوم",
                            "History": "التاريخ"
                        }
                    },
                    "subjectsHeader": {
                        "title": "المواد الدراسية",
                        "addButton": "إضافة مادة"
                    },
                    "addSubject": {
                        "title": "إضافة مادة دراسية",
                        "labels": {
                            "subjectName": "أدخل اسم المادة"
                        },
                        "placeholders": {
                            "subjectName": "أدخل اسم المادة"
                        },
                        "buttons": {
                            "submit": "إضافة المادة"
                        },
                        "messages": {
                            "success": "تم إضافة المادة بنجاح!"
                        }
                    },
                    "subjectManagement": {
                        "tabs": {
                            "add": {
                                "title": "إضافة مادة",
                                "number": "١"
                            },
                            "assign": {
                                "title": "تعيين مادة",
                                "number": "٢"
                            }
                        }
                    },
                    "subjectHeader": {
                        "title": "المواد الدراسية",
                        "buttons": {
                            "export": "تصدير CSV",
                            "add": "إضافة مادة"
                        },
                        "filters": {
                            "default": "اختر فلتر",
                            "term": "الفصل الدراسي",
                            "grade": "الصف"
                        },
                        "search": {
                            "placeholder": "ابحث حسب الفصل أو الصف"
                        }
                    },
                    "assignSubject": {
                        "title": "تعيين مادة دراسية",
                        "labels": {
                            "subject": "اختر المادة",
                            "grade": "اختر الصف",
                            "semester": "اختر الفصل الدراسي"
                        },
                        "placeholders": {
                            "subject": "-- اختر المادة --",
                            "grade": "-- اختر الصف --",
                            "semester": "-- اختر الفصل --"
                        },
                        "buttons": {
                            "submit": "تعيين المادة",
                            "loading": "جاري التحميل..."
                        },
                        "errors": {
                            "requiredFields": "يرجى ملء جميع الحقول"
                        }
                    },
                    "assignedSubjects": {
                        "tableHeaders": {
                            "subject": "المادة",
                            "grade": "الصف",
                            "term": "الفصل الدراسي",
                            "actions": "الإجراءات"
                        },
                        "emptyState": {
                            "title": "لا توجد مواد",
                            "description": "يبدو أنه لا توجد مواد في قاعدة البيانات حالياً."
                        },
                        "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذه المادة؟",
                        "unknownGrade": "غير معروف"
                    },
                    "editAssignedSubject": {
                        "title": "تعديل المادة المخصصة",
                        "labels": {
                            "subject": "اختر المادة",
                            "grade": "اختر الصف",
                            "semester": "اختر الفصل الدراسي"
                        },
                        "placeholders": {
                            "subject": "-- اختر المادة --",
                            "grade": "-- اختر الصف --",
                            "semester": "-- اختر الفصل --"
                        },
                        "buttons": {
                            "submit": "تحديث المادة"
                        },
                        "messages": {
                            "requiredFields": "يرجى ملء جميع الحقول",
                            "success": "تم تحديث المادة بنجاح",
                            "error": "فشل تحديث المادة"
                        }
                    },
                    "editSubject": {
                        "title": "تعديل المادة",
                        "labels": {
                            "subjectName": "أدخل اسم المادة"
                        },
                        "placeholders": {
                            "subjectName": "أدخل اسم المادة"
                        },
                        "buttons": {
                            "submit": "حفظ التغييرات"
                        },
                        "messages": {
                            "success": "تم تحديث المادة بنجاح",
                            "error": "فشل تحديث المادة"
                        }
                    },
                    //academic year
                    "academicYear": {
                        "form": {
                            "title": "إضافة سنة أكاديمية",
                            "labels": {
                                "startYear": "سنة البدء",
                                "endYear": "سنة الانتهاء"
                            },
                            "placeholders": {
                                "startYear": "سنة البدء (مثال: 2023)",
                                "endYear": "سنة الانتهاء (مثال: 2024)"
                            },
                            "buttons": {
                                "add": "إضافة سنة",
                                "update": "تحديث السنة"
                            }
                        },
                        "editForm": {
                            "title": "تعديل السنة"
                        },
                        "list": {
                            "title": "جميع السنوات",
                            "addButton": "إضافة سنة",
                            "deleteConfirmation": "هل أنت متأكد أنك تريد حذف هذه السنة الأكاديمية؟",
                            "emptyState": {
                                "title": "لا توجد سنوات أكاديمية",
                                "description": "يبدو أنه لا توجد سنوات أكاديمية متاحة حالياً. يرجى التحقق لاحقاً أو إضافة سنوات جديدة."
                            }
                        }
                    },
                    //schedule
                    "scheduleAdmin": {
                        "header": {
                            "title": "الجدول",
                            "export": "تصدير CSV",
                            "add": "إضافة جدول",
                            "filter": {
                                "select": "اختر عامل التصفية",
                                "subject": "المادة",
                                "day": "اليوم",
                                "time": "الوقت"
                            },
                            "search": "ابحث عن جدول بالمادة، اليوم أو الوقت"
                        },
                        "table": {
                            "columns": {
                                "subject": "اسم المادة",
                                "teacher": "المعلم",
                                "grade": "الصف",
                                "day": "اليوم",
                                "from": "من",
                                "to": "إلى",
                                "actions": "الإجراءات"
                            },
                            "noData": {
                                "title": "لا توجد جداول",
                                "message": "يبدو أنه لا توجد جداول في قاعدة البيانات حالياً."
                            },
                            "deleteConfirm": "هل أنت متأكد أنك تريد حذف هذا الجدول؟"
                        },
                        "form": {
                            "addTitle": "إضافة جدول",
                            "editTitle": "تحديث الجدول",
                            "fields": {
                                "academicYear": "السنة الأكاديمية",
                                "semester": "اسم الفصل الدراسي",
                                "subject": "اسم المادة",
                                "teacher": "اسم المعلم",
                                "grade": "الصف",
                                "class": "الفصل",
                                "day": "اليوم",
                                "from": "من",
                                "to": "إلى"
                            },
                            "placeholders": {
                                "selectAcademicYear": "اختر السنة الأكاديمية",
                                "selectSemester": "اختر الفصل الدراسي",
                                "selectSubject": "اختر المادة",
                                "selectTeacher": "اختر المعلم",
                                "selectGrade": "اختر الصف",
                                "selectClass": "اختر الفصل",
                                "selectDay": "اختر اليوم"
                            },
                            "days": {
                                "monday": "الإثنين",
                                "tuesday": "الثلاثاء",
                                "wednesday": "الأربعاء",
                                "thursday": "الخميس",
                                "friday": "الجمعة"
                            },
                            "submit": {
                                "add": "إضافة جدول",
                                "update": "تحديث الجدول"
                            },
                            "messages": {
                                "successAdd": "تم إضافة الجدول بنجاح!",
                                "successUpdate": "تم تحديث الجدول بنجاح!",
                                "noChanges": "لم يتم اكتشاف أي تغييرات.",
                                "error": "حدث خطأ"
                            }
                        }
                    }
                    ,
                    //grade
                    "grade": {
                        "gradeNames": {
                            "Grade 1": "الصف الأول",
                            "Grade 2": "الصف الثاني",
                            "Grade 3": "الصف الثالث",
                            "Grade 4": "الصف الرابع",
                            "Grade 5": "الصف الخامس",
                            "Grade 6": "الصف السادس",
                            "Grade 7": "الصف السابع",
                            "Grade 8": "الصف الثامن",
                            "Grade 9": "الصف التاسع",
                            "Grade 10": "الصف العاشر",
                            "Grade 11": "الصف الحادي عشر",
                            "Grade 12": "الصف الثاني عشر"
                          },
                        "header": {
                            "title": "الصفوف",
                            "add": "إضافة صف"
                        },
                        "toggle": {
                            "add": "إضافة صف",
                            "assign": "تعيين صف"
                        },
                        "form": {
                            "addTitle": "إضافة صف",
                            "editTitle": "تعديل الصف",
                            "assignTitle": "تعيين صف",
                            "editAssignTitle": "تعديل الصف المعين",
                            "fields": {
                                "gradeName": "اسم الصف",
                                "selectGrade": "اختر الصف",
                                "academicYear": "السنة الأكاديمية",
                                "enterName": "أدخل اسم الصف"
                            },
                            "placeholders": {
                                "enterName": "أدخل اسم الصف",
                                "selectGrade": "-- اختر الصف --",
                                "selectYear": "-- اختر السنة الأكاديمية --"
                            },
                            "buttons": {
                                "add": "إضافة صف",
                                "save": "حفظ التغييرات",
                                "assign": "تعيين الصف",
                                "update": "تحديث الصف"
                            },
                            "messages": {
                                "successAdd": "تم إضافة الصف بنجاح!",
                                "successUpdate": "تم تحديث الصف بنجاح",
                                "successAssign": "تم تعيين الصف بنجاح",
                                "error": "يرجى ملء جميع الحقول",
                                "deleteConfirm": "هل أنت متأكد أنك تريد حذف هذا الصف؟",
                                "noGrades": "لا توجد صفوف",
                                "noGradesMessage": "يبدو أنه لا توجد صفوف متاحة في الوقت الحالي. يرجى التحقق لاحقًا أو إضافة صفوف جديدة."
                            }
                        },
                        "table": {
                            "columns": {
                                "grade": "الصف",
                                "academicYear": "السنة الأكاديمية",
                                "actions": "الإجراءات"
                            },
                            "unknown": "غير معروف",
                            "loading": "جاري التحميل...",
                            "error": "خطأ في تحميل البيانات"
                        }
                    },



                }
            }
        },
        lng: localStorage.getItem('i18nextLng') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
