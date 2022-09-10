namespace Validator {
    class CourseValidator : Validator
    {
        public static Validator validate(string? input)
        {
            return Validator.Validate(input, @"^cs[0-9]{3}$", "course");
        }
    }
}