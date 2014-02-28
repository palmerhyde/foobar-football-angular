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
    public class TypesController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Types/
        public ActionResult Index()
        {
            return View(db.CardType.ToList());
        }

        // GET: /Types/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardType cardtype = db.CardType.Find(id);
            if (cardtype == null)
            {
                return HttpNotFound();
            }
            return View(cardtype);
        }

        // GET: /Types/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Types/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardType cardtype)
        {
            if (ModelState.IsValid)
            {
                db.CardType.Add(cardtype);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardtype);
        }

        // GET: /Types/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardType cardtype = db.CardType.Find(id);
            if (cardtype == null)
            {
                return HttpNotFound();
            }
            return View(cardtype);
        }

        // POST: /Types/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardType cardtype)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardtype).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardtype);
        }

        // GET: /Types/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardType cardtype = db.CardType.Find(id);
            if (cardtype == null)
            {
                return HttpNotFound();
            }
            return View(cardtype);
        }

        // POST: /Types/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardType cardtype = db.CardType.Find(id);
            db.CardType.Remove(cardtype);
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
