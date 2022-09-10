namespace Validator
{
    class CourseValidator : Validator
    {
        public static string Pattern { get; } = "cs[0-9]{3}";
        public static Validator validate(string? input)
        {
            return Validator.Validate(input, $"^{CourseValidator.Pattern}$", "course");
        }
    }
}