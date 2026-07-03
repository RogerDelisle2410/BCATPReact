namespace BCATPReact.Models
{
    public partial class AllData
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? Comment { get; set; }
        public string? Wiki { get; set; }
        public int Type { get; set; }
    }
}