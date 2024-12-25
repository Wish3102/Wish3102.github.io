document.addEventListener('DOMContentLoaded', () => {
    const majorDropdown = document.getElementById('major');
    const otherMajorContainer = document.getElementById('other-major-container');
    const recommendationsDiv = document.getElementById('recommendations');
    const submitBtn = document.getElementById('submit-btn');

    // Show/hide the "Other" major textbox based on the dropdown selection
    majorDropdown.addEventListener('change', () => {
        if (majorDropdown.value === 'Other') {
            otherMajorContainer.style.display = 'block';
        } else {
            otherMajorContainer.style.display = 'none';
        }
    });

    // Fetch course data from courses.json file
    fetch('./courses.json')
        .then(response => response.json())
        .then(data => {
            const coursesData = data;

            // Handle form submission
            submitBtn.addEventListener('click', () => {
                const major = majorDropdown.value;
                const classification = document.getElementById('classification').value;
                const otherMajor = document.getElementById('other-major').value;

                let recommendations = '';

                // Check if data exists for selected major and classification
                if (coursesData[major] && coursesData[major][classification]) {
                    recommendations = "Here are your tailored course recommendations:<br><br>";
                    recommendations += coursesData[major][classification].map(course =>
                        `${course.CourseNumber}: ${course.CourseName} (${course.Hours} hrs)`
                    ).join('<br>');
                } else {
                    recommendations = `No specific recommendations available for ${classification} in ${major}.`;
                }

                // Display the recommendations
                recommendationsDiv.innerHTML = `<h3>Recommendations:</h3><p>${recommendations}</p>`;
            });
        })
        .catch(error => console.error('Error loading course data:', error));
});
