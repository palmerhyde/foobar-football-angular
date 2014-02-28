using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FooBarFootball.Data;

namespace FooBarFootball.Web.Controllers
{
    public class ClubsController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Clubs/
        public ActionResult Index()
        {
            return View(db.CardClub.ToList());
        }

        // GET: /Clubs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardClub cardclub = db.CardClub.Find(id);
            if (cardclub == null)
            {
                return HttpNotFound();
            }
            return View(cardclub);
        }

        // GET: /Clubs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Clubs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardClub cardclub)
        {
            if (ModelState.IsValid)
            {
                db.CardClub.Add(cardclub);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardclub);
        }

        // GET: /Clubs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardClub cardclub = db.CardClub.Find(id);
            if (cardclub == null)
            {
                return HttpNotFound();
            }
            return View(cardclub);
        }

        // POST: /Clubs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardClub cardclub)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardclub).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardclub);
        }

        // GET: /Clubs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardClub cardclub = db.CardClub.Find(id);
            if (cardclub == null)
            {
                return HttpNotFound();
            }
            return View(cardclub);
        }

        // POST: /Clubs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardClub cardclub = db.CardClub.Find(id);
            db.CardClub.Remove(cardclub);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
