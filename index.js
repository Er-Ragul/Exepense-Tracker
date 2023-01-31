const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sdk = require('node-appwrite');

app.use(bodyParser.json())

// Init SDK
const client = new sdk.Client();
const databases = new sdk.Databases(client);

// Local Appwrite

client
    .setEndpoint('http://192.168.0.213/v1')
    .setProject('63bea8aa05db4281b2b0')
    .setKey('596ad58c3962ed2a7c6d3ea654a22e3b56120013b14030ab9de25035d3fafb6f263126f43e1184a668a3b74715dfe0d173cd6f16cc2c4c8be46224b840e040b9e7b315c2501d65098b65ede2c734cd5a1559e3102f3d392b3d83070e8d99d536317c96b7120f6837010a0c02a36b744c40625170e6fe330f582d267434a3f25c')
;

app.get('/', (req, res) => {
  res.send('Expense Tracker API Server Running Successfully !')
})

app.post('/createdb', (req, res) => {
    /* To create database */
    const createDB = databases.create(req.body.id, req.body.id);

    createDB.then(function (response) {
        /* To create products collection */
        const productCollection = databases.createCollection(req.body.id, `${req.body.id+'-'+'pds'}`, `${req.body.id+'-'+'products'}`,[
            sdk.Permission.write(sdk.Role.user(req.body.id)),
            sdk.Permission.read(sdk.Role.user(req.body.id)),
        ]);

        productCollection.then(function (response) {
            /* To create id attribute */
            const idAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'pds'}`, 'id', 256, false);

            idAttribute.then(function (response) {
                console.log('Id attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create name attribute */
            const nameAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'pds'}`, 'name', 256, false);

            nameAttribute.then(function (response) {
                console.log('Name attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create url attribute */
            const urlAttribute = databases.createUrlAttribute(req.body.id, `${req.body.id+'-'+'pds'}`, 'url', false);

            urlAttribute.then(function (response) {
                console.log('Url attribute created.');
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });

        /* --------------------------- */

        const expenseCollection = databases.createCollection(req.body.id, `${req.body.id+'-'+'exp'}`, `${req.body.id+'-'+'expense'}`,[
            sdk.Permission.write(sdk.Role.user(req.body.id)),
            sdk.Permission.read(sdk.Role.user(req.body.id)),
        ]);

        expenseCollection.then(function (response) {
            /* To create id attribute */
            const idAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'pid', 256, false);

            idAttribute.then(function (response) {
                console.log('Pid attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create spent_for attribute */
            const forAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'spent_for', 256, false);

            forAttribute.then(function (response) {
                console.log('Spent_for attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create spent attribute */
            const spentAttribute = databases.createIntegerAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'money_spent', false);

            spentAttribute.then(function (response) {
                console.log('Money_spent attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create icon attribute */
            const iconAttribute = databases.createUrlAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'icon', false);

            iconAttribute.then(function (response) {
                console.log('Icon attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create time attribute */
            const timeAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'time', 256, false);

            timeAttribute.then(function (response) {
                console.log('Time attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create date attribute */
            const dateAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'date', 256, false);

            dateAttribute.then(function (response) {
                console.log('Date attribute created.');
            }, function (error) {
                console.log(error);
            });

            /* To create spent_for attribute */
            const noteAttribute = databases.createStringAttribute(req.body.id, `${req.body.id+'-'+'exp'}`, 'note', 256, false);

            noteAttribute.then(function (response) {
                console.log('Note attribute created.');
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error)
        })
    }, function (error) {
        console.log(error);
    });

    res.send('Your ID : ' + req.body.id)
})

app.post('/getdata', (req, res) => {
    const theDate = new Date();
    let tempDate = theDate.getDate().toString()+'-'+`${theDate.getMonth() + 1}`+'-'+ theDate.getFullYear().toString()
    let total = 0
    let todayData = []
    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {
        response.documents.forEach((data) => {
        if(data.date == tempDate){
            total = total + data.money_spent
            todayData.push({
                icon: data.icon,
                spent: data.spent_for,
                time : data.time,
                amount: data.money_spent,
                date: data.date
            })
        }
      })

    res.send({todayTotal: total, todayList: todayData})  
    }, function (error) {
        console.log(error);
    });
})

app.post('/weekdata', (req, res) => {
    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {

        let curr = new Date 
        let week = []
        let spentList = []
        let tempHeight = []
        let total = 0
    
        for (let i = 0; i <= 6; i++) {
          let first = curr.getDate() - curr.getDay() + i 
          let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
          day = day.split('-')
          day = day[2]+'-'+day[1].replace('0','')+'-'+day[0]
          week.push(day)
        }

        response.documents.forEach((data) => {
            week.forEach((main) => {
              if(main == data.date){
                total = total + data.money_spent
                spentList.push({
                    icon: data.icon,
                    spent: data.spent_for,
                    time : data.time,
                    amount: data.money_spent,
                    date: data.date,
                    height: 0
                })
              }
            })
        })

        week.forEach((data) => {
            let percentage = 0
            spentList.forEach((data2) => {
              if(data == data2.date){
                percentage = percentage + parseInt(data2.amount)
              }
            })
            percentage = percentage / total * 100
            tempHeight.push({date: data, height: Math.round(percentage)+'%'})
        })

        res.send({
            list: spentList,
            graph: tempHeight,
            total: total
        })

    }, function (error) {
        console.log(error);
    })
})

app.post('/monthdata', (req, res) => {
    let monthList = []
    let monthTotal = 0
    let tempHeight = []

    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {
        let curr = new Date

        response.documents.forEach((data) => {
            if(data.date.split('-')[1] == curr.getMonth()+1 && data.date.split('-')[2] == curr.getFullYear()){
                monthTotal = monthTotal + data.money_spent
                monthList.push({
                    icon: data.icon,
                    spent: data.spent_for,
                    time : data.time,
                    amount: data.money_spent,
                    date: data.date
                })
            }
        })

        const getDays = (year, month) => {
            return new Date(year, month, 0).getDate();
        };
        const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth()+1);

        for(let days=1; days<=daysInMonth; days++){
            let percentage = 0
            let date = null
            monthList.forEach((data) => {
                if(data.date.split('-')[0] == days){
                    percentage = percentage + parseInt(data.amount)
                    date = data.date
                }
                else {
                    date = days+'-'+new Date().getMonth()+1+'-'+new Date().getFullYear()
                }
            })
            percentage = percentage / monthTotal * 100
            tempHeight.push({date, height: Math.round(percentage)+'%'})
        }

        res.send({
            monthList,
            monthTotal,
            graph: tempHeight
        })
    }, function (error) {
        console.log(error);
    });
})

app.post('/yeardata', (req, res) => {
    let yearList = []
    let yearTotal = 0
    let tempHeight = []

    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {
        let curr = new Date

        response.documents.forEach((data) => {
            if(data.date.split('-')[2] == curr.getFullYear()){
                yearTotal = yearTotal + data.money_spent
                yearList.push({
                    icon: data.icon,
                    spent: data.spent_for,
                    time : data.time,
                    amount: data.money_spent,
                    date: data.date
                })
            }
        })

        for(let month=1; month<=12; month++){
            let percentage = 0
            let months = null
            yearList.forEach((data) => {
                if(data.date.split('-')[1] == month){
                    percentage = percentage + parseInt(data.amount)
                    months = data.date.split('-')[1]+'-'+month+'-'+new Date().getFullYear()
                }
                else {
                    months = month+'-'+month+'-'+new Date().getFullYear()
                }
            })
            percentage = percentage / yearTotal * 100
            tempHeight.push({date: months, height: Math.round(percentage)+'%'})
        }

        res.send({
            yearList,
            yearTotal,
            graph: tempHeight
        })
    }, function (error) {
        console.log(error);
    });
})

app.post('/query', (req, res) => {
    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {

        let list = []
        let total = 0

        response.documents.forEach((data) => {
            if(req.body.date.length == 0){
                if(data.pid == req.body.pid){
                    total = total + data.money_spent
                    
                    list.push({
                        name: data.spent_for,
                        date: data.date,
                        time: data.time,
                        amount: data.money_spent
                    })
                }
            }
            else {
                if(data.pid == req.body.pid && data.date == req.body.date){
                    total = total + data.money_spent
                    
                    list.push({
                        name: data.spent_for,
                        date: data.date,
                        time: data.time,
                        amount: data.money_spent
                    })
                }
            }
        })

        res.send({list, total})

    }, function (error) {
        console.log(error);
    });
})

app.post('/getproducts', (req, res) => {
    const promise = databases.listDocuments(req.body.database, req.body.collection);

    promise.then(function (response) {

        let productList = []

        response.documents.forEach((data) => {
            productList.push({
                id: data.id, 
                name: data.name, 
                url: data.url       
            })
        })

        res.send(productList)

    }, function (error) {
        console.log(error); // Failure
    });
})

app.post('/setproduct', (req, res) => {

    const promise = databases.createDocument(req.body.database, req.body.collection, sdk.ID.unique(), {
        name: req.body.name,
        id: req.body.id,
        url: req.body.url
    });

    promise.then(function (response) {
        res.send('Product added')
    }, function (error) {
        console.log(error);
    });
})

app.post('/addexpense', (req, res) => {

    const promise = databases.createDocument(req.body.database, req.body.collection, sdk.ID.unique(), req.body.spent);

    promise.then(function (response) {
        res.send('Expense added')
    }, function (error) {
        console.log(error);
    });
})

app.get('/geticons', (req, res) => {
    const promise = databases.listDocuments('63bfdfd6373c4da462cd', '63bfdfdf27713a73eebd');
        
    promise.then(function (response) {
        
        let iconList = []

        response.documents.forEach((data) => {
            iconList.push(data.icons)
        })

        res.send(iconList)

    }, function (error) {
        console.log(error);
    });
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})