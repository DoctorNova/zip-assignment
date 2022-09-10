namespace Validator
{
    class LoginValidator : Validator
    {
        public static string Pattern { get; } = "[a-z0-9.]+";
        public static Validator validate(string? input)
        {
            return Validator.Validate(input, LoginValidator.Pattern, "login");
        }
    }
}