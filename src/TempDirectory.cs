using System.Collections;

class TempDirectory
{
    public string Dir { get; private set; }
    protected ArrayList list = new ArrayList();

    protected TempDirectory(string dir)
    {
        this.Dir = dir;
    }

    public static TempDirectory Create()
    {
        string timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
        string temp = Path.GetTempPath();
        string tempZipPath = Path.Combine(temp, $"{timestamp}-assignment-zip");

        if (Directory.Exists(tempZipPath))
        {
            Directory.Delete(tempZipPath, true);
        }

        Directory.CreateDirectory(tempZipPath);

        return new TempDirectory(tempZipPath);
    }

    public bool AddFile(string pathToFile)
    {
        if (File.Exists(pathToFile))
        {
            string fileName = Path.GetFileName(pathToFile);
            File.Copy(pathToFile, Path.Combine(this.Dir, fileName));
            return true;
        }

        return false;
    }

    public void listFiles()
    {
        string[] files = Directory.GetFiles(this.Dir);

        Console.WriteLine("");
        foreach (string file in files)
        {
            Console.WriteLine(Path.GetFileName(file));
        }
        Console.WriteLine("");
    }

    public void Delete()
    {
        Directory.Delete(this.Dir, true);
    }
}