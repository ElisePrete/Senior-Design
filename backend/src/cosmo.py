import pymongo
uri = "mongodb://dfind-db2:7GJR8CrcYkm2LJPYZUqwsWEIavciQqQPOlVV1z0FMVF7gxwxnNwC1zEGR7iydbvg0sptXdgLs2xTCAtIeRshKQ==@dfind-db2.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@dfind-db2@"
client = pymongo.MongoClient(uri)