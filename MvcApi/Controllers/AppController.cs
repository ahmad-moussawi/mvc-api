using MvcApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace MvcApi.Controllers
{
    [RoutePrefix("api/app")]
    public class AppController : ApiController
    {

        private ApplicationDbContext db = ApplicationDbContext.Create();
        private ApplicationUserManager _userManager;

        public AppController()
        {

        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Route("accounts")]
        public IEnumerable<Account> GetAccounts()
        {

            var accounts = db.Accounts.ToArray();

            return accounts;

        }

        [Route("accounts")]
        public async Task<IHttpActionResult> PostAccounts(Account account)
        {

            if (account.Id > 0)
            {

                db.Entry<Account>(account).State = System.Data.Entity.EntityState.Modified;

                try
                {
                    db.SaveChanges();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }

            }

            try
            {
                db.Accounts.Add(account);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }

            return Ok<Account>(account);
        }

        [Route("user")]
        public async Task<IdentityUser> GetUser()
        {
            IdentityUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            return user;
        }
    }
}
