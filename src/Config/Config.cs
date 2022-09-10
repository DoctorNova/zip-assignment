
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
        return $"{Course}_{Login}_{Assignment}.zip";
    }

    public static Config CreateConfig(ConfigFactory factory)
    {
        string providedCourse = factory.GetCourse();
        string providedLogin = factory.GetLogin();
        string providedAssignment = factory.GetAssignment();
        return new Config(providedCourse, providedLogin, providedAssignment);
    }
}
