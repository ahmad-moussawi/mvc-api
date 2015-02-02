using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApi.Models
{
    public class Transaction
    {
        public Transaction() {
            this.Debit = false;
            this.Date = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public Account Account { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public float Value { get; set; }
        public bool Debit { get; set; }
        public string Attachment { get; set; }
    }
}