
const checkboxes = document.querySelectorAll(
    '.task input[type="checkbox"]'
);

const pendingCount = document.getElementById('pendingTasks');
const completedCount = document.getElementById('completedTasks');

// Step 1: Load saved checkbox states
checkboxes.forEach(function (checkbox, index) {
    const savedState = localStorage.getItem('task-' + index);

    if (savedState !== null) {
        checkbox.checked = savedState === 'true';
    }
});

// Step 2: Update counts and save checkbox states
function updateTaskCounts() {
    let completed = 0;

    checkboxes.forEach(function (checkbox, index) {
        if (checkbox.checked) {
            completed++;
        }

        localStorage.setItem(
            'task-' + index,
            checkbox.checked
        );
    });

    completedCount.textContent = 15 + completed;
    pendingCount.textContent = 8 - completed;
}

// Step 3: Listen for checkbox changes
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateTaskCounts);
});

// Show correct counts when page loads
updateTaskCounts();

// New Meeting button
document.getElementById('newMeetingBtn').addEventListener('click', function () {
    window.location.href = 'new-meeting.html';
});
