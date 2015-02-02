using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApi.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Iban { get; set; }
        public float Balance { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
        public MyUser MyUser { get; set; }
        public int MyUserId { get; set; }
    }
}