namespace Validator
{
    class AssignmentValidator : Validator
    {
        public static string Pattern { get; } = "(lab)?[0-9]+";
        public static Validator validate(string? input)
        {
            return Validator.Validate(input, $"^{AssignmentValidator.Pattern}$", "assignment");
        }
    }
}