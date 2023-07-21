from pydantic import BaseModel

class StockBase(BaseModel):
    datetime: str
    close: str 
    high: str
    low: str
    open: str
    volume: str
    instrument: str

class StockCreate(StockBase): 
    pass
 
class Stock(StockBase):
    id: int 

    class Config:
        from_attributes = True

