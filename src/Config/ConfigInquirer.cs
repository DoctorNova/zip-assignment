using Validator;

public class ConfigInquirer : ConfigFactory
{
    public string GetCourse()
    {
        System.Console.WriteLine("What is the course name? (For example 'cs120')");
        string? providedCourse = System.Console.ReadLine();
        Validator.Validator validator = CourseValidator.validate(providedCourse);

        if (!validator.GetResult())
        {
            return this.GetCourse();
        }

        return providedCourse!;
    }

    public string GetLogin()
    {
        System.Console.WriteLine("What is your login name? (This is the username you use to log into DRAMA)");
        string? providedLogin = System.Console.ReadLine();
        Validator.Validator validator = LoginValidator.validate(providedLogin);

        if (!validator.GetResult())
        {
            return this.GetLogin();
        }

        return providedLogin!;
    }

    public string GetAssignment()
    {
        System.Console.WriteLine("What is the number of the assignment?");
        string? providedAssignment = System.Console.ReadLine();
        Validator.Validator validator = AssignmentValidator.validate(providedAssignment);

        if (!validator.GetResult())
        {
            return this.GetAssignment();
        }

        return providedAssignment!;
    }
}