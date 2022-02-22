""" reading CSV files with pandas """

import csv, os, shutil
import pandas as pd
from dateutil.parser import parse

from models import DataDescriptor


# Helper functions
def is_numeric(element):
    """Determine whether the @element is numerical or not — that is,
    can it be cast to a float?"""
    try:
        fe = float(element)
        is_numeric = True
    except:
        is_numeric = False
    return is_numeric

def is_date(string, fuzzy=False):
    """Return whether the @string can be interpreted as a date."""
    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

class IngestCSV:
    """
        Describe and ingest CSV files.
    """
    
    def __init__(self, file):
        self.file = file
        self.file_location = os.getcwd() + f"/data/temp.csv"

    def save_locally(self):
        """
            Overwrite temp.csv in local directory
            Return info added to HTTP response
        """

        with open(self.file_location, "wb+") as file_object:
            shutil.copyfileobj(self.file.file, file_object)
        response = {"info": f"file '{self.file.filename}' saved"}
        return response

    def describe_data(self):
        """
            Read the CSV file, clean it up, and generate a description of the data.
            Return the data as a dictionary and a list of DataDescriptors.
        """

        with open(self.file_location, 'r') as f:
            reader = csv.reader(f)
            # index of csv start (row has multiple columns)
            idx = next(idx for idx, row in enumerate(reader) if len(row) > 1)

        # print(f"found beginning of csv @ index: {idx}")

        # store csv as pandas dataframe
        data = pd.read_csv(self.file_location, skiprows=idx)
        data = data.where(pd.notna(data), None) # set all nan to None

        """
        # Extract columns; infer presence of headers.
        # Not a fan of this inference method
        # this adds attribute to the file model
        # could try out calling the headers_present function from file.py

            if data.columns[0] == 0:  # no headers are (likely) present
                file.headers_present = False
            else:
                file.headers_present = True
        """      

        # data cleaning - remove un-wanted chars
        # TODO: Not sure if we want this...
        unwanted = "[]'%$ "
        for char in list(unwanted):
            data = data.applymap(lambda x: str(x).replace(char,''))

        # convert dtypes 
        # TODO: get other attribute info -> if header has brackets, parenthesis, braces assume units ? -> [cm], (joules), {etc}
        # dfn = df.convert_dtypes(infer_objects=True)               # was not infering as expected
        data = data.apply(pd.to_numeric, errors='ignore')           # convert dtype to numeric where possible
        obj_columns = data.select_dtypes(include=object).columns    # grab columns unable to convert
        data[obj_columns] = data[obj_columns].convert_dtypes(str)   # convert remaining columns to strings
        column_names = [str(c).lower() for c in data.columns]       # set column names to be lower case
        # remove characters from column names that will cause graphiql error when building dyanmic class (-)
        column_names = [str(c).translate(str.maketrans('','',"[]()'%$- ")) for c in data.columns]
        mapping = dict(zip(data.columns, column_names))             # map lower case column names to dataframe
        data = data.rename(columns=mapping)

        data_description = []
        for col in data.columns:
            # print(f"{file.local_filename}.column: {col}")
            dd = self.describe_column(col, data)
            data_description.append(dd)
        
        return data.to_dict("records"), data_description

    def describe_column(self, column_name: str, data: pd.DataFrame) -> DataDescriptor:
        """
            Extract the metadata from specified column.
            Return DataDescriptor for that column.
        """
        description = {
            "name": column_name,
            "data_type": "str",
            "description": "",
            "units": "",
            "examples": "",
        }

        # Do we think this field is numerical?
        if is_numeric(data[column_name][0]):
            description["data_type"] = "float"

        # Do we think this field is a datetime?
        try:
            is_a_date = is_date(data[column_name][0])
        except:
            is_a_date = False
        if is_a_date:
            description["data_type"] = "datetime"

        # description["units"] = has_units([column_name[0]])

        # Grab some examples.
        for i in range(5):
            description["examples"] += f"{data[column_name][i]}, "
        description["examples"] += "..."
        dd = DataDescriptor(**description)

        return dd
