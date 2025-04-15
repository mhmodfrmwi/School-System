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
                    },
                    "errors": {
                        "title": "Error",
                        "default": "An error occurred"
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
                    sidebar: {
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

                    }


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
                            "uploadedBy": "تم الرفع بواسطة",
                            "uploadDate": "تاريخ الرفع",
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
                    "errors": {
                        "title": "خطأ",
                        "default": "حدث خطأ ما"
                    }
                    ,

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
                    sidebar: {
                        Dashboard: "الصفحة الرئيسية",
                        GeneralVirtualRooms: "الغرف الافتراضية العامة"
                    },
                    //dashboard
                    dashboardteacher: {
                        Mailbox: "صندوق البريد",
                        DiscussionRooms: "غرف النقاش",
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
                        UploadMaterial: "رفع المحتوى",
                        Upload: "رفع",
                        Link: "الرابط",
                        Duration: "مدة الجلسة",
                        StartTime: "وقت البدأ",
                        EditVirtualRooms: "تحرير الغرف الافتراضية",
                        UploadVirtualRooms: "رفع الغرف الافتراضية",
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
                        UploadQuestion: "رفع السؤال",
                        EditQuestion: "تحرير السؤال",

                    }



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
