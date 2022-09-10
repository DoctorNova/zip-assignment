namespace Validator
{

    class ZipNameValidator : Validator
    {
        public static string Pattern { get; } = $"{CourseValidator.Pattern}_{LoginValidator.Pattern}_{AssignmentValidator.Pattern}\\.zip";
        public static Validator validate(string? input)
        {
            return Validator.Validate(input, ZipNameValidator.Pattern, "zip name");
        }
    }
}