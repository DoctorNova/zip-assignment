namespace Validator
{
    class AssignmentValidator : Validator
    {
        public static Validator validate(string? input)
        {
            return Validator.Validate(input,  @"^(lab)?[0-9]+$", "assignment");
        }
    }
}