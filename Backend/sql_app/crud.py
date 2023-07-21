from sqlalchemy.orm import Session

from . import models, schemas

def get_all_stock(db: Session):
    return db.query(models.Stock).all()

def get_stock_by_id(db: Session, stock_id: int):
    return db.query(models.Stock).filter(models.Stock.id == stock_id).first()

def create_stock(db: Session, stock: schemas.StockCreate):
    db_stock = models.Stock(datetime=stock.datetime, close=stock.close, high=stock.high, low=stock.low, open=stock.open, volume=stock.volume, instrument=stock.instrument)
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock

def delete_stock(db: Session, stock_id: int):
    db_stock = db.query(models.Stock).filter(models.Stock.id == stock_id).first()
    db.delete(db_stock)
    db.commit()
    return db_stock

def update_stock(db: Session, stock_id: int, stock: schemas.StockCreate):
    db_stock = db.query(models.Stock).filter(models.Stock.id == stock_id).first()
    db_stock.datetime = stock.datetime
    db_stock.close = stock.close
    db_stock.high = stock.high
    db_stock.low = stock.low
    db_stock.open = stock.open
    db_stock.volume = stock.volume
    db_stock.instrument = stock.instrument
    db.commit()
    db.refresh(db_stock)
    return db_stock