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

fields = ['date', 'amount', 'merchant', 'lat', 'lon']

print ','.join(fields)

for d in data:
    # Parse the merchant
    merchantStr = d['merchant']
    merchant = json.loads(merchantStr)


    info = {}
    info['date'] = d['date']
    info['amount'] = d['amount']
    info['merchant'] = merchant['name'].encode('ascii', 'ignore')
    info['lat'] = merchant['location']['lat']
    info['lon'] = merchant['location']['lng']

    userInfo = [str(info[f]) for f in fields]
    print ','.join(userInfo)

    
