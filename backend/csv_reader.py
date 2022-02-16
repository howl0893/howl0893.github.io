""" reading CSV files with pandas """

import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

csv_file = "/Users/matthew/dev/sandbox/data/student-loans.csv"

# skip over non-csv rows in beginning of file
# TODO: store beginning of file as description
with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    # index of csv start (row has multiple columns)
    idx = next(idx for idx, row in enumerate(reader) if len(row) > 1) 

# data extraction - store csv as dataframe
print(f"found beginning of csv @ index: {idx}")
df = pd.read_csv(csv_file, skiprows=idx)
df = df.where(pd.notna(df), None) # set all nan to None

# data cleaning - remove un-wanted chars
unwanted = "[]'%$,:;() "
for char in list(unwanted):
    df = df.applymap(lambda x: str(x).replace(char,''))

# convert dtypes
# dfn = df.convert_dtypes(infer_objects=True)           # was not infering as expected
df = df.apply(pd.to_numeric, errors='ignore')           # convert dtype to numeric where possible
obj_columns = df.select_dtypes(include=object).columns  # grab columns unable to convert
df[obj_columns] = df[obj_columns].convert_dtypes(str)   # convert remaining columns to strings
column_names = [str(c).lower() for c in df.columns]     # set column names to be lower case
mapping = dict(zip(df.columns, column_names))           # map lower case column names to dataframe
df = df.rename(columns=mapping)

try:
    # order by date
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values(by='date')
except:
    print("date column not found")

# total up DFI amount
# df.insert(df.columns.get_loc('amount') + 1, 'total amount', df['amount'].cumsum())
# df.insert(df.columns.get_loc('fiat value') + 1, 'total fiat value', df['fiat value'].cumsum())

# create new column called autopay interest rate by subtracting 0.25 from regular interest rate
df['autopay interest rate'] = df['regular interest rate'] - 0.25
# add annual interest rate column to dataframe by multipling principal by regular interest rate
df['annual interest rate'] = df['principal'] * df['regular interest rate']/100
df['annual autopay interest rate'] = df['principal'] * df['autopay interest rate']/100

# inspect dataframe changes
print(f"df.head:\n{df.head(5)}\n")
print(f"df.dtypes:\n{df.dtypes}\n")
print(f"df.describe:\n{df.describe()}\n")
print(f"df.colunns:\n{df.columns}")

payment_amount = 336
total_principal = df['principal'].sum()
total_annual_interest = df['annual interest rate'].sum()
total_autopay_interest = df['annual autopay interest rate'].sum()

print(f"\ntotal principal: {total_principal}")
print(f"total annual interest: {total_annual_interest}")
print(f"total autopay interest: {total_autopay_interest}")
print(f"annual payment: {payment_amount * 12}")

payback_time = total_principal / (payment_amount * 12)

print(f"payback time: {payback_time} years (not including interest)")

"""
# plot 'total amount' vs 'date' as line graph
    df.plot(x='date', y='total amount', kind='line')
    plt.title('$DFI vs Date')
    plt.xlabel('date')
    plt.ylabel('$DFI')
    plt.grid(True)
    # increase y-axis step size
    plt.gca().yaxis.set_major_locator(plt.MaxNLocator(integer=True))
    plt.show()

    # plot 'total fiat value' vs 'date' as line graph
    # df.plot(x='date', y='total fiat value', kind='line')
"""