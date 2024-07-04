// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the forms and table elements
    const courseForm = document.getElementById('courseForm');
    const studentForm = document.getElementById('studentForm');
    const studentCourseTable = document.getElementById('studentCourseTable').getElementsByTagName('tbody')[0];
    const averageTable = document.getElementById('averageTable').getElementsByTagName('tbody')[0];
    const existingCoursesTable = document.getElementById('existingCoursesTable').getElementsByTagName('tbody')[0];

    const courseSelect = document.getElementById('courses');
    const dataSection = document.getElementById('data-section');
    const averageSection = document.getElementById('average-section');
    const courseSection = document.getElementById('course-section');
    const studentSection = document.getElementById('student-section');
    const toggleButton = document.getElementById('toggleButton');

    // Hide data and average sections initially
    dataSection.style.display = 'none';
    averageSection.style.display = 'none';

    // Load courses and student data from local storage or initialize with empty arrays
    let courses = new Set(JSON.parse(localStorage.getItem('courses')) || []);
    let studentCourses = JSON.parse(localStorage.getItem('studentCourses')) || [];
    let studentResults = JSON.parse(localStorage.getItem('studentResults')) || {};

    // Define a class for Course
    class Course {
        constructor(name) {
            this.name = name;
        }
    }

    // Define a class for StudentCourse
    class StudentCourse {
        constructor(course, result, semester) {
            this.course = course;
            this.result = result;
            this.semester = semester;
        }
    }

    // Define a class for StudentResult
    class StudentResult {
        constructor() {
            this.courses = [];
            this.results = [];
        }

        // Method to add a course result
        addCourseResult(course, result) {
            this.courses.push(course);
            this.results.push(Number(result)); // Ensure results are numbers
        }

        // Method to calculate average GPA
        calculateAverage() {
            const total = this.results.reduce((acc, curr) => acc + curr, 0);
            return (total / this.courses.length).toFixed(2); // Use this.courses.length
        }
    }

    // Initialize studentResults object if empty
    if (!studentResults.courses) {
        studentResults = new StudentResult();
    } else {
        const temp = new StudentResult();
        temp.courses = studentResults.courses;
        temp.results = studentResults.results;
        studentResults = temp;
    }

    // Function to populate the course selection dropdown
    function populateCourseSelect() {
        courseSelect.innerHTML = '<option value="" disabled selected>Select a course</option>';
        // courses.forEach(course => {
        //     const option = document.createElement('option');
        //     option.value = course;
        //     option.textContent = course;
        //     courseSelect.appendChild(option);
        // });
        Array.from(courses).slice(2).forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
    }

    // Function to add a course to the course list
    function addCourseToTable(course) {
        courses.add(course.name);
        saveCourses();
        populateCourseSelect();
        refreshExistingCoursesTable();
    }

    // Function to add existing courses to the table
    function refreshExistingCoursesTable() {
        existingCoursesTable.innerHTML = '';
        console.log(courses);
        // courses.forEach(course => {
        //     const newRow = existingCoursesTable.insertRow();
        //     newRow.insertCell(0).textContent = course;
        // });
        Array.from(courses).slice(2).forEach(course => {
            const newRow = existingCoursesTable.insertRow();
            newRow.insertCell(0).textContent = course;
        });
    }

    // Function to add student course data to the table
    function addStudentCourseToTable(studentCourse, index) {
        console.log('dddd');
        // const existingCourse = studentCourses.find(sc => sc.course === studentCourse.course);
        // if (existingCourse) {
        //     alert('This course already exists in the table.');
        //     return;
        // }

        const newRow = studentCourseTable.insertRow();

        newRow.insertCell(0).textContent = studentCourse.course;
        newRow.insertCell(1).textContent = studentCourse.result;
        newRow.insertCell(2).textContent = studentCourse.semester;
        
        // Create delete button
        const deleteCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteStudentCourse(index);
        deleteCell.appendChild(deleteButton);
    }

    // Function to add student average data to the table
    function addStudentAverageToTable(studentResult) {
        const newRow = averageTable.insertRow();

        newRow.insertCell(0).textContent = studentResult.courses.length;
        newRow.insertCell(1).textContent = studentResult.calculateAverage();
    }

    // Function to save courses to local storage
    function saveCourses() {
        localStorage.setItem('courses', JSON.stringify(Array.from(courses)));
    }

    // Function to save student courses to local storage
    function saveStudentCourses() {
        localStorage.setItem('studentCourses', JSON.stringify(studentCourses));
    }

    // Function to save student results to local storage
    function saveStudentResults() {
        localStorage.setItem('studentResults', JSON.stringify(studentResults));
    }

    // Event listener for the course form submission
    courseForm.addEventListener('submit', event => {
        event.preventDefault();
        const courseName = document.getElementById('courseName').value;
        const course = new Course(courseName);
        addCourseToTable(course);
        courseForm.reset();
        alert('Course added successfully!');
    });

    // Function to add course data to a student
    window.addCourseToStudent = function() {
        const semester = document.getElementById('semester').value;
        const course = courseSelect.value;
        const examResult = document.getElementById('examResult').value;

        // if (!course) return alert('Please select a course.');

        const studentCourse = new StudentCourse(course, examResult, semester);
        // const existingCourse = studentCourses.find(sc => sc.course === studentCourse.course);
        // if (existingCourse) {
        //     alert('This course already exists in the table.');
        //     return;
        // }

        studentCourses.push(studentCourse);
        addStudentCourseToTable(studentCourse, studentCourses.length - 1);

        studentResults.addCourseResult(course, examResult);

        saveStudentCourses();
        saveStudentResults();
        populateAverageTable();

        // Reset the form and show success alert
        studentForm.reset();
        alert('Course data added successfully!');
    };

    // Function to delete a student course
    function deleteStudentCourse(index) {
        const studentCourse = studentCourses[index];
        const { course, result } = studentCourse;

        // Remove course from student's results
        const courseIndex = studentResults.courses.indexOf(course);
        if (courseIndex > -1) {
            studentResults.courses.splice(courseIndex, 1);
            studentResults.results.splice(courseIndex, 1);
        }

        // Remove course from studentCourses array and update local storage
        studentCourses.splice(index, 1);
        saveStudentCourses();
        saveStudentResults();

        // Refresh tables
        refreshTables();
    }

    // Function to refresh the student course and average tables
    function refreshTables() {
        studentCourseTable.innerHTML = '';
        studentCourses.forEach((studentCourse, index) => addStudentCourseToTable(studentCourse, index));
        populateAverageTable();
    }

    // Function to populate the average table with student data
    function populateAverageTable() {
        averageTable.innerHTML = '';
        addStudentAverageToTable(studentResults);
    }

    // Function to toggle table visibility and input mask
    function toggleTables() {
        const isHidden = dataSection.style.display === 'none';
        dataSection.style.display = isHidden ? 'block' : 'none';
        averageSection.style.display = isHidden ? 'block' : 'none';
        courseSection.style.display = isHidden ? 'none' : 'block';
        studentSection.style.display = isHidden ? 'none' : 'block';
        toggleButton.textContent = isHidden ? 'Hide Tables' : 'Show Tables';
    }

    // Add event listener to the toggle button
    toggleButton.addEventListener('click', toggleTables);

    // Populate the course select dropdown and student tables on page load
    populateCourseSelect();
    refreshExistingCoursesTable();
    studentCourses.forEach((studentCourse, index) => addStudentCourseToTable(studentCourse, index));
    populateAverageTable();
});
