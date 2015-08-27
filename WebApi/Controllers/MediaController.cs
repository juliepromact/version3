using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using WebApi;
using System.Web;
using System.IO;

namespace WebApi.Controllers
{
    public class MediaController : ApiController
    {
        private WebApiContext db = new WebApiContext();

        // GET api/Media123
        public IQueryable<Media> GetMedia()
        {
            return db.Media;
        }

        // GET api/Media/5
        public IHttpActionResult GetMedia(int id)
        {

            Update up = db.Update
                .Include(i => i.Media).Where(i => i.UpdateID == id)
                .Single();
          
            var abc = PopulateAssignedMediaData(up);
            return Ok(abc);
          
        }

        private List<Media> PopulateAssignedMediaData(Update up)
        {
            var allMedia = db.Media;
            var ownermedia = new HashSet<int>(up.Media.Select(c => c.MediaID));
            var viewModel = new List<Media>();
            foreach (var media in allMedia)
            {
                if (ownermedia.Contains(media.MediaID))
                {
                    viewModel.Add(new Media
                    {
                        MediaID = media.MediaID,
                        MediaName = media.MediaName,
                        Discriminator = media.Discriminator,
                        VideoUrl = media.VideoUrl
                    });
                }
            }

            return viewModel;
        }


        // PUT api/Media/5
        public IHttpActionResult PutVideo(int id, Media media)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Media newImage = new Media();
            int times = db.Media.Where(d => d.Update_ID == id).Count();
            // this is working

            if (times < 5)
            {
                newImage.MediaName = media.MediaName;
                newImage.VideoUrl = media.VideoUrl;
                newImage.Update_ID = id;
                newImage.Discriminator = "video";
                db.Media.Add(newImage);
                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {

                    throw;

                }

            }

            return CreatedAtRoute("DefaultApi", new { id = media.MediaID }, media);
        }



        // POST api/Media/5
        [ResponseType(typeof(Media))]

        public string PostMedia(int id)
        {
            Media newImage = new Media();
            int times = db.Media.Where(d => d.Update_ID == id).Count();
            // this is working

            if (times < 5)
            {

                var file = HttpContext.Current.Request.Files.Count > 0 ?
                HttpContext.Current.Request.Files[0] : null;

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);

                    var path = Path.Combine(
                        HttpContext.Current.Server.MapPath("~/uploads"),
                        fileName
                    );
                    newImage.MediaName = file.FileName;
                    newImage.ContentType = file.ContentType;
                    Int32 length = file.ContentLength;
                    byte[] tempImage = new byte[length];
                    file.InputStream.Read(tempImage, 0, length);
                    newImage.ImageData = tempImage;
                    newImage.Update_ID = id;
                    newImage.Discriminator = "image";
                    db.Media.Add(newImage);
                    db.SaveChanges();

                    file.SaveAs(path);
                    return file != null ? "/uploads/" + file.FileName : null;
                }

                else
                {
                    //newImage.VideoUrl=
                    return null;
                }


            }
            return null;
        }

        // DELETE api/Media/5
        [ResponseType(typeof(Media))]
        public IHttpActionResult DeleteMedia(int id)
        {
            Media media = db.Media.Find(id);
            if (media == null)
            {
                return NotFound();
            }

            db.Media.Remove(media);
            db.SaveChanges();

            return Ok(media);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MediaExists(int id)
        {
            return db.Media.Count(e => e.MediaID == id) > 0;
        }
    }
}