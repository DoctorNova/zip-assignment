using System.Text.RegularExpressions;

namespace Validator
{
    public class Validator
    {
        public string? ErrorMsg { get; private set; }
        protected bool Result;

        protected static Validator Validate(string? input, string pattern, string argument)
        {
            Validator validateArg = new Validator();
            if (input == null)
            {
                validateArg.Result = false;
                validateArg.ErrorMsg = $"You must provide a {argument}";
            }
            else
            {
                Match match = Regex.Match(input, pattern);

                validateArg.Result = match.Success;
                if (!match.Success)
                {
                    validateArg.ErrorMsg = $"The {argument} should match the pattern {pattern}";
                }
            }
            return validateArg;
        }

        public bool GetResult()
        {
            if (this.ErrorMsg != null)
            {
                System.Console.WriteLine(this.ErrorMsg);
            }

            return this.Result;
        }
    }
}