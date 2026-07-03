using BCATPReact.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BCATPReact.Controllers
{ /*Roger*/
    public class ALLDATAController : ControllerBase
    {
        private readonly ALLDataAccessLayer objalldata = new();

        [HttpGet]
        [Route("api/AllData2/Index/{tabName}/{searchName}")]
        public IEnumerable<AllData> Index(string tabName, string searchName)
        {
            return objalldata.GetAllData(tabName, searchName);
        }

        [HttpGet]
        [Route("api/AllData/Index/{tabName}")]
        public IEnumerable<AllData> Index(string tabName)
        {
            return objalldata.GetAllData2(tabName);
        }

        [HttpGet]
        [Route("api/MaintData/Details/{tabName}")]
        public System.Linq.IQueryable<AllData> Details(string tabName)
        {
            return objalldata.GetMaintData(tabName);
        }
        [HttpPost]
        [Route("api/AllData/Create/{tabName}")]
        public int Create(AllData alldata, string tabName)
        {
            return objalldata.AddAllData(alldata, tabName);
        }

        [HttpGet]
        [Route("api/AllData/Details/{id}")]
        public AllData Details(int id)
        {
            return objalldata.GetAllData(id);
        }

        [HttpPut]
        [Route("api/AllData/Edit")]
        public int Edit(AllData alldata)
        {
            return objalldata.UpdateAllData(alldata);
        }

        [HttpDelete]
        [Route("api/AllData/Delete/{id}")]
        public int Delete(int id)
        {
            return objalldata.DeleteAllData(id);
        }
    }
}
