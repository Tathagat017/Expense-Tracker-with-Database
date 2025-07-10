from enum import Enum

class CategoryEnum(str,Enum):
    food = "Food",
    housing = "Housing",
    utilities = "Utilities",
    entertainment = "Entertainment",
    shopping = "Shopping",
    healthCare = "Health Care",
    travel = "Travel",
    other = "Other"