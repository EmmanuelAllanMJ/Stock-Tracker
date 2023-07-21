from fastapi import Depends, FastAPI, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import csv

from . import crud, models, schemas
from .database import SessionLocal, engine 

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal() 
    try: 
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/stocks/", response_model=list[schemas.Stock])
def get_all_stock(db: Session = Depends(get_db)):
    stocks = crud.get_all_stock(db)
    return stocks

@app.get("/stocks/{stock_id}", response_model=schemas.Stock)
def get_stock_by_id(stock_id: int, db: Session = Depends(get_db)):
    db_stock = crud.get_stock_by_id(db, stock_id=stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return db_stock

@app.post("/stocks/", response_model=schemas.Stock)
async def create_stock(stock: schemas.StockCreate, file: UploadFile = File(...), db: Session = Depends(get_db)):
        # Read the contents of the CSV file
    contents = await file.read()

    # Parse the CSV data
    csv_data = contents.decode('utf-8').splitlines()
    reader = csv.DictReader(csv_data)

    # Create a list to store the stock data
    stock_data = []

    # Iterate over each row in the CSV file
    for row in reader:
        # Extract the relevant data from the schema
        datetime = row['datetime']
        close = row['close']
        high = row['high']
        low = row['low']
        open = row['open']
        volume = row['volume']
        instrument = row['instrument']

        # Create a dictionary representing the stock data
        stock_item = {
            'datetime': datetime,
            'close': close,
            'high': high,
            'low': low,
            'open': open,
            'volume': volume,
            'instrument': instrument
        }

        # Add the stock data to the list
        stock_data.append(stock_item)

    # Create the stock object in the database
    db_stock = crud.create_stock(db=db, stock=stock)

    return db_stock




@app.delete("/stocks/{stock_id}", response_model=schemas.Stock)
def delete_stock(stock_id: int, db: Session = Depends(get_db)):
    db_stock = crud.delete_stock(db=db, stock_id=stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return db_stock

@app.put("/stocks/{stock_id}", response_model=schemas.Stock)
def update_stock(stock_id: int, stock: schemas.StockCreate, db: Session = Depends(get_db)):
    db_stock = crud.update_stock(db=db, stock_id=stock_id, stock=stock)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return db_stock

# uvicorn main:app --reload