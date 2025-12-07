export default class RecipeData {
  constructor(
    name,
    ingredients,
    instructions,
    id,
    typeMeal,
    timePrep,
    createTime,
    isPublic,
    createDiff,
    shareWhite
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.id = id;
    this.favorite = false;
    // סוג
    this.typeMeal = typeMeal;
    // זמן הכנה
    this.timePrep = timePrep;
    // האם ציבורי
    this.isPublic = isPublic;
    // זמן שנוצר
    this.createTime = createTime;
    // קושי הכנה
    this.createDiff = createDiff;
    // משותף עם?
    this.shareWhite = shareWhite;
  }
}