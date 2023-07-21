from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    datetime = Column(String, index=True)
    close = Column(String, index=True)
    high = Column(String, index=True)
    low = Column(String, index=True)
    open = Column(String, index=True)
    volume = Column(String, index=True)
    instrument = Column(String, index=True)
    # owner_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="items")

