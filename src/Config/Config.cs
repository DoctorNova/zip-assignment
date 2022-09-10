
public class Config
{
    public string Course;
    public string Login;
    public string Assignment;

    protected Config(string course, string login, string assignment)
    {
        this.Course = course;
        this.Login = login;
        this.Assignment = assignment;
    }

    public string GetZipPath()
    {
        string name = $"{Course}_{Login}_{Assignment}.zip";
        if (Validator.ZipNameValidator.validate(name).GetResult())
        {
            return name;
        }

        throw new ArgumentException($"Can't build correct name for the ZIP file. The generated ZIP file name was {name}");
    }

    public static Config CreateConfig(ConfigFactory factory)
    {
        string providedCourse = factory.GetCourse();
        string providedLogin = factory.GetLogin();
        string providedAssignment = factory.GetAssignment();
        return new Config(providedCourse, providedLogin, providedAssignment);
    }
}
