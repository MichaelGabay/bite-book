// Google Gemini API configuration
// Get API key from environment variables
// In Create React App, env variables must start with REACT_APP_
export const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY || ""

// Log status in development mode
if (process.env.NODE_ENV === "development") {
  if (geminiApiKey) {
    console.log("✓ Gemini API key loaded from environment variables")
  } else {
    console.warn(
      "⚠ Warning: REACT_APP_GEMINI_API_KEY is not set in environment variables.\n" +
        "Please create a .env file in the root directory with:\n" +
        "REACT_APP_GEMINI_API_KEY=your_api_key_here\n" +
        "Then restart the development server."
    )
  }
}

// Function to generate recipe using Google Gemini API
export async function generateRecipeWithAI(prompt) {
  // Try different API endpoints with gemini-2.5-flash (latest model)
  const apiEndpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
  ]

  let lastError = null

  for (const apiUrl of apiEndpoints) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a recipe based on this request: "${prompt}". 
Please provide the recipe in the following JSON format:
{
  "name": "Recipe name in Hebrew",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["step 1", "step 2", ...]
}
Make sure all text is in Hebrew. Return only valid JSON, no additional text.`,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error(`API Error for ${apiUrl}:`, errorData)
        // If 404, try next endpoint
        if (response.status === 404) {
          lastError = new Error(
            `Model not found: ${
              errorData.error?.message || response.statusText
            }`
          )
          continue // Try next endpoint
        }
        throw new Error(
          `API error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        )
      }

      const data = await response.json()

      // Extract the text from Gemini response
      const generatedText = data.candidates[0]?.content?.parts[0]?.text

      if (!generatedText) {
        throw new Error("No response from AI")
      }

      // Try to parse JSON from the response
      // Sometimes Gemini wraps JSON in markdown code blocks
      let jsonText = generatedText.trim()

      // Remove markdown code blocks if present
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/```\n?/g, "")
      }

      const recipeData = JSON.parse(jsonText)

      return {
        name: recipeData.name || "מתכון חדש",
        ingredients: Array.isArray(recipeData.ingredients)
          ? recipeData.ingredients
          : [],
        instructions: Array.isArray(recipeData.instructions)
          ? recipeData.instructions
          : [],
      }
    } catch (error) {
      // If this is not a 404, or it's the last endpoint, throw the error
      if (apiEndpoints.indexOf(apiUrl) === apiEndpoints.length - 1) {
        throw error
      }
      lastError = error
      continue // Try next endpoint
    }
  }

  // If we get here, all endpoints failed
  throw lastError || new Error("All API endpoints failed")
}

// Function to generate recipe from ingredients using Google Gemini API
export async function generateRecipeFromIngredients(ingredients) {
  // Try different API endpoints with gemini-2.5-flash (latest model)
  const apiEndpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
  ]

  let lastError = null

  // Convert ingredients array to a readable list
  const ingredientsList = Array.isArray(ingredients)
    ? ingredients.join(", ")
    : ingredients

  for (const apiUrl of apiEndpoints) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `צור מתכון מבוסס על המרכיבים הבאים: ${ingredientsList}. 
אנא ספק את המתכון בפורמט JSON הבא:
{
  "name": "שם המתכון בעברית",
  "ingredients": ["מרכיב 1", "מרכיב 2", ...],
  "instructions": ["שלב 1", "שלב 2", ...]
}
ודא שכל הטקסט בעברית. החזר רק JSON תקין, ללא טקסט נוסף.
השתמש במרכיבים שסופקו וייצור מתכון טעים ומקורי.`,
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error(`API Error for ${apiUrl}:`, errorData)
        // If 404, try next endpoint
        if (response.status === 404) {
          lastError = new Error(
            `Model not found: ${
              errorData.error?.message || response.statusText
            }`
          )
          continue // Try next endpoint
        }
        throw new Error(
          `API error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        )
      }

      const data = await response.json()

      // Extract the text from Gemini response
      const generatedText = data.candidates[0]?.content?.parts[0]?.text

      if (!generatedText) {
        throw new Error("No response from AI")
      }

      // Try to parse JSON from the response
      // Sometimes Gemini wraps JSON in markdown code blocks
      let jsonText = generatedText.trim()

      // Remove markdown code blocks if present
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/```\n?/g, "")
      }

      const recipeData = JSON.parse(jsonText)

      return {
        name: recipeData.name || "מתכון חדש",
        ingredients: Array.isArray(recipeData.ingredients)
          ? recipeData.ingredients
          : [],
        instructions: Array.isArray(recipeData.instructions)
          ? recipeData.instructions
          : [],
      }
    } catch (error) {
      // If this is not a 404, or it's the last endpoint, throw the error
      if (apiEndpoints.indexOf(apiUrl) === apiEndpoints.length - 1) {
        throw error
      }
      lastError = error
      continue // Try next endpoint
    }
  }

  // If we get here, all endpoints failed
  throw lastError || new Error("All API endpoints failed")
}
