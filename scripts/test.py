pooltemp = '12'
syst1temp = '16'
syst2temp = '18'
syst3temp = '20'
ambianttemp = '10'

systemstats = '{"pool": ' + str(pooltemp) + ', "ambient": ' + str(ambianttemp) + \
                  ',"sol1": ' + str(syst1temp) + \
                  ',"sol2": ' + str(syst2temp) + \
                  ',"sol3": ' + str(syst3temp) + '}'
print systemstats