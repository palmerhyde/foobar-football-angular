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
    public class CardsController : Controller
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        // GET: /Cards/
        public ActionResult Index()
        {
            var card = db.Card.Include(c => c.CardClub1).Include(c => c.CardLeague1).Include(c => c.CardNation1).Include(c => c.CardPosition1).Include(c => c.CardRarity1).Include(c => c.CardStyle1).Include(c => c.CardType1);
            return View(card.ToList());
        }

        // GET: /Cards/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Card card = db.Card.Find(id);
            if (card == null)
            {
                return HttpNotFound();
            }
            return View(card);
        }

        // GET: /Cards/Create
        public ActionResult Create()
        {
            ViewBag.CardClub = new SelectList(db.CardClub, "Id", "Name");
            ViewBag.CardLeague = new SelectList(db.CardLeague, "Id", "Name");
            ViewBag.CardNation = new SelectList(db.CardNation, "Id", "Name");
            ViewBag.CardPosition = new SelectList(db.CardPosition, "Id", "Name");
            ViewBag.CardRarity = new SelectList(db.CardRarity, "Id", "Name");
            ViewBag.CardStyle = new SelectList(db.CardStyle, "Id", "Name");
            ViewBag.CardType = new SelectList(db.CardType, "Id", "Name");
            return View();
        }

        // POST: /Cards/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,Name,Description,ShortName,PictureUrl,VideoUrl,Cost,Attack,Defense,CardRarity,CardType,CardStyle,CardPosition,CardClub,CardNation,CardLeague")] Card card)
        {
            if (ModelState.IsValid)
            {
                db.Card.Add(card);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CardClub = new SelectList(db.CardClub, "Id", "Name", card.CardClub);
            ViewBag.CardLeague = new SelectList(db.CardLeague, "Id", "Name", card.CardLeague);
            ViewBag.CardNation = new SelectList(db.CardNation, "Id", "Name", card.CardNation);
            ViewBag.CardPosition = new SelectList(db.CardPosition, "Id", "Name", card.CardPosition);
            ViewBag.CardRarity = new SelectList(db.CardRarity, "Id", "Name", card.CardRarity);
            ViewBag.CardStyle = new SelectList(db.CardStyle, "Id", "Name", card.CardStyle);
            ViewBag.CardType = new SelectList(db.CardType, "Id", "Name", card.CardType);
            return View(card);
        }

        // GET: /Cards/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Card card = db.Card.Find(id);
            if (card == null)
            {
                return HttpNotFound();
            }
            ViewBag.CardClub = new SelectList(db.CardClub, "Id", "Name", card.CardClub);
            ViewBag.CardLeague = new SelectList(db.CardLeague, "Id", "Name", card.CardLeague);
            ViewBag.CardNation = new SelectList(db.CardNation, "Id", "Name", card.CardNation);
            ViewBag.CardPosition = new SelectList(db.CardPosition, "Id", "Name", card.CardPosition);
            ViewBag.CardRarity = new SelectList(db.CardRarity, "Id", "Name", card.CardRarity);
            ViewBag.CardStyle = new SelectList(db.CardStyle, "Id", "Name", card.CardStyle);
            ViewBag.CardType = new SelectList(db.CardType, "Id", "Name", card.CardType);
            return View(card);
        }

        // POST: /Cards/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,Name,Description,ShortName,PictureUrl,VideoUrl,Cost,Attack,Defense,CardRarity,CardType,CardStyle,CardPosition,CardClub,CardNation,CardLeague")] Card card)
        {
            if (ModelState.IsValid)
            {
                db.Entry(card).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CardClub = new SelectList(db.CardClub, "Id", "Name", card.CardClub);
            ViewBag.CardLeague = new SelectList(db.CardLeague, "Id", "Name", card.CardLeague);
            ViewBag.CardNation = new SelectList(db.CardNation, "Id", "Name", card.CardNation);
            ViewBag.CardPosition = new SelectList(db.CardPosition, "Id", "Name", card.CardPosition);
            ViewBag.CardRarity = new SelectList(db.CardRarity, "Id", "Name", card.CardRarity);
            ViewBag.CardStyle = new SelectList(db.CardStyle, "Id", "Name", card.CardStyle);
            ViewBag.CardType = new SelectList(db.CardType, "Id", "Name", card.CardType);
            return View(card);
        }

        // GET: /Cards/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Card card = db.Card.Find(id);
            if (card == null)
            {
                return HttpNotFound();
            }
            return View(card);
        }

        // POST: /Cards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Card card = db.Card.Find(id);
            db.Card.Remove(card);
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
