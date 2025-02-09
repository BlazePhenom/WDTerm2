document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.getElementById("workout-form");
    const workoutList = document.getElementById("workout-list");
    const mealForm = document.getElementById("meal-form");
    const mealList = document.getElementById("meal-list");
    const mealButton = document.getElementById("generate-meal");
    const aiOutput = document.getElementById("ai-output");
    const badgesContainer = document.getElementById("badges-container");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    let workoutCount = 0;
    let mealCount = 0;

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Display Locked Badges Initially (No images, just text)
    badgesContainer.innerHTML = `
        <div class="badge locked"><p>🔥 Workout Warrior: Complete 10 workouts to unlock!</p></div>
        <div class="badge locked"><p>🥇 Protein Pro: Eat 5 high-protein meals to unlock!</p></div>
        <div class="badge locked"><p>🏅 Health Master: Complete 100 push-ups & 2 salad meals to unlock!</p></div>
    `;

    // Workout Logging
    workoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const exercise = document.getElementById("exercise").value;
        const duration = document.getElementById("duration").value;

        if (exercise && duration) {
            const listItem = document.createElement("li");
            listItem.textContent = `${exercise} - ${duration} min`;
            workoutList.appendChild(listItem);
            workoutForm.reset();
            workoutCount++;
            checkForBadges();
        }
    });

    // Meal Logging
    mealForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const meal = document.getElementById("meal").value;

        if (meal) {
            const listItem = document.createElement("li");
            listItem.textContent = meal;
            mealList.appendChild(listItem);
            mealForm.reset();
            mealCount++;
            checkForBadges();
        }
    });

    // Nutritionix API Integration for AI Meal Suggestions
    mealButton.addEventListener("click", () => {
        const dietType = document.getElementById("diet-type").value;
        const goalType = document.getElementById("goal-type").value;

        let query;
        if (goalType === "keto") query = "avocado salad";
        else if (goalType === "bulk") query = "chicken breast meal";
        else query = "quinoa meal";

        fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": "04523221",
                "x-app-key": "37743d116badc60b33eae19a2d993aa9"
            },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            if (data.foods && data.foods.length > 0) {
                const meal = data.foods[0];
                aiOutput.innerHTML = `
                    <strong>Recommended Meal:</strong> ${meal.food_name}<br>
                    <strong>Calories:</strong> ${meal.nf_calories} kcal<br>
                    <strong>Protein:</strong> ${meal.nf_protein}g<br>
                    <strong>Carbs:</strong> ${meal.nf_total_carbohydrate}g<br>
                    <strong>Fats:</strong> ${meal.nf_total_fat}g
                `;
            } else {
                aiOutput.innerHTML = "No meal suggestions found.";
            }
        })
        .catch(error => {
            console.error("Error fetching Nutritionix data:", error);
            aiOutput.innerHTML = "Error fetching meal data. Try again!";
        });
    });

    // Notifications
    const notificationButton = document.getElementById("enable-notifications");
    const notificationOutput = document.getElementById("notification-output");

    notificationButton.addEventListener("click", () => {
        notificationOutput.innerHTML = "🔔 Notifications enabled! Stay on track.";
    });

    // Badge Achievements
    function checkForBadges() {
        const badgeElements = document.querySelectorAll(".badge");
        
        if (workoutCount >= 10) {
            badgeElements[0].classList.remove("locked");
            badgeElements[0].querySelector("p").textContent = "🔥 Workout Warrior: Completed 10 workouts!";
        }
        if (mealCount >= 5) {
            badgeElements[1].classList.remove("locked");
            badgeElements[1].querySelector("p").textContent = "🥇 Protein Pro: Ate 5 high-protein meals!";
        }
        if (workoutCount >= 100 && mealCount >= 2) {
            badgeElements[2].classList.remove("locked");
            badgeElements[2].querySelector("p").textContent = "🏅 Health Master: Completed 100 push-ups & 2 salad meals!";
        }
    }

    // Progress Chart
    const ctx = document.getElementById("progress-chart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Workouts Completed",
                data: [2, 4, 5, 7],
                backgroundColor: "#28a745"
            }]
        }
    });
});
document.getElementById("generate-meal").addEventListener("click", async () => {
    const query = document.getElementById("meal-query").value.trim();
    if (!query) {
        alert("Please enter a food item.");
        return;
    }

    const appId = "04523221"; // Replace with your App ID
    const apiKey = "37743d116badc60b33eae19a2d993aa9"; // Replace with your API Key
    const apiUrl = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": appId,
                "x-app-key": apiKey
            },
            body: JSON.stringify({ query: query })
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        displayNutritionInfo(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching nutrition data. Please try again.");
    }
});

function displayNutritionInfo(data) {
    const outputDiv = document.getElementById("nutritionix-output");
    outputDiv.innerHTML = ""; // Clear previous results

    data.foods.forEach(food => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        foodItem.innerHTML = `
            <h3>${food.food_name}</h3>
            <p>Calories: ${food.nf_calories} kcal</p>
            <p>Protein: ${food.nf_protein} g</p>
            <p>Carbs: ${food.nf_total_carbohydrate} g</p>
            <p>Fats: ${food.nf_total_fat} g</p>
        `;
        outputDiv.appendChild(foodItem);
    });
}
