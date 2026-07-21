# Firestore schema (recommended)

## Collections

- `users/{uid}`
  - displayName: string
  - email: string
  - rollNumber: string
  - goals: object
  - createdAt, updatedAt: timestamp

- `users/{uid}/meal_logs/{mealId}`
  - foods: [{ name, quantity, nutrition: { calories, protein, ... } }]
  - aggregates: { calories, protein, carbs, fat, fiber, iron, calcium, vitaminC, vitaminA, potassium, sodium }
  - imageUrl: string (optional)
  - notes: string (optional)
  - createdAt: timestamp

- `mess_database/{docId}`
  - name: string
  - portionNutrition: { calories, protein, ... }
  - tags: ["breakfast","lunch","dinner"]
  - lastUpdated: timestamp

- `food_catalogue/{foodId}`
  - foodId, foodName, source, servingLabel, dietaryType, costInr
  - nutrition: { caloriesKcal, proteinG, carbsG, fatG, fiberG, ironMg, calciumMg }
  - updatedAt: timestamp

- `mess_menus/{menuId}`
  - menuId, date (YYYY-MM-DD), mealTime, foodId, messName
  - updatedAt: timestamp


## Notes
- Use security rules to ensure users can only write to their own `users/{uid}` subcollections.
- Keep nutrition numbers as numbers (units: grams/mg/kcal — document in UI).
