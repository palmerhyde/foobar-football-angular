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
    public class LeaguesController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Leagues/
        public ActionResult Index()
        {
            return View(db.CardLeague.ToList());
        }

        // GET: /Leagues/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardLeague cardleague = db.CardLeague.Find(id);
            if (cardleague == null)
            {
                return HttpNotFound();
            }
            return View(cardleague);
        }

        // GET: /Leagues/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Leagues/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardLeague cardleague)
        {
            if (ModelState.IsValid)
            {
                db.CardLeague.Add(cardleague);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardleague);
        }

        // GET: /Leagues/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardLeague cardleague = db.CardLeague.Find(id);
            if (cardleague == null)
            {
                return HttpNotFound();
            }
            return View(cardleague);
        }

        // POST: /Leagues/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardLeague cardleague)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardleague).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardleague);
        }

        // GET: /Leagues/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardLeague cardleague = db.CardLeague.Find(id);
            if (cardleague == null)
            {
                return HttpNotFound();
            }
            return View(cardleague);
        }

        // POST: /Leagues/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardLeague cardleague = db.CardLeague.Find(id);
            db.CardLeague.Remove(cardleague);
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
