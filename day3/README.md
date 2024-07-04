# Student Course Tracker Documentation

## Table of Contents

1. [Wireframes](#wireframes)
2. [Code Description](#code-description)

## Wireframes

### User Instructions
- User can add add new courses he is taking
- after exam, user can add the course information, like course name, semester number, course result
- in the end, student can see the result in each semester, and get the average of all courses he took
- in the result table, the courses would be show in the section of each semester.
### Add New Course

![Add New Course](https://via.placeholder.com/300x200.png?text=Add+New+Course+Form)

- **Label**: Course Name
- **Input Field**: Text input for course name
- **Button**: Add Course

### Existing Courses

![Existing Courses](https://via.placeholder.com/300x200.png?text=Existing+Courses+Table)

- **Table Columns**: Course Name

### Add Course Data

![Add Course Data](https://via.placeholder.com/300x200.png?text=Add+Course+Data+Form)

- **Label**: Semester
- **Input Field**: Text input for semester
- **Label**: Courses
- **Dropdown**: Select input for existing courses
- **Label**: Exam Result
- **Input Field**: Number input for exam result
- **Button**: Add Course

### Course Data

![Course Data](https://via.placeholder.com/300x200.png?text=Course+Data+Table)

- **Table Columns**: Course Name, Exam Result, Semester, Actions

### Average Results

![Average Results](https://via.placeholder.com/300x200.png?text=Average+Results+Table)

- **Table Columns**: Number of Courses, Average Result

### Toggle Button

![Toggle Button](https://via.placeholder.com/150x50.png?text=Toggle+Button)

- **Button**: Show/Hide Tables

## Code Description

### HTML Structure

- The main structure is wrapped in a `<div class="container">` to center the content.
- There are multiple sections: 
  - `course-section`: For adding new courses and displaying existing courses.
  - `student-section`: For adding course data.
  - `data-section`: For displaying student course data.
  - `average-section`: For displaying average results.
- Each section contains relevant forms and tables.

### CSS Styling

- **Body**: Uses flexbox to center content both vertically and horizontally.
- **Container**: Adds padding, background color, border-radius, and box-shadow for a card-like appearance.
- **Forms and Inputs**: Consistent padding and margins, with a maximum width to keep them from stretching too wide.
- **Buttons**: Styled with background color, text color, border-radius, and a hover effect.
- **Tables**: Styled with borders, padding, and a background color for headers.

### JavaScript Functionality

1. **Document Ready**: 
   - Waits for the DOM to load before running the script.

2. **DOM References**: 
   - Gets references to forms, tables, and other elements using `getElementById`.

3. **Data Initialization**:
   - Loads courses and student data from local storage or initializes with empty arrays.

4. **Class Definitions**:
   - `Course`, `StudentCourse`, and `StudentResult` classes are defined to manage data.

5. **Populate Course Select Dropdown**:
   - Clears current options and populates the dropdown with available courses, skipping the first two.

6. **Add Course to Table**:
   - Adds a new course to the `courses` set, saves it to local storage, updates the dropdown, and refreshes the existing courses table.

7. **Refresh Existing Courses Table**:
   - Clears the table and populates it with courses, skipping the first two.

8. **Add Student Course Data to Table**:
   - Checks for duplicate courses, adds new data to the student course table, and updates local storage.

9. **Add Student Average Data to Table**:
   - Calculates and displays the average results in the average table.

10. **Save Data to Local Storage**:
    - Functions to save courses, student courses, and student results to local storage.

11. **Form Submission Handlers**:
    - Handles form submissions for adding new courses and student course data, resets forms, and shows success alerts.

12. **Delete Student Course**:
    - Deletes a course from the student course data and updates local storage.

13. **Refresh Tables**:
    - Clears and repopulates the student course and average tables.

14. **Toggle Table Visibility**:
    - Toggles the visibility of the tables and input forms, and updates the button label.

### Local Storage Usage

- **Courses**: Stored as a set in local storage.
- **Student Courses**: Stored as an array in local storage.
- **Student Results**: Stored as an object in local storage.

### Event Listeners

- **Form Submission**: Listeners for form submissions to add new courses and student course data.
- **Toggle Button**: Listener to toggle the visibility of the tables and input forms.

