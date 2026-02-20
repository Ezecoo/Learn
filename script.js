// Simple in-memory "database"
let users = [];
let courses = [];
let currentUser = null;

// Login simulation
function login() {
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  currentUser = { email, role, courses: [] };
  users.push(currentUser);

  document.getElementById('loginPage').classList.add('hidden');

  if(role === 'teacher') {
    document.getElementById('teacherDashboard').classList.remove('hidden');
    renderTeacherCourses();
  } else {
    document.getElementById('studentDashboard').classList.remove('hidden');
    renderStudentCourses();
  }
}

// Teacher creates a course
function createCourse() {
  const title = document.getElementById('courseTitle').value;
  const code = document.getElementById('studentCode').value;

  const course = {
    id: Date.now(),
    title,
    studentCode: code,
    teacherEmail: currentUser.email,
    lessons: []
  };

  courses.push(course);
  currentUser.courses.push(course);
  renderTeacherCourses();
  alert('Course created!');
}

// Render teacher courses
function renderTeacherCourses() {
  const ul = document.getElementById('teacherCourses');
  ul.innerHTML = '';
  currentUser.courses.forEach(course => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${course.title}</b> - Code: ${course.studentCode} <button onclick="addLesson(${course.id})">Add Lesson</button>`;
    ul.appendChild(li);
  });
}

// Teacher adds lesson
function addLesson(courseId) {
  const title = prompt("Lesson Title:");
  const video = prompt("Video URL:");
  const question = prompt("Quiz Question (optional):");
  const answer = question ? prompt("Answer:") : null;

  const course = courses.find(c => c.id === courseId);
  course.lessons.push({ title, video, quiz: question ? { question, answer } : null });

  alert("Lesson added!");
}

// Student joins course
function joinCourse() {
  const code = document.getElementById('joinCode').value;
  const course = courses.find(c => c.studentCode === code);

  if(course) {
    currentUser.courses.push(course);
    renderStudentCourses();
    alert("Joined course: " + course.title);
  } else {
    alert("Invalid code!");
  }
}

// Render student courses
function renderStudentCourses() {
  const ul = document.getElementById('studentCourses');
  ul.innerHTML = '';
  currentUser.courses.forEach(course => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${course.title}</b> - <button onclick="viewCourse(${course.id})">View Lessons</button>`;
    ul.appendChild(li);
  });
}

// View lessons
function viewCourse(courseId) {
  const course = courses.find(c => c.id === courseId);
  let msg = `Lessons for ${course.title}:\n\n`;
  course.lessons.forEach((lesson, i) => {
    msg += `${i+1}. ${lesson.title}\nVideo: ${lesson.video}\n`;
    if(lesson.quiz) msg += `Quiz: ${lesson.quiz.question}\n`;
    msg += '\n';
  });
  alert(msg);
  }
