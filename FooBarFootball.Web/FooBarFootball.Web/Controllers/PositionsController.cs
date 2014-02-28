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
    public class PositionsController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Positions/
        public ActionResult Index()
        {
            return View(db.CardPosition.ToList());
        }

        // GET: /Positions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardPosition cardposition = db.CardPosition.Find(id);
            if (cardposition == null)
            {
                return HttpNotFound();
            }
            return View(cardposition);
        }

        // GET: /Positions/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Positions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardPosition cardposition)
        {
            if (ModelState.IsValid)
            {
                db.CardPosition.Add(cardposition);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardposition);
        }

        // GET: /Positions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardPosition cardposition = db.CardPosition.Find(id);
            if (cardposition == null)
            {
                return HttpNotFound();
            }
            return View(cardposition);
        }

        // POST: /Positions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardPosition cardposition)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardposition).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardposition);
        }

        // GET: /Positions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardPosition cardposition = db.CardPosition.Find(id);
            if (cardposition == null)
            {
                return HttpNotFound();
            }
            return View(cardposition);
        }

        // POST: /Positions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardPosition cardposition = db.CardPosition.Find(id);
            db.CardPosition.Remove(cardposition);
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
