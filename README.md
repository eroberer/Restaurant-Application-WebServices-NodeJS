# Restoraunt-Application-WebServices

## Category List
If parentId is null, default is zero
Request: http://host:portNumber/category/:parentId
Response:
```json
{"categories":
  [
    {
      "categoryID":1,
      "name":"Sıcak İçecekler",
      "sort":1,
      "image":"sicak-icecekler.jpg",
      "parentID":0,
      "date":"0000-00-00"
    }
  ]
}
```

## Product List 
Request: http://host:portNumber/product/:categoryId
Response:
```json
{
    "products": [
        {
            "productID": 1,
            "name": "Tavuk Sote",
            "category": 2,
            "price": 12.5,
            "description": "Özel soslar ile hazırlanmış nefis tavuk sote",
            "date": "2017-05-01T21:00:00.000Z",
            "deleteAt": "",
            "stars": 5,
            "startsCount": 1,
            "images": [
                {
                    "image": "sebzeli-tavuk-sote.jpg"
                }
            ],
            "options": [
                {
                    "optionOfProductID": 1,
                    "productID": 1,
                    "optionID": 1,
                    "sort": 1,
                    "name": "Ekstra Sos",
                    "type": 1,
                    "values": [
                        {
                            "optionValueID": 1,
                            "value": "Domates Sosu",
                            "price": 2.2,
                            "optionID": 1
                        },
                        {
                            "optionValueID": 2,
                            "value": "Acı Sos",
                            "price": 1.99,
                            "optionID": 1
                        }
                    ]
                }
            ]
        }
    ]
}
```
