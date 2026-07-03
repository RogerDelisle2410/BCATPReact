using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BCATPReact.Models
{
    public class ALLDataAccessLayer
    {
        private readonly BCATPDB2Context db = new();
        public IEnumerable<AllData> GetAllData(string tableName, string searchName)
        {
            try
            {
                switch (tableName)
                {
                    case "bcatp":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 1).Where(com => com.Name.Contains(searchName)).ToList();
                    case "navy":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 2).Where(com => com.Name.Contains(searchName)).ToList();
                    case "dewline":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 3).Where(com => com.Name.Contains(searchName)).ToList();
                    case "midcanada":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 4).Where(com => com.Name.Contains(searchName)).ToList();
                    case "pinetree":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 5).Where(com => com.Name.Contains(searchName)).ToList();
                    case "airforce":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 6).Where(com => com.Name.Contains(searchName)).ToList();
                    case "army":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 7).Where(com => com.Name.Contains(searchName)).ToList();
                    case "defunct":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 8).Where(com => com.Name.Contains(searchName)).ToList();
                    case "tanks":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 9).Where(com => com.Name.Contains(searchName)).ToList();
                    case "planes":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 10).Where(com => com.Name.Contains(searchName)).ToList();
                    case "ships":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 11).Where(com => com.Name.Contains(searchName)).ToList();
                }
            }
            catch
            {
                throw;
            }
            return null;
        }

        public IEnumerable<AllData> GetAllData2(string tableName)
        {
            try
            {
                switch (tableName)
                {
                    case "bcatp":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 1).ToList();
                    case "navy":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 2).ToList();
                    case "dewline":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 3).ToList();
                    case "midcanada":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 4).ToList();
                    case "pinetree":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 5).ToList();
                    case "airforce":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 6).ToList();
                    case "army":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 7).ToList();
                    case "defunct":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 8).ToList();
                    case "tanks":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 9).ToList();
                    case "planes":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 10).ToList();
                    case "ships":
                        return db.AllData.OrderBy(com => com.Name).Where(com => com.Type == 11).ToList();
                }
            }
            catch
            {
                throw;
            }
            return null;
        }
        //To Add new  record     
        public int AddAllData(AllData alldata, string tabName)
        {
            try
            {
                switch (tabName)
                {
                    case "bcatp":
                        alldata.Type = 1; break;
                    case "navy":
                        alldata.Type = 2; break;
                    case "dewline":
                        alldata.Type = 3; break;
                    case "midcanada":
                        alldata.Type = 4; break;
                    case "pinetree":
                        alldata.Type = 5; break;
                    case "airforce":
                        alldata.Type = 6; break;
                    case "army":
                        alldata.Type = 7; break;
                    case "defunct":
                        alldata.Type = 8; break;
                    case "tanks":
                        alldata.Type = 9; break;
                    case "planes":
                        alldata.Type = 10; break;
                    case "ships":
                        alldata.Type = 11; break;
                }
                db.AllData.Add(alldata);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar item    
        public int UpdateAllData(AllData alldata)
        {
            try
            {
                db.Entry(alldata).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular item    
        public AllData GetAllData(int id)
        {
            try
            {
                AllData alldata = db.AllData.Find(id);
                return alldata;
            }
            catch
            {
                throw;
            }
        }

        public IQueryable<AllData> GetMaintData(string tableName)
        {
            try
            {
                return db.AllData.Where(com => com.Name == tableName).Where(com => com.Type == 99);
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record     
        public int DeleteAllData(int id)
        {
            try
            {
                AllData emp = db.AllData.Find(id);
                db.AllData.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
