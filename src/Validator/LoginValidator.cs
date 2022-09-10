namespace Validator {
    class LoginValidator : Validator
    {
        public static Validator validate(string? input)
        {
            return Validator.Validate(input,  "[a-z0-9.]", "login");
        }
    }
}