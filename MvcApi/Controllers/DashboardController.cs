using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using MvcApi.Models;
using System.Globalization;

namespace MvcApi.Controllers
{
    [RoutePrefix("api/dashboard")]
    public class DashboardController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        [HttpGet]
        [Route("transactions/{userId}")]
        public IQueryable GetTransactions(int userId)
        {
            return db.Transactions.Where(t => t.Account.MyUserId == userId).Include(t => t.Account).GroupBy(t => t.Account, (account, tx) => new
            {
                account = account.Name,
                tx = tx.GroupBy(t => t.Date.Month, (key, group) => new
                {
                    //Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(key),
                    Month = key,
                    Transactions = group.Count()
                })
            });

        }

        [HttpGet]
        [Route("total/{userId}")]
        public IQueryable Total(int userId) {
            return db.Transactions.Where(t => t.Account.MyUserId == userId).Include(t => t.Account).GroupBy(t => t.Account, (account, tx) => new
            { 
                account = account.Name,
                total = tx.Sum(t => t.Debit ? t.Value : -t.Value)
            });
        }

       
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccountExists(int id)
        {
            return db.Accounts.Count(e => e.Id == id) > 0;
        }
    }
}