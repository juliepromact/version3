using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WebApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApi.Entities;

namespace WebApi
{    public class ApplicationUser : IdentityUser
    {
        //  public bool ConfirmedEmail { get; set; }

        //to enter id of productowner into aspnetusers table
        public virtual ProductOwner ProductOwner { get; set; }
        public virtual EndUser EndUser { get; set; }
     
    }
   
  public class WebApiContext : IdentityDbContext<IdentityUser>
  //  public class WebApiContext : DbContext
    {
        public WebApiContext() 
            : base("DefaultConnection")
        { }
        public DbSet<EndUser> EndUser { get; set; }
        public DbSet<ProductOwner> ProductOwner { get; set; }
        public DbSet<EveryBody> EveryBody { get; set; }
        public DbSet<ProductNew> ProductNew { get; set; }
        public DbSet<Update> Update { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<UserModel> UserModel { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public System.Data.Entity.DbSet<WebApi.Models.OwnerRequest> OwnerRequests { get; set; }
    }
}
