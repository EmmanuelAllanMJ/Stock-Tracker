from sqlalchemy.orm import Session
from typing import List

from . import models, schemas

def get_all_stock(db: Session):
    return db.query(models.Stock).all()

def get_stock_by_id(db: Session, stock_id: int):
    return db.query(models.Stock).filter(models.Stock.id == stock_id).first()

# stock is a list of schemas.StockCreate 
def create_stock(db: Session, stock: List[schemas.StockCreate]):
    db_stock = []
    for i in stock:
        db_stock = models.Stock(
            datetime = i['datetime'],
            close = i['close'],
            high = i['high'],
            low = i['low'],
            open = i['open'],
            volume = i['volume'],
            instrument = i['instrument']
        )
        db.add(db_stock)
        db.commit()
    # db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return stock


def delete_all_stock(db: Session):
    db.query(models.Stock).delete()
    db.commit()
    return "All stocks deleted"

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