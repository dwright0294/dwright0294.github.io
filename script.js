document.addEventListener("DOMContentLoaded", function() {
    const citButton = document.getElementById("citButton");
    const busButton = document.getElementById("busButton");
    const studentDataDiv = document.getElementById("studentData");

    citButton.addEventListener("click", function() {
        fetchData("CIT");
    });

    busButton.addEventListener("click", function() {
        fetchData("BUS");
    });

    function fetchData(major) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "cit5students.json", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const students = JSON.parse(xhr.responseText);
                const filteredStudents = students.filter(student => student.major === major);
                renderStudents(filteredStudents);
            }
        };
        xhr.send();
    }

    function renderStudents(students) {
        const source = document.getElementById("student-template").innerHTML;
        const template = Handlebars.compile(source);
        const context = { students: students };
        const html = template(context);
        studentDataDiv.innerHTML = html;
    }
});
