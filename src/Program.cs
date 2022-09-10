using System;
using System.IO;
using System.IO.Compression;

class Program
{
    static void Main()
    {
        Config config = Config.CreateConfig(new ConfigInquirer());

        Console.WriteLine(config.GetZipPath());

        Console.WriteLine("Provide a folder to zip or a file to include in the zip");
        string? input = Console.ReadLine();

        if (input == null) {
            Console.WriteLine("You must provide a folder to zip or a file to include in the zip (You can exit the program at any time with CTRL+C)");
            // Recursively call function
            input = "example";
        }
        
        FileAttributes fileAttributes = File.GetAttributes(input);

        if (fileAttributes.HasFlag(FileAttributes.Directory)) {
            //  document = Directory.GetDirectories(input);
            ZipFile.CreateFromDirectory(input, config.GetZipPath());
        }
    }
}
