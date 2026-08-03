from typing import TypeVar, Generic, Type, Optional, List, Any
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.core.extensions import db

T = TypeVar("T")

class BaseRepository(Generic[T]):
    def __init__(self, model_class: Type[T]):
        self.model_class = model_class

    @property
    def session(self) -> Session:
        return db.session

    def get(self, id: Any) -> Optional[T]:
        return self.session.get(self.model_class, id)

    def get_all(self) -> List[T]:
        stmt = select(self.model_class)
        return list(self.session.scalars(stmt).all())

    def add(self, entity: T) -> T:
        self.session.add(entity)
        self.session.flush()
        return entity

    def update(self, entity: T) -> T:
        self.session.merge(entity)
        self.session.flush()
        return entity

    def delete(self, entity: T) -> None:
        self.session.delete(entity)
        self.session.flush()
