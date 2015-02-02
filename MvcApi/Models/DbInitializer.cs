using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApi.Models
{
    public class DbInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {

            MyUser user = new MyUser
            {
                FirstName = "Ahmad",
                LastName = "Moussawi",
                Email = "aymoussawi@gmail.com",
                Password = "123456"
            };



            var accounts = new List<Account>
            {
                new Account{
                Id = 1,
                Balance = 5000,
                Description = "My Personal Account From Byblos Bank",
                Name = "My Personal Acccount",
                Iban = "AL47 2121 1009 0000 0002 3569 8741",
                MyUser = user
            },
            new Account
            {
                Id = 2,
                Balance = 1250,
                Description = "My Saving Account From Azerbigan",
                Name = "My Saving Acccount",
                Iban = "AZ21 NABZ 0000 0000 1370 1000 1944",
                MyUser = user
            },
            new Account
            {
                Id = 3,
                Balance = -2500,
                Description = "My Joint Account with Grace",
                Name = "My Joint Account",
                Iban = "BE62 5100 0754 7061",
                MyUser = user
            },
            new Account
            {
                Id = 4,
                Balance = 0,
                Description = "My Salary Account",
                Name = "Salary Account",
                Iban = "CY17 0020 0128 0000 0012 0052 7600",
                MyUser = user
            }

            };

            foreach (var acc in accounts)
            {
                context.Accounts.Add(acc);
            }


            Random rnd = new Random();
            int accountsLength = accounts.Count;



            for (int i = 0; i < 60; i++)
            {

                var account = accounts[rnd.Next(0, accountsLength)];
                int month = rnd.Next(1, 7) + rnd.Next(0, 7);
                var date = new DateTime(DateTime.UtcNow.Year, month, rnd.Next(1, 25));

                context.Transactions.Add(new Transaction
                {

                    AccountId = account.Id,
                    Value = rnd.Next(account.Id * -50, account.Id * 100),
                    Debit = rnd.Next(0, 20) > 10,
                    Date = date,
                    Attachment = "",
                    Description = "Description of a transaction related to " + account.Name
                });
            }

            context.SaveChanges();
        }
    }
}