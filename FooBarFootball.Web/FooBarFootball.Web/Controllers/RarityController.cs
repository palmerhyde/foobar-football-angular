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
    public class RarityController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Rarity/
        public ActionResult Index()
        {
            return View(db.CardRarity.ToList());
        }

        // GET: /Rarity/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardRarity cardrarity = db.CardRarity.Find(id);
            if (cardrarity == null)
            {
                return HttpNotFound();
            }
            return View(cardrarity);
        }

        // GET: /Rarity/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Rarity/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardRarity cardrarity)
        {
            if (ModelState.IsValid)
            {
                db.CardRarity.Add(cardrarity);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardrarity);
        }

        // GET: /Rarity/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardRarity cardrarity = db.CardRarity.Find(id);
            if (cardrarity == null)
            {
                return HttpNotFound();
            }
            return View(cardrarity);
        }

        // POST: /Rarity/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardRarity cardrarity)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardrarity).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardrarity);
        }

        // GET: /Rarity/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardRarity cardrarity = db.CardRarity.Find(id);
            if (cardrarity == null)
            {
                return HttpNotFound();
            }
            return View(cardrarity);
        }

        // POST: /Rarity/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardRarity cardrarity = db.CardRarity.Find(id);
            db.CardRarity.Remove(cardrarity);
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
