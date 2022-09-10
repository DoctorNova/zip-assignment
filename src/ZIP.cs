using System.IO.Compression;
using System.Collections;
class ZipBuilder
{

    private Config config;

    public ZipBuilder(Config config)
    {
        this.config = config;
    }

    protected void zipDirectory(string input)
    {
        if (File.Exists(this.config.GetZipPath()))
        {
            File.Delete(this.config.GetZipPath());
        }
        ZipFile.CreateFromDirectory(input, this.config.GetZipPath());

        string log = $"Created ZIP file successfully {Path.GetFullPath(this.config.GetZipPath())}";

        ArrayList minus = new ArrayList();
        for (int i = 0; i < log.Length; i++)
        {
            minus.Add("-");
        }
        string minuses = String.Join("", minus.ToArray());

        Console.WriteLine(minuses);
        Console.WriteLine(log);
        Console.WriteLine(minuses);
    }

    protected void addFile(TempDirectory dir, string input)
    {
        bool exists = dir.AddFile(input);

        if (!exists)
        {
            Console.WriteLine($"Sorry but the file {input} doesn't exist");
        }
        askForFile(dir);
    }

    protected void askForFile(TempDirectory dir)
    {
        Console.WriteLine("Add another file or hit enter to create the ZIP file");
        string? input = Console.ReadLine();
        if (!String.IsNullOrEmpty(input))
        {
            this.addFile(dir, input!);
        }
    }

    public void zip()
    {
        Console.WriteLine("Provide a folder to zip or a file to include in the zip (You can exit the program with CTRL+C)");
        string? input = Console.ReadLine();

        if (input == null || !(File.Exists(input) || Directory.Exists(input)))
        {
            Console.WriteLine($"'{input}' is not a file or directory");
            this.zip();
            return;
        }

        FileAttributes fileAttributes = File.GetAttributes(input);

        if (fileAttributes.HasFlag(FileAttributes.Directory))
        {
            this.zipDirectory(input);
        }
        else if (File.Exists(input))
        {
            TempDirectory dir = TempDirectory.Create();

            this.addFile(dir, input);
            Console.WriteLine("These are the files you added:");
            dir.listFiles();
            Console.WriteLine("Do you want to add another one? (type yes or no)");
            string? answer = Console.ReadLine();

            if (answer == "yes")
            {
                this.askForFile(dir);
            }

            this.zipDirectory(dir.Dir);

            dir.Delete();
        }
    }


}