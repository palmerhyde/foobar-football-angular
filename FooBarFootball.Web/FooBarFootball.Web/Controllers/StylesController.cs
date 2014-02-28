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
    public class StylesController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Styles/
        public ActionResult Index()
        {
            return View(db.CardStyle.ToList());
        }

        // GET: /Styles/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardStyle cardstyle = db.CardStyle.Find(id);
            if (cardstyle == null)
            {
                return HttpNotFound();
            }
            return View(cardstyle);
        }

        // GET: /Styles/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Styles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name")] CardStyle cardstyle)
        {
            if (ModelState.IsValid)
            {
                db.CardStyle.Add(cardstyle);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cardstyle);
        }

        // GET: /Styles/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardStyle cardstyle = db.CardStyle.Find(id);
            if (cardstyle == null)
            {
                return HttpNotFound();
            }
            return View(cardstyle);
        }

        // POST: /Styles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name")] CardStyle cardstyle)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cardstyle).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cardstyle);
        }

        // GET: /Styles/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CardStyle cardstyle = db.CardStyle.Find(id);
            if (cardstyle == null)
            {
                return HttpNotFound();
            }
            return View(cardstyle);
        }

        // POST: /Styles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CardStyle cardstyle = db.CardStyle.Find(id);
            db.CardStyle.Remove(cardstyle);
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
