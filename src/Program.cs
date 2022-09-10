class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Config config = Config.CreateConfig(new ConfigArguments());
            ZipBuilder zip = new ZipBuilder(config);
            zip.zip();
        } else if (args[0] == "-v") {
            if (!String.IsNullOrEmpty(args[1])) {
                Validator.Validator result = Validator.ZipNameValidator.validate(args[1]);
                if (String.IsNullOrEmpty(result.ErrorMsg)) {
                    System.Console.WriteLine("Nice, the name is correct!");
                } else {
                    System.Console.WriteLine("Nope! The name is wrong");
                    result.GetResult();
                }
            }
        }
    }
}
