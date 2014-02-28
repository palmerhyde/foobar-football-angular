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
    public class NationsController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Nations/
        public ActionResult Index()
        {
            return View(db.CardNation.ToList());
        }

        // GET: /Nations/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardNation cardnation = db.CardNation.Find(id);
            if (cardnation == null)
            {
                return HttpNotFound();
            }
            return View(cardnation);
        }

        // GET: /Nations/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Nations/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardNation cardnation)
        {
            if (ModelState.IsValid)
            {
                db.CardNation.Add(cardnation);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardnation);
        }

        // GET: /Nations/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardNation cardnation = db.CardNation.Find(id);
            if (cardnation == null)
            {
                return HttpNotFound();
            }
            return View(cardnation);
        }

        // POST: /Nations/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardNation cardnation)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardnation).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardnation);
        }

        // GET: /Nations/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardNation cardnation = db.CardNation.Find(id);
            if (cardnation == null)
            {
                return HttpNotFound();
            }
            return View(cardnation);
        }

        // POST: /Nations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardNation cardnation = db.CardNation.Find(id);
            db.CardNation.Remove(cardnation);
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
