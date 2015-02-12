#
#
# Convert users jQuery to CSV
#

import json
import os
import sys

if len(sys.argv) < 2:
    print

datastr = open(sys.argv[1]).read()
data = json.loads(datastr)

fields = ['name', 'age', 'DOB', 'latitude', 'longitude']

print ','.join(fields)

for d in data:
	# Make new field for full name
    name = '"%s, %s"' % (d['firstName'], d['lastName'])
    d['name'] = name

    # Calculate age
    age = 2014 - int(d['DOB'][:4])
    d['age'] = age

    userInfo = [str(d[f]) for f in fields]
    print ','.join(userInfo)

    
