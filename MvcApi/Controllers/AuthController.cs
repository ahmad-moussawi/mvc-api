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

namespace MvcApi.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        [HttpPost]
        [Route("login")]
        public MyUser PostLogin(LoginModel login)
        {
            var user = db.MyUser.Where(u => u.Email.Equals(login.Email) && u.Password.Equals(login.Password)).FirstOrDefault();

            if(user != null){
                return new MyUser{
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Id = user.Id
                };
            }

            return null;

        }

        [Route("test")]
        public string getTest() {
            return "test";
        }


        // POST: api/Auth
        [Route("register")]
        [HttpPost]
        public async Task<IHttpActionResult> PostRegister(MyUser myUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.MyUser.Where(u => u.Email == myUser.Email).Count() > 0) {
                return BadRequest("User already exist, please try to login or use another email");
            }


            db.MyUser.Add(myUser);
            await db.SaveChangesAsync();

            return Ok(myUser);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MyUserExists(int id)
        {
            return db.MyUser.Count(e => e.Id == id) > 0;
        }
    }
}