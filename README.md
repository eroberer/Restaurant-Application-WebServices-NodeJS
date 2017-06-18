# Restaurant-Application-WebServices

## Category List
If parentId is null, default is zero

Request : GET http://fatihsimsek.me:9090/category/:parentId

Response :
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

Request : GET http://fatihsimsek.me:9090/product/:categoryId

Response :
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
## Get Temp Desk

Request : POST http://fatihsimsek.me:9090/tempdesk

Example Body : 
```json
{
  "deskid" : 1 
}
```

Result : 
```json
{
  "tempId": 14
}
```

## Add Order

Request : POST http://fatihsimsek.me:9090/order

Example Body : 
```json
{
	"tempId" : 1,
	"products" :
	[
		{
			"productId" : 1,
			"piece" : 5
		},
		{
			"productId" : 1,
			"piece": 10
		}
	]
}
```

Result : 
```json
{
  "result": true
}
```
## Get Desk List

Request : GET http://fatihsimsek.me:9090/desklist

Result :
```json
{
	"desklist" : [
			{
				"name" : "1",
				"status" : 1,
				"tempId" : 120
			},
			{
				"name" : "2",
				"status" : 0,
				"tempId" : 0
			}
		]
}
```

## Get Order List

Request : GET http://fatihsimsek.me:9090/deskOrders/:tempId

Result :
```json
{
  "deskOrders": [
    {
      "orderID": 22,
      "date": "16:23:43",
      "status": 3,
      "total": 100
    },
    {
      "orderID": 21,
      "date": "16:23:43",
      "status": 2,
      "total": 625
    }
  ]
}
```


## Change Order Status

Request : POST http://fatihsimsek.me:9090/changestatus

Example Body : 
```json
{
  "orderId" : 14,
  "status" : 2
}
```

Result :
```json
{
  "result" : true
}
```

## Get Order Baskets

Request : GET http://fatihsimsek.me:9090/baskets/:orderId

Result :
```json
{
	"baskets": [
		{
			"name": "Tavuk Sote",
			"image": "http://fatihsimsek.me/restoran/Public/Uploads/Products/http://cdn.yemek.com/mnresize/940/627/uploads/2016/04/sebzeli-tavuk-sote.jpg",
			"piece": 5,
			"total": 62.5
		},
		{
			"name": "Tavuk Sote",
			"image": "http://fatihsimsek.me/restoran/Public/Uploads/Products/http://cdn.yemek.com/mnresize/940/627/uploads/2016/04/sebzeli-tavuk-sote.jpg",
			"piece": 10,
			"total": 125
		}
	]
}
```



## Edit Baskets

Request : POST http://fatihsimsek.me:9090/editbasket

Example Body : 
```json
{
	"baskets" : 
	[ 
		{
			"basketId" : 1,
			"piece" : 3
		},
		{
			"basketId" : 2,
			"piece" : 5
		}
	]
}
```

Result :
```json
{
  "result" : true
}
```


## Delete Baskets

Request : POST http://fatihsimsek.me:9090/deletebasket

Example Body : 
```json
{
	"basketId" : 4
}
```

Result :
```json
{
  "result" : true
}
```

